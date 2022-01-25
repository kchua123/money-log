import React from 'react';
import { updateExpense } from '../store/expenses';
import { fetchExpense, _setExpense } from '../store/expense';
import { fetchCategories } from "../store/categories"
import { connect } from 'react-redux';

class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cost: 0,
        date: "",
        category: "",
        vendor: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      console.log("**THIS.PROPS: ", this.props.match.params.id)
    this.props.fetchExpense(this.props.match.params.id);
    this.props.getCategories()
  }

  componentWillUnmount() {
    this.props.clearExpense();
  }

  componentDidUpdate(prevProps) {
      console.log("PREVPROPS", prevProps)
    if (prevProps.expense.id !== this.props.expense.id) {
      this.setState({
        cost: this.props.expense.cost || 0,
        date: this.props.expense.date || "",
        category: this.props.expense.category || "",
        vendor: this.props.expense.vendor || "",
      });
      console.log("STATE AFTER COMPONENTDIDUPDATE: ", this.state)
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateExpense({ ...this.props.expense, ...this.state });
  }

  render() {
    const { cost, date, category, vendor } = this.state;
    const { handleSubmit } = this;
    console.log("*** RENDERING EDIT COMPONENT!!!")
    return (
        <div className="container">
            
        <form className="edit-form col-4" onSubmit={handleSubmit}>
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
                {this.props.categories.map(category => {
                  return (
                    <option value={category.name}>{category.name}</option>
                  )
                })}
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
                Edit Expense
              </button>
            </div>
          </div>
          
        </form>
        </div>
    );
  }
}

const mapState = (state) => ({
    expense: state.expense,
    categories: state.categories,
});

const mapDispatch = (dispatch, {history}) => ({
  updateExpense: (expense) => dispatch(updateExpense(expense, history)),
  fetchExpense: (id) => dispatch(fetchExpense(id)),
  clearExpense: () => dispatch(_setExpense({})),
  getCategories: () => dispatch(fetchCategories()),
});

export default connect(mapState, mapDispatch)(EditExpense);