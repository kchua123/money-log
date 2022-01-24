import React from "react";
import { fetchMonthExpenses } from "../store/monthExpenses";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
  componentDidMount() {
    this.props.getMonthExpenses(
      this.props.match.params.year,
      this.props.match.params.month
    );
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-3 d-flex justify-content-center header-box">
            {monthNames[this.props.match.params.month]}{" "}
            {this.props.match.params.year}
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

        <div className="row justify-content-md-center mt-4">
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
    monthExpenses: state.monthExpenses,
  };
};

const mapDispatch = (dispatch) => ({
  getMonthExpenses: (month, year) => dispatch(fetchMonthExpenses(month, year)),
});

export default connect(mapState, mapDispatch)(MonthExpenses);
