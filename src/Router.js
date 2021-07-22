import React, { lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"

const food = lazy(() => import('./pages/Food'))
const restaurant = lazy(() => import('./pages/Restaurant'))

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={food} />
        <Route exact path="/food" component={food} />
        <Route exact path="/restaurant" component={restaurant} />
      </Switch>
    </Router>
  )
}

export default AppRouter
