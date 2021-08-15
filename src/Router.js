import React, { lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import Layout from "./components/layouts";

const food = lazy(() => import("./pages/main/Food"));
const restaurant = lazy(() => import("./pages/main/Restaurant"));
const fresh = lazy(() => import("./pages/main/Fresh"));
const liquor = lazy(() => import("./pages/main/Liquor"));
const flower = lazy(() => import("./pages/main/Flower"));
const mart = lazy(() => import("./pages/main/Mart"));
const medicine = lazy(() => import("./pages/main/Medicine"));
const pet = lazy(() => import("./pages/main/Pet"));

const recruitment = lazy(() => import("./pages/sub/Recruitment"));

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
