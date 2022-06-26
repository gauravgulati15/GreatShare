import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "../components/SinglePost";
import { useUserContext } from "../context/user_context";
import GreatShareService from "../API/api";

const SinglePostPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postID, setPostID] = useState(useParams().postID);
  const [inActive, SetInActive] = useState(useParams().inActive);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { user } = useUserContext();

  // let postInfo = useParams();
  // console.log(postInfo);
  useEffect(() => {
    setIsLoading(true);
    try{
      if(inActive === "0"){
        GreatShareService.getPostByPostID(postID)
            .then((res)=>{
              if(res[0]===false){
                throw new Error(res[1]);
              }
              setPost(res[1]);
            });
        GreatShareService.getAllCommentsOfAPost(postID)
            .then((res)=>{
              if(res[0]===false){
                throw new Error(res[1]);
              }
              setComments(res[1]);
            });
          } else {
            GreatShareService.getPostInReviewTable(postID)
            .then((res)=>{
              if(res[0]===false){
                throw new Error(res[1]);
              }
              setPost(res[1]);
            });
          }
        setIsLoading(false);

    } catch(error) {
      console.log(error);
    }
  }, [postID, inActive]);

  // let isCurrentUser = user === post.userID;

  const increaseLikes = async (totalLikes)=>{
    const res = await GreatShareService.increaseLikesOfAPost(postID,totalLikes);
    if(res[1][0] === true){
      setPost(res[1][1]);
    }
  }

  const createComment = async (text)=>{
    const data = {
      userID: user.userID,
      postID: postID,
      username: user.username,
      commentText: text
    }
    const res = await GreatShareService.createCommentsOfAPost(data);
    if(res[1][0] === true){
      setComments(res[1][1]);
    }
  }

  if(isLoading === true){
    return <div className="loader"></div>
  }

  return <SinglePost post={post} 
                     isUser={user === post.userID} 
                     comments={comments} 
                     increaseLikes={increaseLikes} 
                     createComment={createComment}
                     inActive={inActive}
          />;
};

export default SinglePostPage;
