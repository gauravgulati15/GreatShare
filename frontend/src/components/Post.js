import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
const SinglePost = styled.div`
  display: flex;
  width: max(300px, 22vw);
  height: 50vh;
  padding: 0;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  transition: box-shadow 0.4s;
  :hover {
    transform: 0.4s;
    box-shadow: 15px 15px 15px grey;
  }
  .content {
    text-align: start;
    box-sizing: border-box;
    margin: 0;
    display: flex;
    height: 30%;
    font-family: "Work Sans", sans-serif;
  }
  .right {
    display: flex;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding-top: 1rem;
  }
  .left {
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .contentText {
    margin:12px;
  }
  @media (max-width: 1720px) {
    .contentText {
      margin: 5px;
    }
  }
  @media (max-width: 1510px) {
    .contentText {
      margin: 2px 2px 0px 5px;
    }
  }
  .img {
    width: 100%;
    height: 70%;
  }
  img {
    box-sizing: border-box;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .likes {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: end;
    
  }
  .count {
    margin: 0;
  }
  .link {
    width: 32%;
    display: flex;
    justify-content: space-around;
    text-decoration: none;
    text-align-center;
    color:pink;
    align-items:center;
  }
  .creator{
    background-color:#DDDDDD;
    color:#7F8487;
    padding:10px;
    font-weight:600;
  }
`;

const Post = ({ postData, inActive }) => {
  return (
    <SinglePost>
      <div className="img">
        <img src={postData.postImage} alt="" />
      </div>
      <div className="content">
        <div className="left">
          <p className="contentText">{postData.postTitle}</p>
          <p className="contentText">Created on: {postData.createdAt}</p>
          <p className="contentText creator"> {postData.username}</p>
        </div>
        <div className="right">
          {inActive === false ? (
            <Link className="link" to={`/${postData.username}/${postData.id}`}>
              View
              <RemoveRedEyeOutlinedIcon />
            </Link>
          ) : (
            <></>
          )}
          <div className="likes">
            <div>
              <FavoriteIcon sx={{ color: "red" }} />
              <p className="count">{postData.postLikes}</p>
            </div>
          </div>
        </div>
      </div>
    </SinglePost>
  );
};

export default Post;
