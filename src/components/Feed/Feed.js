import React, { useState } from "react";
import Postmodel from "../openPostModel/postmodel";
import "./Feed.scss";
import { useSelector } from "react-redux";
import avtar from "../../assets/avatar.png";
import { FaRegComment } from "react-icons/fa6";
import Like from "../LikeBtn/Like";
import CommentModel from "../CommentModel/CommentModel";
import { updateFeed, fetchDetailsFromApi } from "../../Api/Api";

function Feed() {
  const [postbox, setPostBox] = useState(false);
  const [commentModel, setCommentModel] = useState(false);
  const [commentShowOnModel, setCommentShowOnModel] = useState(null);
  const [commentText, setCommentText] = useState("");

  const { profile } = useSelector((state) => state.user);
  const { feeds, loading } = useSelector((state) => state.feeds);

  const [post, setPost] = useState(feeds);

  const updateLikeCount = (userId, name, id) => {
    updateFeed(`/feed/${id}`, { likeCount: { userId, name } })
      .then((res) => {
        console.log("Update like Success:", res);
        fetchDetailsFromApi(`/feed`)
          .then((updatedData) => {
            console.log("Fetch Data Success:", updatedData);
            setPost(updatedData);
          })
          .catch((fetchError) => {
            console.error("Error fetching updated data:", fetchError);
          });
      })
      .catch((error) => {
        console.error("Update like Error:", error);
      });
  };

  const viewCommentModel = (post) => {
    setCommentModel(true);
    setCommentShowOnModel(post);
  };

  const updateComments = (userId, name, id) => {
    if (commentText !== "") {
      updateFeed(`/feed/${id}`, {
        Comment: { userId, name, Comment: commentText },
      })
        .then((res) => {
          console.log("Update Comment Success:", res);

          fetchDetailsFromApi(`/feed`)
            .then((updatedData) => {
              console.log("Fetch Data Success:", updatedData);
              setPost(updatedData);
            })
            .catch((fetchError) => {
              console.error("Error fetching updated data:", fetchError);
            });

          setCommentText("");
        })
        .catch((error) => {
          setCommentText("");
          console.error("Update Comment Error:", error);
        });
    }
  };

  return (
    <div className="main">
      <section className="postcontainer">
        <div className="profileContainer">
          <img
            src={profile?.profilePic ? profile?.profilePic : avtar}
            alt="Profile"
          />
        </div>
        <p className="addPost" onClick={() => setPostBox(true)}>
          Express your thoughts.....
        </p>
        
      </section>
      {loading && (
        <p style={{ width: "100%", textAlign: "center" }}>
          loading..............
        </p>

      )}
      <p className="headline" > Share your experience and precious moments. </p>
      <section className=" suffalbtn " >
          <p> Random </p>
          <p> Recents </p>
      </section>
      <section className="feedSection">
        {post?.map((feed) => (
          <div key={feed._id} className="post">
            <div className="userDetails">
              <div className="profileContainer">
                <img
                  src={feed?.profilePic ? feed?.profilePic : avtar}
                  alt="Profile"
                />
              </div>
              <p>{feed?.userName}</p>
            </div>
            <div className="feed">
              <div className="feedcontainer">
                <img src={feed?.feedPost} alt="post" />
              </div>
            </div>
            <div className="icons">
              <p>
                <Like
                  LikeCount={() =>
                    updateLikeCount(profile?._id, profile?.name, feed?._id)
                  }
                />
                <span style={{ fontSize: "1rem", opacity: ".7" , color:"#fff"}}>
                  {" "}
                  {feed.likeCount.length}{" "}
                  {feed.likeCount.length === 1 ? "like" : "likes"}
                </span>
              </p>
              <p onClick={() => viewCommentModel(feed._id)}>
                <FaRegComment />
              </p>
            </div>
            <div className="about">
              <p className="name">{feed?.userName}</p>
              <p>{feed?.about}</p>
            </div>
            <div className="commentInput">
              <input
                type="text"
                placeholder="Add a Comment...."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                onClick={() =>
                  updateComments(profile?._id, profile?.name, feed?._id)
                }
              >
                Post
              </button>
            </div>
            <p
              onClick={() => viewCommentModel(feed._id)}
              style={{ fontSize: "1rem", opacity: ".7" , color:"#fff" , margin:"1rem 0"}}
            >
              View All {feed.Comment.length}{" "}
              {feed.Comment.length === 1 ? "comment" : "comments"}
            </p>
            <hr />
          </div>
        ))}
      </section>
      <Postmodel postBox={postbox} setPostBox={setPostBox} />
      <CommentModel
        openCommentModel={commentModel}
        setCommentmodel={setCommentModel}
        Fid={commentShowOnModel}
      />
    </div>
  );
}
export default Feed;
