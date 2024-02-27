import React, { useState } from "react";
import "./postModel.scss";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FaImage } from "react-icons/Fa";
import { AddFeed } from "../../Api/Api";
import { getFeeds } from "../../store/FeedSlice.js";
import { useDispatch } from "react-redux";
import avtar from "../../assets/avatar.png";

function postmodel({ postBox, setPostBox }) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const [about, setAbout] = useState("");
  const [blankerror, setBlankErr] = useState("");
  const [cloudinaryLink, setCloudinaryLink] = useState("");
  const preset_key = "feedImage";
  const cloud_name = "dygbz1kio";
  const handleSubmit = () => {
    if (about && cloudinaryLink != "") {
      AddFeed("/feed", {
        about: about,
        feedPost: cloudinaryLink,
        userId: profile?._id,
        userName: profile?.name,
        userProfile: profile?.profilePic,
      })
        .then((res) => {
          console.log(res);
          dispatch(getFeeds(res));
          setPostBox(false);
          setCloudinaryLink("");
          setAbout("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setBlankErr("both field must be filled");
    }
    setBlankErr("");
  };
  const handleClickImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", preset_key);
    axios
      .post(
        `
        https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        form
      )
      .then((res) => {
        setCloudinaryLink(res.data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              <div className="accountdetails">
                <img className="photo" src={avtar} /> {profile?.name}
              </div>
              <textarea
                className="textarea"
                onChange={(e) => setAbout(e.target.value)}
                placeholder="start typing....."
              />
              <label htmlFor="addImage" className="imageLabel">
                <FaImage /> Add Image
              </label>
              <input
                id="addImage"
                onChange={handleClickImage}
                style={{ display: "none" }}
                type="file"
              />
              {image && (
                <div className="imageView">
                  <img src={URL.createObjectURL(image)} />
                </div>
              )}
              <p className="error">{blankerror}</p>
              <button onClick={handleSubmit}>Post</button>
            </section>
          </div>
        </section>
      )}
    </div>
  );
}
export default postmodel;
