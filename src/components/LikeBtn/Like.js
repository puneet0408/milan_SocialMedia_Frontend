import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Like({ LikeCount }) {
  const [likeAdded, setLikeAdded] = useState(false);

  console.log(likeAdded);

  return (
    <div onClick={LikeCount}>
      {likeAdded ? (
        <AiFillHeart onClick={() => setLikeAdded(false)} />
      ) : (
        <AiOutlineHeart onClick={() => setLikeAdded(true)} />
      )}
    </div>
  );
}
export default Like;
