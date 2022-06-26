import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import comments from "../Testing/comments";
import PostWrapper from "../styled-components/PostWrapper";
import LikeIcon from "./LikeIcon";
import Comments from "./Comments";
import { useUserContext } from "../context/user_context";
import GreatShareService from "../API/api";

const SinglePost = ({ post, comments, increaseLikes, createComment, inActive }) => {
  const { user, authenticated } = useUserContext();
  const [totalLikes, setTotalLikes] = useState();
  // const [currentLikes, setCurrentLikes] = useState();
  const [thisPost, setThisPost] = useState({
    postID: 0,
    userID: "",
    username: "",
    postTitle: "",
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
        {authenticated === true && user.userID === post.userID ? (
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
          <Link to={`/${thisPost.userID}`}>{thisPost.username}</Link>
        </h2>
        <div className="postlikes">
          <LikeIcon setThisPost={setThisPost} thisPost={thisPost} increaseLikes={increaseLikes}/>
          <p className="likesCount">Total Likes : {thisPost.postLikes}</p>
        </div>
      </div>
      <div className="second-row">
        <img src={thisPost.postImage} alt="" />
        <p className="postContent">{thisPost.postContent}</p>
      </div>
      { inActive !== "1" ? <></>
       :
          <Comments comments={comments} 
                createComment={createComment}
          />
      }
    </PostWrapper>
  );
};

export default SinglePost;
