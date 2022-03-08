import React from "react";
import { fetchExpenses, deleteExpense } from "../store/expenses";
import { fetchMonthExpenses } from "../store/monthExpenses";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddExpense from "./AddExpense";
import AddCategory from "./AddCategory";
import EditExpense from "./EditExpense";

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
            <a
              className="btn btn-primary"
              data-bs-toggle="offcanvas"
              href="#addexpense"
              role="button"
              aria-controls="offcanvasExample"
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
            </a>

            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="addexpense"
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
              <div className="offcanvas-body">
                <AddExpense />
              </div>
            </div>
          </div>

          <div className="col-3 d-flex justify-content-center">
            <a
              className="btn btn-primary"
              data-bs-toggle="offcanvas"
              href="#addcategory"
              role="button"
              aria-controls="offcanvasExample"
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
              Add New Category
            </a>

            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="addcategory"
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
              <h4>Add New Category</h4>
              <div className="offcanvas-body">
                <AddCategory />
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-6">
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
                      <td>
                        {/* LINK: EDIT BUTTON */}
                        <Link to={`/expenses/${expense.id}/edit`}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm delete-button"
                          >
                            EDIT
                          </button>
                        </Link>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => this.props.deleteExpense(expense.id)}
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </td>
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
  deleteExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapState, mapDispatch)(Expenses);
