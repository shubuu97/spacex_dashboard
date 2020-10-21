import React from "react";

//?library import
import { useHistory } from "react-router-dom";

//?video import
import Video from "../../assets/videos/LaunchVideo.mp4";

//?components import
import withLayout from "../../hoc/withLayout";

//?css import
import "./style.scss";

const Home = () => {
   const history = useHistory();

   return (
      <div>
         <header className="header_video_container">
            <div>
               <video id="videoBG" poster={Video} autoPlay={true} loop muted>
                  <source src={Video} type="video/mp4"></source>
               </video>
               <div className="overlay"></div>
            </div>
            <div className="hero_text">
               <div className="mb-4">
                  Space Exploration Technologies Corp., trading as SpaceX, is an American aerospace
                  manufacturer and space transportation services company headquartered in Hawthorne,
                  California. It was founded in 2002 by Elon Musk with the goal of reducing space
                  transportation costs to enable the colonization of Mars.
               </div>
               <button
                  className="button"
                  onClick={() => {
                     history.push("launches?all_launches=true");
                  }}
               >
                  See Launches
               </button>
            </div>
         </header>
      </div>
   );
};

export default withLayout(Home);
