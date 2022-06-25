import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetPost from "../API/GetPost";
import SinglePost from "../components/SinglePost";
import { useUserContext } from "../context/user_context";

const SinglePostPage = () => {
  let postInfo = useParams();
  console.log(postInfo);
  const [post, setPost] = useState({});
  useEffect(() => {
    let res = GetPost(postInfo.id);

    setPost(res);
  }, [postInfo]);
  const { user } = useUserContext();
  let isCurrentUser = user === postInfo.profile;

  return <SinglePost post={post} isUser={isCurrentUser} />;
};

export default SinglePostPage;
