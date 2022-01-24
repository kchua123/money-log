import React from "react";
import { fetchExpenses } from "../store/expenses";
import { fetchMonthExpenses } from "../store/monthExpenses";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddExpense from "./AddExpense";
import { VictoryBar, VictoryLabel } from "victory";

const sortedMonths = ["06", "07", "08", "09", "10", "11", "12", "01"]

const monthAbbrNames = {
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
  "01": "Jan",
};

export class Expenses extends React.Component {
  componentDidMount() {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = ("0" + (today.getMonth() + 1)).slice(-2);
    this.props.getExpenses();
    this.props.getMonthExpenses(thisYear, thisMonth);
  }

  render() {
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
        <div className="dropdown">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Month
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="/2022/01">
                    January 2022
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/2021/12">
                    December 2021
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/2021/10">
                    October 2021
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/2021/09">
                    September 2021
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/2021/08">
                    August 2021
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/2021/07">
                    July 2021
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/2021/06">
                    June 2021
                  </a>
                </li>
              </ul>
            </div>
            </div>
            </div>

        <div className="row justify-content-md-center mb-4">
          <div className="col-5 d-flex justify-content-center">
            <VictoryBar
              barWidth={45}
              data={sortedMonths.map((month) => {
                return {
                  x: monthAbbrNames[month],
                  y: this.props.expenses
                    .filter((expense) => expense.month === month)
                    .reduce((acc, expense) => {
                      return acc + expense.cost;
                    }, 0),
                };
              })}
              labels={({ datum }) => datum.x}
              style={{ labels: { fill: "white" } }, { data: { fill: "#fad2e1" } }}
              animate={{
                onLoad: { duration: 5000 }
              }}
            />
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
