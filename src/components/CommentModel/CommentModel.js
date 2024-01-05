import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CommentModel.scss";
import avtar from "../../assets/avatar.png";
import { FaRegComment } from "react-icons/fa6";
import Like from "../LikeBtn/Like";
import { fetchDetailsFromApi , updateFeed } from "../../Api/Api";

function CommentModel({ openCommentModel, setCommentmodel, Fid }) {
  const [feed, setFeed] = useState("");
  console.log(feed , "comment ");
  const { profile } = useSelector((state) => state.user);

  const [commentText, setCommentext] = useState("");

  const UpdateComments = (userId, name, id) => {
    if (commentText != "") {
      updateFeed(`/feed/${id}`, {
        Comment: { userId, name, Comment: commentText },
      })
        .then((res) => {
          fetchDetailsFromApi(`/feed/${id}`).then((res) => {
            setFeed(res);
          });
          setCommentext("");
          console.log(res);
        })
        .catch((error) => {
          setCommentext("");
          console.log(error);
        });
      setCommentext("");
    }
  };

  useEffect(()=>{
    fetchDetailsFromApi(`/feed/${Fid}`).then((res) => {
      setFeed(res);
    });
  },[Fid])
  return (
    <>
      {openCommentModel && (
        <section className="commentContainer">
          <div
            className="opacityLayer"
            onClick={() => setCommentmodel(false)}
            role="button"
            tabIndex="0"
          ></div>
          <div className="commentBox">
            <div className="left">
              <div className="feedcontainer">
                <img src={feed?.feedPost} alt="post" />
              </div>
            </div>
            <div className="right">
              <div className="profile">
                <div className="profileContainer">
                  <img
                    src={feed?.profilePic ? feed?.profilePic : avtar}
                    alt="Profile"
                  />
                </div>
                <p>{feed?.userName}</p>
              </div>
              <hr />
              <div className="comments">
                {feed.Comment?.map((comment) => (
                  <div className="singleComment">
                    <span className="name">{comment.name}</span>
                    <span className="comment">{comment.Comment}</span>
                  </div>
                ))}
              </div>
              <hr />

              <div className="icons">
                <p>
                  <Like
                    LikeCount={() =>
                      updateLikeCount(profile?._id, profile?.name, feed?._id)
                    }
                  />
                </p>
                <p>
                  <FaRegComment />
                </p>
              </div>
              <hr />
              <div className="commentInput">
                <input
                  type="text"
                  placeholder="Add a Comment...."
                  value={commentText}
                  onChange={(e) => setCommentext(e.target.value)}
                />
                <button
                  onClick={() =>
                    UpdateComments(profile?._id, profile?.name, feed?._id)
                  }
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CommentModel;
