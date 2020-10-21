import React from "react";

//?component import
const AppBar = React.lazy(() => import("../components/appBar"));

/**
 * it adds a top appBar on the components which are wrapped with this hoc
 * @param {Component} InputComponent - component which is wrapped
 */
const withLayout = (InputComponent) => {
   return (props) => {
      return (
         <>
            <React.Suspense fallback={<div className="fullscreen-content">Loading...</div>}>
               <AppBar />
            </React.Suspense>
            <InputComponent {...props} />
         </>
      );
   };
};

export default withLayout;
