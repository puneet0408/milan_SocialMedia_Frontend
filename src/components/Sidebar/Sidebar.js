import React, { useState } from "react";
import { LiaHandshake } from "react-icons/lia";
import { useSelector } from "react-redux";
import avtar from "../../assets/avatar.png";
import { AiFillHome, AiFillMessage, AiOutlineLogout } from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";
import "./Sidebar.scss";

import { useNavigate } from "react-router";
import { Logout } from "../../store/UserSlice";
 import { useDispatch } from "react-redux";

function Sidebar() {
  
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const navigateToHome = () => {
    setShowSearch(false);
    navigate("/");
  };

  const navigateToProfile = ()=>{
    setShowSearch(false);
    navigate("/profile");
  }

  const openSearch = () => {
    setShowSearch(true);
  };

  const logoutbtn = () => {
    dispatch(Logout());
  };

  return (
    <section className="sideBar">
      {showSearch && (
        <div className="searchbarcontainer">
          Search
          <div className="searchBar">
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <hr />
        </div>
      )}
      <div className="logo" onClick={navigateToHome}>
        <span className="handShake">
          <LiaHandshake />
        </span>
        {showSearch ? "" : "Milan"}
      </div>
      <nav className="menuitems">
        <li className="menuitem" onClick={navigateToHome}>
          <AiFillHome /> {showSearch ? "" : "Home"}
        </li>
        <li className="menuitem">
          <AiFillMessage /> {showSearch ? "" : "Message"}
        </li>
        <li className="menuitem" onClick={openSearch}>
          <HiOutlineSearch /> {showSearch ? "" : "Search"}
        </li>
        <li className="menuitem">
          <div className="profileContainer" onClick={navigateToProfile}>
            <img
              src={profile?.profilePic ? profile?.profilePic : avtar}
              alt="Profile"
            />
          </div>
          {showSearch ? "" : "Profile"}
        </li>
      </nav>
      <div onClick={logoutbtn}>
        <AiOutlineLogout /> {showSearch ? "" : "Logout"}
      </div>
    </section>
  );
}

export default Sidebar;
