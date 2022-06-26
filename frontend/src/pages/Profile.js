import React, {useState, useEffect} from "react";
// import profile from "../Testing/profile";
import UserProfile from "../styled-components/UserProfile";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileTabs from "../components/ProfileTabs";
import { useUserContext } from "../context/user_context";
import { useParams } from "react-router-dom";
import PostGrid from "../components/PostGrid";
// import posts from "../Testing/posts";
import GreatShareService from "../API/api";

const Profile = () => {
  const userID = useParams().userID;

  const { user, authenticated } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userReviewPosts, setUserReviewPosts] = useState([]);
  const [userModeratePosts, setUserModeratePosts] = useState([]);
  const [userDetails, setUserDetails] = useState({
    userID: "",
    username: "",
    emailID: "",
    phoneNo: ""
  });

  useEffect(()=>{
    setIsLoading(true);
    try{
      GreatShareService.getUserDetailsByUserID(userID)
          .then((res)=>{
                // setIsLoading(false);
                if(res[0]===false){
                  throw new Error(res[1]);
                }
                setUserDetails(res[1]);
          });

      GreatShareService.getUserPostInPostTable(userID)  
          .then((res)=>{
              if(res[0]===false){
                  throw new Error(res[1]);
              }
              setUserPosts(res[1]);
          });

      if(authenticated === true && user.userID === userDetails.userID ){
        GreatShareService.getUserPostInReviewTable(userID)  
          .then((res)=>{
              if(res[0]===false){
                  throw new Error(res[1]);
              }
              setUserReviewPosts(res[1]);
          });
        
        GreatShareService.getUserPostInModerationTable(userID)  
          .then((res)=>{
              if(res[0]===false){
                  throw new Error(res[1]);
              }
              setUserModeratePosts(res[1]);
          });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // TODO: alert
    }
      
     setIsLoading(false) ;
  },[userID]);
  
  // console.log(userID);
  if(isLoading){
    return <div className="loader"></div>
  }

  return (
    <UserProfile>
      <div className="Header">
        <div className="user">
          <AccountCircleIcon sx={{ color: "#ff67e7", fontSize: 40 }} />
          <h2>{userDetails.username}</h2>
        </div>
        <div className="profilelikes">
          <div className="hovertext" data-hover="Total Posts">
            <ArticleIcon />
            <h3>{userPosts.length}</h3>
          </div>
        </div>
      </div>
      {authenticated === true && user.userID === userDetails.userID ? (
        <ProfileTabs posts={userPosts} moderatePosts={userModeratePosts} reviewPosts={userReviewPosts}/>
      ) : (
        <>
          <h2>Posts</h2>
          <PostGrid inActive="0" posts={userPosts} />
        </>
      )}
    </UserProfile>
  );
};

export default Profile;
