import React from "react";

//library import
import { useHistory } from "react-router-dom";

//?logo import
import Logo from "../../assets/images/logo.png";

//?css import
import "./style.scss";

/**
 * app bar component that is used inside withLayout hoc to show top bar on pages
 */

const AppBar = () => {
   const history = useHistory();
   return (
      <div className="app_bar">
         <div
            className="img_container container"
            onClick={() => {
               history.push("/");
            }}
         >
            <img src={Logo} alt="logo" loading="lazy" height="30px" width="30px" />
         </div>
      </div>
   );
};

export default AppBar;
