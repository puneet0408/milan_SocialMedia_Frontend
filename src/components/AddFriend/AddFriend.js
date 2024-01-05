import React from "react";
import "./Addfriend.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";

function AddFriend() {
  const { profile } = useSelector((state) => state.user);
  console.log(profile);

  return <div className="friend">{profile?.name}</div>;
}

export default AddFriend;
