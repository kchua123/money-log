import React from "react";
import { fetchExpenses } from "../store/expenses";
import { fetchMonthExpenses } from "../store/monthExpenses";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddExpense from "./AddExpense";

export class Expenses extends React.Component {
  componentDidMount() {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = ("0" + (today.getMonth() + 1)).slice(-2);
    this.props.getExpenses();
    this.props.getMonthExpenses(thisYear, thisMonth);
  }

  render() {
    console.log(this.props.expenses);
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-3 d-flex justify-content-center header-box">
            Total spent this month:
          </div>
        </div>

        <div className="row justify-content-md-center mb-4">
          <div className="col-3 d-flex justify-content-center total-box">
            $
            {this.props.monthExpenses.reduce((acc, expense) => {
              return acc + expense.cost;
            }, 0)}
          </div>
        </div>

        <div className="row justify-content-md-center mb-4">
          <div className="col-3 d-flex justify-content-center">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>{" "}
              Add New Expense
            </button>

            <div
              className="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <h4>Add New Expense</h4>
              <div className="offcanvas-body"><AddExpense /></div>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-7">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Vendor</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                {this.props.expenses.map((expense) => {
                  return (
                    <tr key={expense.id}>
                      <td>{expense.date}</td>
                      <td>{expense.category}</td>
                      <td>{expense.vendor}</td>
                      <td>${expense.cost}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    expenses: state.expenses,
    monthExpenses: state.monthExpenses,
  };
};

const mapDispatch = (dispatch) => ({
  getExpenses: () => dispatch(fetchExpenses()),
  getMonthExpenses: (year, month) => dispatch(fetchMonthExpenses(year, month)),
});

export default connect(mapState, mapDispatch)(Expenses);
