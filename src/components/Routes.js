import React from "react";

//?library import
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//?components import
import App from "../App";
import Launches from "./launches";

const Routes = () => {
   return (
      <Router>
         <Switch>
            <Route path="/launches" exact={true} component={Launches} />
            <Route path="/" exact={true} component={App} />
         </Switch>
      </Router>
   );
};

export default Routes;
