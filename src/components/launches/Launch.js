import React from "react";

//?library import
import PropTypes from "prop-types";

//?image import
import NotFound from "../../assets/images/not_found.png";

//?css import
import "./style.scss";

/**
 * This component shows each launch card
 * click handler is inside the parent component
 */
const Launch = ({ launch = {}, handleClick, lastItemRef, index = 0, total = 0 }) => {
   //?de-structuring launch data
   const {
      mission_name,
      launch_year,
      rocket: { rocket_name },
      launch_site: { site_name },
      launch_success,
      links: { mission_patch_small },
   } = launch || {};

   return (
      <div
         className="launch mb-3"
         onClick={handleClick}
         //?assigning ref to the last launch element
         ref={index === total - 1 ? lastItemRef : null}
      >
         <div className="row mb-2">
            <div className="col-md-12 card_header">
               <div className="image-container mr-4">
                  {mission_patch_small ? (
                     <img
                        src={mission_patch_small}
                        alt="mission_patch"
                        loading="lazy"
                        height="60px"
                        width="60px"
                     />
                  ) : (
                     <img
                        src={NotFound}
                        alt="not-found"
                        loading="lazy"
                        height="60px"
                        width="60px"
                     />
                  )}
               </div>
               <div className="hero_text">
                  <span>{mission_name}</span>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-6 detail">
               <span className="font-weight-bold">Launch Year</span>
               <span>{launch_year}</span>
            </div>
            <div className="col-md-6 detail">
               <span className="font-weight-bold">Rocket Name</span>
               <span>{rocket_name}</span>
            </div>
         </div>
         <div className="row">
            <div className="col-md-6 detail">
               <span className="font-weight-bold">Launch Site</span>
               <span>{site_name}</span>
            </div>

            <div className="col-md-6 detail">
               <span className="font-weight-bold">Successful</span>
               <span>{launch_success ? "Yes" : "No"}</span>
            </div>
         </div>
      </div>
   );
};

export default Launch;

Launch.prototype = {
   launch: PropTypes.object.isRequired,
   handleClick: PropTypes.func.isRequired,
   index: PropTypes.number.isRequired,
   total: PropTypes.number.isRequired,
};
