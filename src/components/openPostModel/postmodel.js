import React from "react";
import "./postModel.scss";
import { FaImage } from "react-icons/Fa";

function postmodel({ postBox, setPostBox }) {
  return (
    <div>
      {postBox && (
        <section className="postBoxContainer">
          <div
            className="opacityLayer"
            onClick={() => setPostBox(false)}
            role="button"
            tabIndex="0"
          ></div>
          <div className="postbox">
            <p
              className="closeBtn"
              onClick={() => setPostBox(false)}
              role="button"
              tabIndex="0"
            >
              close
            </p>
            <section className="postdetails">
              <p className="accountdetails">
                <p className="photo"></p> Puneet Virmani
              </p>
              <textarea className="textarea" placeholder="start typing....." />
              <label htmlFor="addImage" className="imageLabel">
                <FaImage /> Add Image
              </label>
              <input id="addImage" style={{ display: "none" }} type="file" />
              <button>Post</button>
            </section>
          </div>
        </section>
      )}
    </div>
  );
}

export default postmodel;
