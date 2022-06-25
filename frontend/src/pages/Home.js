import React from "react";
import PostGrid from "../components/PostGrid";
import posts from "../Testing/posts";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "../CSS/Home.css";
const Home = () => {
  return (
    <div>
      <div>
        <h1 className="explore">Explore</h1>
        <Link className="share" to="/create">
          Share A Post
          <PostAddIcon />
        </Link>
      </div>
      <PostGrid inActive={false} posts={posts} />
    </div>
  );
};

export default Home;
