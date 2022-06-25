import React from "react";
import Post from "./Post";
import Postgrid from "../styled-components/Postgrid";
import "../CSS/postgrid.css";
const PostGrid = ({ posts, inActive }) => {
  return (
    <Postgrid className={inActive ? "inActive" : ""}>
      {posts.map((post) => {
        return <Post key={post.id} inActive={inActive} postData={post} />;
      })}
    </Postgrid>
  );
};

export default PostGrid;
