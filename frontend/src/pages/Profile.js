import React from "react";
import profile from "../Testing/profile";
import UserProfile from "../styled-components/UserProfile";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileTabs from "../components/ProfileTabs";
import { useUserContext } from "../context/user_context";
import { useParams } from "react-router-dom";
import PostGrid from "../components/PostGrid";
import posts from "../Testing/posts";
const Profile = () => {
  const { user, authenticated } = useUserContext();
  const userProfile = useParams();
  console.log(userProfile);
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
        </div>
      </div>
      {authenticated === true && user === userProfile.profile ? (
        <ProfileTabs />
      ) : (
        <>
          <h2>Posts</h2>
          <PostGrid inActive={false} posts={posts} />
        </>
      )}
    </UserProfile>
  );
};

export default Profile;
