import React from "react";
import { fetchExpenses } from "../store/expenses";
import { fetchMonthExpenses } from "../store/monthExpenses";
import { fetchCategory } from "../store/category";
import { fetchCategories } from "../store/categories";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddExpense from "./AddExpense";
import { VictoryBar, VictoryLabel } from "victory";

let monthDays = function () {
  let days = [];
  for (let i = 1; i <= 31; i++) {
    let num = ("0" + i).slice(-2);
    days.push(num);
  }
  return days;
};

console.log("***MONTHDAYS", monthDays);

export class Expenses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: ""
        };
        this.renderChart = this.renderChart.bind(this);
      }
  componentDidMount() {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = ("0" + (today.getMonth() + 1)).slice(-2);
    this.props.getExpenses();
    this.props.getMonthExpenses(thisYear, thisMonth);
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category.id !== this.props.category.id) {
        this.props.getCategory(this.props.category.id)
        let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = ("0" + (today.getMonth() + 1)).slice(-2);
    this.props.getMonthExpenses(thisYear, thisMonth);
    }
  }

//   handleSubmit(evt) {
//     console.log("***HANDLESUBMIT EVT.TARGET.VALUE: ", evt.target.value);
//     evt.preventDefault();
//     this.props.getCategory(evt.target.value);
//   }

  renderChart (categoryId) {
      console.log("**RENDERCHART FUNC")
    this.props.getCategory(categoryId)
  }

  render() {
    console.log("THIS.PROPS", this.props);
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
                Select Category
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {this.props.categories.map((category) => {
                  return (
                    <div
                      onClick={() => this.renderChart(category.id)}
                      value={category.id}
                    >
                      {category.name}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center mb-4">
          <div className="col-12 d-flex justify-content-center">
            <VictoryBar
              barWidth={20}
              data={monthDays().map((day) => {
                return {
                  x: day,
                  y: this.props.monthExpenses
                    .filter(
                      (expense) => expense.category === this.props.category && expense.day === day
                    )
                    .reduce((acc, expense) => {
                      return acc + expense.cost;
                    }, 0),
                };
              })}
              labels={({ datum }) => datum.x}
              style={
                ({ labels: { fill: "white", fontSize: 8 } }, { data: { fill: "#fad2e1" } })
              }
              animate={{
                onLoad: { duration: 5000 },
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
    categories: state.categories,
    category: state.category,
  };
};

const mapDispatch = (dispatch) => ({
  getExpenses: () => dispatch(fetchExpenses()),
  getMonthExpenses: (year, month) => dispatch(fetchMonthExpenses(year, month)),
  getCategory: (id) => dispatch(fetchCategory(id)),
  getCategories: () => dispatch(fetchCategories()),
});

export default connect(mapState, mapDispatch)(Expenses);
