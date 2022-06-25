import React from "react";
import { Link } from "react-router-dom";
import comments from "../Testing/comments";
import PostWrapper from "../styled-components/PostWrapper";
import LikeIcon from "./LikeIcon";
import Comments from "./Comments";
const SinglePost = ({ post, isUser }) => {
  console.log(isUser);
  return (
    <PostWrapper>
      <h1 className="title">{post.postTitle}</h1>
      <div className="first-row">
        <h2>
          {" "}
          posted by : <Link to={`/${post.username}`}>{post.username}</Link>
        </h2>
        <div className="postlikes">
          <LikeIcon />
          <p className="likesCount">Total Likes : {post.postLikes}</p>
          {isUser ? <button>edit</button> : <></>}
        </div>
      </div>
      <div className="second-row">
        <img src={post.postImage} alt="" />
        <p className="postContent">{post.postContent}</p>
      </div>
      <Comments comments={comments} />
    </PostWrapper>
  );
};

export default SinglePost;
