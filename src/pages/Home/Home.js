import React from "react";
import AddFriend from "../../components/AddFriend/AddFriend";
import Feed from "../../components/Feed/Feed";
import "./Home.scss";

function Home() {
  return (
    <section className="HomePage">
        <Feed />
        <AddFriend />
    </section>
  );
}

export default Home;
