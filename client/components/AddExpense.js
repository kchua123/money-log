import React from "react";
import { addExpense, addMonthYear } from "../store/expenses.js";
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
    evt.preventDefault();
    this.props.addExpense({
      ...this.state,
      month: this.state.date[5] + this.state.date[6],
      year:
        this.state.date[0] +
        this.state.date[1] +
        this.state.date[2] +
        this.state.date[3],
      day: this.state.date[8] +
      this.state.date[9]
    });
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
      <div className="container">
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="mb-3 row gx-5">
            <div className="col-sm-2 category-select">
              <select
                className="form-select"
                value={category}
                onChange={this.handleChange}
                name="category"
                aria-label="Default select example"
              >
                <option selected>Select Category</option>
                <option value="Alcohol">Alcohol</option>
                <option value="Dining Out">Dining Out</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Groceries">Groceries</option>
                <option value="Health & Personal Care">
                  Health & Personal Care
                </option>
                <option value="Other">Other</option>
                <option value="Shopping">Shopping</option>
                <option value="Snacks & Coffee">Snacks & Coffee</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="cost" className="form-label">
              Cost
            </label>
            <div className="col-sm-10">
              <input
                name="cost"
                value={cost}
                onChange={this.handleChange}
                placeholder="Cost"
                className="form-control"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="vendor" className="form-label">
              Vendor
            </label>
            <div className="col-sm-10">
              <input
                name="vendor"
                value={vendor}
                onChange={this.handleChange}
                placeholder="Vendor"
                className="form-control"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                name="date"
                value={date}
                onChange={this.handleChange}
                placeholder="Date"
                className="form-control"
              />
            </div>
          </div>

          <div className="mb-3 mt-4 row">
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

const mapDispatchToProps = (dispatch, {history}) => ({
  addExpense: (expense) => dispatch(addExpense(expense, history)),
});

export default connect(null, mapDispatchToProps)(AddExpense);
