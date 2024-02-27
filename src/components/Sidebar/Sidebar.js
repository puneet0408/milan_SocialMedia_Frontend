import React from "react";
import { useSelector, useDispatch } from "react-redux";
import avtar from "../../assets/avatar.png";
import { AiFillHome, AiFillMessage, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { Logout } from "../../store/UserSlice";
import "./Sidebar.scss";

function Sidebar() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToProfile = () => {
    navigate("/profile");
  };
  const navigateToMessage = () => {
    navigate("/message");
  };
  const logoutbtn = () => {
    dispatch(Logout());
  };
  return (
    <section className="sideBar">
      <nav className="menuitems">
        <div className="menuitem" onClick={navigateToHome}>
          <span className="icon"> <AiFillHome /></span>
          <p className="text"> Home </p>
        </div>
        <div className="menuitem" onClick={navigateToMessage} >
          <span className="icon"> <AiFillMessage /> </span>
          <p className="text"> Message </p>
        </div>
        <div className="menuitem" onClick={navigateToProfile}>
          <div className="profileContainer">
            <img src={profile?.profilePic || avtar} alt="Profile" />
          </div>
          <p className="text"> Profile </p>
        </div>
        <div className="menuitem" onClick={logoutbtn}>
          <span className="icon"> <AiOutlineLogout /> </span>
          <p className="text"> Logout </p>
        </div>
        <p className="quote">Spread kindness like joy, watch happiness unfold</p>
      </nav>
    </section>
  );
}

export default Sidebar;

