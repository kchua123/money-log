import React from "react";
import { addExpense } from "../store/expenses.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AddExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      cost: 0,
      date: "",
      category: "",
      vendor: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    console.log("handleSubmit evt.target -->", evt.target);
    evt.preventDefault();
    this.props.addExpense({ ...this.state });
    this.setState({
      cost: 0,
      date: "",
      category: "",
      vendor: "",
    });
  }

  handleChange(evt) {
    console.log("handleChange evt.target -->", evt.target);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { cost, date, category, vendor } = this.state;
    const { handleSubmit } = this;

    return (
      <div className="mt-3 ms-3">
        <form id="add-form" onSubmit={handleSubmit}>
          <div className="mb-3 row">
          <div className="col-sm-2">
            <select className="form-select" onChange={this.handleChange} name="category" aria-label="Default select example">
              <option selected>Select Category</option>
              <option value="Alcohol">Alcohol</option>
              <option value="Dining Out">Dining Out</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Groceries">Groceries</option>
              <option value="Health & Personal Care">Health & Personal Care</option>
              <option value="Other">Other</option>
              <option value="Shopping">Shopping</option>
              <option value="Snacks & Coffee">Snacks & Coffee</option>
            </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="cost" className="form-label">Cost</label>
            <div className="col-sm-10">
            <input
              name="cost"
              value={cost}
              onChange={this.handleChange}
              placeholder="Cost"
            />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="vendor" className="form-label">Vendor</label>
            <div className="col-sm-10">
            <input
              name="vendor"
              value={vendor}
              onChange={this.handleChange}
              placeholder="Vendor"
            />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="date" className="form-label">Date</label>
            <div className="col-sm-10">
            <input
            type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              placeholder="Date"
            />
            </div>
          </div>


          <div className="mb-3 row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
          </div>
          </div>
        </form>
      </div>
    );
  }
}

/*
NOTE: The second argument for both mapStateToProps and mapDispatchToProps is the _actual props_ passed down from the parent.

This is usually denoted as `ownProps`, and since CreateTodo is rendered by our Router component in `App.js`, `CreateTodo` receives all of the history, match, and location props.

We can therefore destructure the `history` prop from the 2nd argument of props.

Another way to have written this would be:

const mapDispatchToProps = (dispatch, ownProps) => ({
  createTodo: (todo) => dispatch(createTodo(todo, ownProps.history))
});

*/
const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(null, mapDispatchToProps)(AddExpense);
