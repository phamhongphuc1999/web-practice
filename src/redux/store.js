import { createStore, applyMiddleware, compose } from "redux";
import createDebounce from "redux-debounced";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { createLogger } from "redux-logger";

const middlewares = [thunk, createDebounce()];
if (process.env.REACT_APP_ENV === "development") middlewares.push(createLogger());

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middlewares)));

export { store };
