import React, { useState } from "react";
import Postmodel from "../openPostModel/postmodel";
import "./Feed.scss";
function Feed() {
  const [postbox, setPostBox] = useState(false);
  return (
    <div className="main">
      <div className="postcontainer">
        <p className="photo"></p>
        <p className="addPost" onClick={() => setPostBox(true)}>
          start a post
        </p>
      </div>
      <Postmodel
       postBox={postbox} 
       setPostBox={setPostBox} 
       />
    </div>
  );
}

export default Feed;
