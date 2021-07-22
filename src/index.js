import React, { Suspense, lazy } from "react"
import ReactDOM from 'react-dom';
import Spinner from "./components/spinners/Spinner";
import './assets/css/index.css';

const LazyApp = lazy(() => import("./App"))

ReactDOM.render(
  <Suspense fallback={Spinner}>
    <LazyApp />
  </Suspense>
  ,document.getElementById('root')
);
