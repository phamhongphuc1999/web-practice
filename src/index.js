import React, { Suspense, lazy } from "react"
import ReactDOM from 'react-dom';
import Spinner from "./components/spinners/Spinner";
import { I18nextProvider } from 'react-i18next';
import i18n from './locale/i18n'
import './assets/css/index.css';
import { Provider } from "react-redux";
import { store } from "./redux/store"

const LazyApp = lazy(() => import("./App"))

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<Spinner />}>
        <LazyApp />
      </Suspense>
    </I18nextProvider>
  </Provider>
  , document.getElementById('root')
);
