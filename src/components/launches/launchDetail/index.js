import React from "react";
import ReactDOM from "react-dom";

//?libraries import
import DialogContent from "@material-ui/core/DialogContent";
import { useSelector, shallowEqual } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Loader from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import moment from "moment";

//?image import
import NotFound from "../../../assets/images/not_found.png";

//?css import
import "./style.scss";

/**
 * Displays the detail of a launch in a modal
 */

const LaunchDetail = ({ open = false, handleClose }) => {
   const launchDetail = useSelector((state) => state?.launchDetail ?? {}, shallowEqual);
   const { data, isLoading, success, message } = launchDetail || {};

   //?de-structuring launch data
   const { mission_name, launch_date_local, rocket, launch_site, launch_success, links, details } =
      data || {};
   const { rocket_name, rocket_type } = rocket || {};
   const { site_name } = launch_site || {};
   const { mission_patch_small, article_link, wikipedia, video_link } = links || {};

   return ReactDOM.createPortal(
      <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="launch-detail-dialog"
         fullWidth={true}
      >
         {!isLoading && (
            <div>
               <IconButton className="row close_icon" onClick={handleClose}>
                  <i className="fa fa-close" />
               </IconButton>
            </div>
         )}
         <DialogContent>
            {/* show loader when fetching */}
            {isLoading ? (
               <div className="fullscreen-content">
                  <Loader />
               </div>
            ) : success ? (
               //? shows content when loader is stopped and success is true
               <div className="mb-3 launch_detail">
                  <div className="row mb-2">
                     <div className="col-md-12 card_header">
                        <div className="image_container mr-4">
                           {mission_patch_small ? (
                              <img src={mission_patch_small} alt="mission_patch" loading="lazy" />
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
                        <div className="d-flex fd-col">
                           {mission_name && (
                              <div className="hero_text">
                                 <span>{mission_name}</span>
                              </div>
                           )}
                           <div>
                              {article_link && (
                                 <a href={article_link} target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-newspaper-o mr-2 article-icon" />
                                 </a>
                              )}
                              {wikipedia && (
                                 <a href={wikipedia} target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-wikipedia-w mr-2 wiki-icon" />
                                 </a>
                              )}
                              {video_link && (
                                 <a href={video_link} target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-youtube-play mr-2 yt-icon" />
                                 </a>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="row mb-2">
                     <div className="col-md-12">
                        {details && (
                           <div className="description">
                              <span>{details}</span>
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="row">
                     {launch_date_local && (
                        <div className="col-md-6 detail">
                           <span className="font-weight-bold">Launch Date</span>
                           <span>
                              {launch_date_local &&
                                 moment(new Date(launch_date_local)).format("DD-MM-YYYY")}
                           </span>
                        </div>
                     )}
                     {rocket_name && (
                        <div className="col-md-6 detail">
                           <span className="font-weight-bold">Rocket Name</span>
                           <span>{rocket_name}</span>
                        </div>
                     )}
                  </div>
                  <div className="row">
                     {rocket_type && (
                        <div className="col-md-6 detail">
                           <span className="font-weight-bold">Rocket Type</span>
                           <span>{rocket_type}</span>
                        </div>
                     )}

                     {launch_success && (
                        <div className="col-md-6 detail">
                           <span className="font-weight-bold">Successful</span>
                           <span>{launch_success ? "Yes" : "No"}</span>
                        </div>
                     )}
                  </div>
                  <div className="row">
                     {site_name && (
                        <div className="col-md-6 detail">
                           <span className="font-weight-bold">Launch Site</span>
                           <span>{site_name}</span>
                        </div>
                     )}
                  </div>
               </div>
            ) : (
               //? shows error message if not success
               <div className="fullscreen-content">{message}</div>
            )}
         </DialogContent>
      </Dialog>,
      document.getElementById("modal")
   );
};

export default LaunchDetail;

LaunchDetail.prototype = {
   open: PropTypes.bool.isRequired,
   handleClose: PropTypes.func.isRequired,
};
