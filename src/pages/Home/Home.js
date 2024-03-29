import React, { useEffect } from "react";
import RightSide from "../../components/RightSide/Rightside";
import Feed from "../../components/Feed/Feed";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { profileFun } from "../../store/UserSlice";
import { getuserdetails } from "../../Api/Api";
import { fetchDetailsFromApi } from "../../Api/Api";
import { getFeeds, loadingState } from "../../store/FeedSlice";
function Home() {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (profile === null) {
      getuserdetails("/Auth/profile")
        .then((res) => {
          dispatch(profileFun(res));
          return res;
        })
        .catch((error) => {
          error;
          return error;
        });
    }
  }, []);

  useEffect(() => {
    if (user != null) {
      dispatch(loadingState(true));
      fetchDetailsFromApi("/feed")
        .then((res) => {
          console.log(res);
          dispatch(getFeeds(res));
          dispatch(loadingState(false));
        })
        .catch((err) => {
          dispatch(loadingState(false));
          console.log(err);
        });
    }
  }, []);

  return (
    <section className="HomePage">
      <div className="left">
        <Sidebar/>
      </div>
      <div className="center">
        <Feed />
      </div>
      <div className="right">
      <RightSide/>
      </div>
    </section>
  );
}

export default Home;
