import React, { lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import Layout from "./layouts";

const food = lazy(() => import("./pages/main/Food/index"));
const restaurant = lazy(() => import("./pages/main/Restaurant/index"));
const fresh = lazy(() => import("./pages/main/Fresh/index"));
const liquor = lazy(() => import("./pages/main/Liquor/index"));
const flower = lazy(() => import("./pages/main/Flower/index"));
const mart = lazy(() => import("./pages/main/Mart/index"));
const medicine = lazy(() => import("./pages/main/Medicine/index"));
const pet = lazy(() => import("./pages/main/Pet/index"));

const recruitment = lazy(() => import("./pages/sub/Recruitment/index"));

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
        <RouteConfig exact path="/medicine" component={medicine} />
        <RouteConfig exact path="/pet" component={pet} />
        <RouteConfig exact path="/tuyen-dung" component={recruitment} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
