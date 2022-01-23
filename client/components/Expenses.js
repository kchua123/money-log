import React from "react";
import { fetchExpenses } from "../store/expenses.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Expenses extends React.Component {
  componentDidMount() {
    this.props.getExpenses();
  }
  render() {
    console.log(this.props.expenses);
    return (
      <div className="container">

        <table class="table">
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
    );
  }
}

const mapState = (state) => {
  return {
    expenses: state.expenses,
  };
};

const mapDispatch = (dispatch) => ({
  getExpenses: () => dispatch(fetchExpenses()),
});

export default connect(mapState, mapDispatch)(Expenses);
