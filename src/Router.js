import React, { lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"

const Food = lazy(() => import('./pages/Food'))
const Restaurant = lazy(() => import('./pages/Restaurant'))

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Food} />
        <Route exact path="/food" component={Food} />
        <Route exact path="/restaurant" component={Restaurant} />
      </Switch>
    </Router>
  )
}

export default AppRouter
