import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import Expenses from './components/Expenses';
import AddExpense from './components/AddExpense';
import MonthExpenses from "./components/MonthExpenses"
import MonthlySummary from "./components/MonthSummary"
import EditExpense from "./components/EditExpense"
import CurrentMonth from "./components/CurrentMonth"

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/expenses/:id/edit' component={EditExpense} />
            <Route exact path='/current' component={CurrentMonth} />
            <Route exact path='/' exact component={Expenses} />
            <Route exact path='/month-summary' exact component={MonthlySummary} />
            <Route exact path='/add' exact component={AddExpense} />
            <Route exact path='/:year/:month' exact component={MonthExpenses} />
            
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
