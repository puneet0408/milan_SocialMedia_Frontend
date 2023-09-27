import React, { useState } from "react";
import { LiaHandshake } from "react-icons/lia";
import {
  AiFillHome,
  AiFillMessage,
  AiOutlineLogout,
} from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";
import "./Sidebar.scss";

import { useNavigate } from "react-router";

function Sidebar() {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const navigateToHome = () => {
    setShowSearch(false);
    navigate("/");
  };
  const openSearch = () => {
    setShowSearch(true);
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
          <span className="profilePic"></span> {showSearch ? "" : "Profile"}
        </li>
      </nav>
      <div>
        <AiOutlineLogout /> {showSearch ? "" : "Logout"}
      </div>
    </section>
  );
}

export default Sidebar;
