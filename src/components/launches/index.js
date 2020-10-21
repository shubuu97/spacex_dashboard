import React, { useState, createRef, useEffect } from "react";

//?libraries import
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "@material-ui/core/CircularProgress";

//?action import
import fetchLaunchDetail from "../../store/actions/launchDetail";

//?components import
import withLayout from "../../hoc/withLayout";

//?dynamic import
const Filter = React.lazy(() => import("./filter"));
const Launch = React.lazy(() => import("./Launch"));
const LaunchDetail = React.lazy(() => import("./launchDetail"));

/**
 * This is the main launches page it consists of the filter and lunches list
 * Infinite scroll is implemented for launch list
 * initially 10(itemsToShow) items are being displayed and new items are added as users scrolls down
 */

const itemsToShow = 10;

const Launches = () => {
   const [launchDetailDialog, toggleLaunchDetailDialog] = useState(false);
   const [scrollPos, setScrollPos] = useState(0);

   const launches = useSelector((state) => state?.launches ?? {}, shallowEqual);
   const { data, isLoading, success } = launches || {};

   const [launchesToShow, setLaunchesToShow] = useState([]);

   const dispatch = useDispatch();

   const lastItemRef = createRef();

   //!listen for scroll events
   useEffect(() => {
      window.addEventListener("scroll", () => {
         setScrollPos(window.scrollY);
      });
      return () =>
         window.removeEventListener("scroll", () => {
            setScrollPos(window.scrollY);
         });
   }, []);

   //?set initial data
   useEffect(() => {
      setLaunchesToShow([
         ...(data || []).slice(
            0,
            (data || []).length > itemsToShow ? itemsToShow : (data || []).length
         ),
      ]);
   }, [data]);

   //?set launch items when scroll position changes
   useEffect(() => {
      const loadPos = (lastItemRef?.current?.offsetTop ?? 0) - 650;
      const currentLaunchesLength = (launchesToShow || []).length;
      const allLaunchesLength = (data || []).length;
      //?when reaches to last element
      if (scrollPos >= loadPos) {
         if (allLaunchesLength - currentLaunchesLength >= itemsToShow) {
            setLaunchesToShow([
               ...launchesToShow,
               ...(data || []).slice(currentLaunchesLength, currentLaunchesLength + itemsToShow),
            ]);
         } else {
            setLaunchesToShow([
               ...launchesToShow,
               ...(data || []).slice((launchesToShow || []).length, allLaunchesLength),
            ]);
         }
      }
   }, [scrollPos, data]);

   return (
      <div>
         <React.Suspense fallback={<div className="fullscreen-content">Loading...</div>}>
            <Filter />
         </React.Suspense>
         <div className="container">
            {isLoading ? (
               <div className="fullscreen-content">
                  <Loader />
               </div>
            ) : success ? (
               (launchesToShow || []).map((launch, index) => {
                  const { flight_number } = launch || {};
                  return (
                     <React.Suspense
                        key={flight_number}
                        fallback={<div className="fullscreen-content">Loading...</div>}
                     >
                        <Launch
                           handleClick={() => {
                              toggleLaunchDetailDialog(!launchDetailDialog);
                              dispatch(fetchLaunchDetail(flight_number));
                           }}
                           launch={launch}
                           lastItemRef={lastItemRef}
                           index={index}
                           total={(launchesToShow || []).length}
                        />
                     </React.Suspense>
                  );
               })
            ) : (
               <div className="fullscreen-content">No Launches Found!</div>
            )}
         </div>
         {launchDetailDialog ? (
            <React.Suspense fallback={<div className="fullscreen-content">Loading...</div>}>
               <LaunchDetail
                  open={launchDetailDialog}
                  handleClose={() => {
                     toggleLaunchDetailDialog(!launchDetailDialog);
                  }}
               />
            </React.Suspense>
         ) : null}
      </div>
   );
};

export default withLayout(Launches);
