import React from "react";
import PostGrid from "../components/PostGrid";
import posts from "../Testing/posts";
const Home = () => {
  return (
    <div>
      <h1 className="explore">Explore</h1>
      <PostGrid posts={posts} />
    </div>
  );
};

export default Home;
