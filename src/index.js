import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import Routes from "./components/Routes";
import store from "./store";
import "./index.scss";
import "url-search-params-polyfill";

ReactDOM.render(
   <Provider store={store}>
      <Routes />
   </Provider>,
   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
