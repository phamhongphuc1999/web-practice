import React, { lazy } from "react"
import { connect } from "react-redux"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import HorizontalLayout from "./layouts/HorizontalLayout"

const Food = lazy(() => import('./pages/Food'))

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <HorizontalLayout {...props}>
          <Component {...props} />
        </HorizontalLayout>
      )
    }}
  />
)

const mapStateToProps = state => {
  return {}
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <AppRoute exact path="/" component={Food} />
      </Switch>
    </Router>
  )
}

export default AppRouter
