import React from "react";
import profile from "../Testing/profile";
import UserProfile from "../styled-components/UserProfile";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileTabs from "../components/ProfileTabs";
const Profile = () => {
  return (
    <UserProfile>
      <div className="Header">
        <div className="user">
          <AccountCircleIcon sx={{ color: "#ff67e7", fontSize: 40 }} />
          <h2>{profile.username}</h2>
        </div>
        <div className="profilelikes">
          <div className="hovertext" data-hover="Total Posts">
            <ArticleIcon />
            <h3>{profile.totalPosts}</h3>
          </div>
          <div className="hovertext" data-hover="Total Likes">
            <FavoriteIcon sx={{ color: "red" }} />
            <h3>{profile.totalLikes}</h3>
          </div>
          <div className="hovertext" data-hover="Total Comments">
            <CommentIcon sx={{ color: "#47B5FF" }} />
            <h3>{profile.totalComments}</h3>
          </div>
        </div>
      </div>
      <ProfileTabs />
    </UserProfile>
  );
};

export default Profile;
