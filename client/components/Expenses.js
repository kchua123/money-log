import React from "react";
import { fetchExpenses } from "../store/expenses";
import { fetchMonthExpenses } from "../store/monthExpenses";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

        <div className="row justify-content-md-center mb-3">
          <div className="col-3 d-flex justify-content-center total-box">
            $
            {this.props.monthExpenses.reduce((acc, expense) => {
              return acc + expense.cost;
            }, 0)}
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
