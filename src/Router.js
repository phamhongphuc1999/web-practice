import React, { lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import Layout from "./layouts/Layout"

const food = lazy(() => import('./pages/Food'))
const restaurant = lazy(() => import('./pages/Restaurant'))
const fresh = lazy(() => import('./pages/Fresh'))
const liquor = lazy(() => import('./pages/Liquor'))
const flower = lazy(() => import('./pages/Flower'))
const mart = lazy(() => import('./pages/Mart'))
const medicien = lazy(() => import('./pages/Medicien'))

const RouteConfig = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <Layout {...props} pathname={rest.location.pathname}>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <RouteConfig exact path="/" component={food} />
        <RouteConfig exact path="/food" component={food} />
        <RouteConfig exact path="/table" component={restaurant} />
        <RouteConfig exact path="/fresh" component={fresh} />
        <RouteConfig exact path="/liquor" component={liquor} />
        <RouteConfig exact path="/flowers" component={flower} />
        <RouteConfig exact path="/mart" component={mart} />
        <RouteConfig exact path="/medicien" component={medicien} />
      </Switch>
    </Router>
  )
}

export default AppRouter
