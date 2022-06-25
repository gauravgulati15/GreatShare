import React from "react";
import Post from "./Post";
import Postgrid from "../styled-components/Postgrid";
const PostGrid = ({ posts }) => {
  return (
    <Postgrid>
      {posts.map((post) => {
        return <Post key={post.id} postData={post} />;
      })}
    </Postgrid>
  );
};

export default PostGrid;
