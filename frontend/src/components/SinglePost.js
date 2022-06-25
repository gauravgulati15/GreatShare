import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import comments from "../Testing/comments";
import PostWrapper from "../styled-components/PostWrapper";
import LikeIcon from "./LikeIcon";
import Comments from "./Comments";
import { useUserContext } from "../context/user_context";
const SinglePost = ({ post }) => {
  const { user, authenticated } = useUserContext();
  const [thisPost, setThisPost] = useState({
    postId: 0,
    userId: "",
    username: "",
    postContent: "",
    postImage: "",
    postLikes: 0,
  });
  useEffect(() => {
    setThisPost(post);
  }, [post]);

  return (
    <PostWrapper>
      <div className="titlediv">
        <h1 className="title">{thisPost.postTitle}</h1>
        {authenticated === true && user === post.username ? (
          <Link className="Link" to="/update">
            Edit Post
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="first-row">
        <h2>
          {" "}
          posted by :{" "}
          <Link to={`/${thisPost.username}`}>{thisPost.username}</Link>
        </h2>
        <div className="postlikes">
          <LikeIcon setThisPost={setThisPost} thisPost={thisPost} />
          <p className="likesCount">Total Likes : {thisPost.postLikes}</p>
        </div>
      </div>
      <div className="second-row">
        <img src={thisPost.postImage} alt="" />
        <p className="postContent">{thisPost.postContent}</p>
      </div>
      <Comments comments={comments} />
    </PostWrapper>
  );
};

export default SinglePost;
