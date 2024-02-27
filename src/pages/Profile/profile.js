import React from "react";
import "./profile.scss";
import avtar from "../../assets/avatar.png";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
function Profile() {
  const { profile } = useSelector((state) => state.user);
  console.log(profile);
  return (
    <div className="ProfilePage">
      <div className="sidebar">
        <Sidebar />
      </div>

      <section className="profileSection" >
        <div className="backroundImg">
          <section className="ProfilePic">
            <img src={avtar} />
            <p className="profileName" >{profile?.name}</p>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Profile;
