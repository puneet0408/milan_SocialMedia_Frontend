import React from "react";
import Pic from "../../assets/avatar.png";
import "./style.scss";

function Header() {
  return (
    <div className="header" >
      <div className="container">
        <img className="img" src={Pic} alt="pic" />
      </div>
    </div>
  );
}

export default Header;
