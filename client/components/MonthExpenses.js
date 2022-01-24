import React from "react";
import { fetchMonthExpenses } from "../store/monthExpenses";
import { fetchCategories } from "../store/categories";
import { fetchExpenses } from "../store/expenses";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { VictoryPie } from "victory";
import AddExpense from "./AddExpense"

const monthNames = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

export class MonthExpenses extends React.Component {
  constructor() {
    super();
    this.monthCategories = this.monthCategories.bind(this);
  }
  componentDidMount() {
    this.props.getMonthExpenses(
      this.props.match.params.year,
      this.props.match.params.month
    );
    this.props.getCategories();
    this.props.getExpenses()
  }

  componentDidUpdate(prevProps) {
    if (this.props.expenses.length !== prevProps.expenses.length) {
      this.props.getMonthExpenses(
        this.props.match.params.year,
        this.props.match.params.month
      );
    }
  }

 monthCategories() {
    let filledCategories = [];
    this.props.monthExpenses.forEach((element) => {
      if (!filledCategories.includes(element.category)) {
        filledCategories.push(element.category);
      }
    });
    return filledCategories
  }

  render() {
    let selectedCategories = this.monthCategories()
    console.log(selectedCategories)
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-2 d-flex justify-content-center header-box">
            {monthNames[this.props.match.params.month]}{" "}
            {this.props.match.params.year}
          </div>
        </div>

        <div className="row justify-content-md-center mb-3">
          <div className="col-2 d-flex justify-content-center total-box">
            $
            {this.props.monthExpenses.reduce((acc, expense) => {
              return acc + expense.cost;
            }, 0)}
          </div>
        </div>

        <div className="row justify-content-md-center">
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

        <div className="row justify-content-md-center mb-3">
          <div className="col-5 d-flex justify-content-center">
            <VictoryPie
            animate={{
              duration: 2000
            }}
              colorScale={["#599B99", "#437573", "#F7B6CD", "#fad2e1", "#000000"]}
              innerRadius={75}
              data={selectedCategories.map((category) => {
                return {
                  x: category,
                  y: this.props.monthExpenses
                    .filter((expense) => expense.category === category)
                    .reduce((acc, expense) => {
                      return acc + expense.cost;
                    }, 0),
                };
              })}
              style={{
                labels: {
                  fontSize: 8,
                },
              }}
              labels={({ datum }) => datum.x}
            />
          </div>
        </div>

        <div className="row justify-content-md-center mt-3">
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
                {this.props.monthExpenses.map((expense) => {
                  return (
                    <tr>
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
    categories: state.categories,
  };
};

const mapDispatch = (dispatch) => ({
  getMonthExpenses: (month, year) => dispatch(fetchMonthExpenses(month, year)),
  getCategories: () => dispatch(fetchCategories()),
  getExpenses: () => dispatch(fetchExpenses())
});

export default connect(mapState, mapDispatch)(MonthExpenses);
