import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user_context";

import CommentsWrapper from "../styled-components/CommentsWrapper";
const Comments = ({ comments, createComment }) => {
  const { isAuthenticated } = useUserContext();
  // const d = new Date(comments.createdAt);
  const [commentText, setCommentText] = React.useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(commentText.length === 0){
      // TODO: add alert
    }
    else createComment(commentText);
  }

  return (
    <CommentsWrapper>
      <h2>Comments -: </h2>
      {isAuthenticated 
        ? 
          <form onSubmit={ handleSubmit() }>
            <input
              type="text"
              className="comment"
              name=""
              id=""
              placeholder="Enter your comment"
              onChange={(e)=>setCommentText(e.target.value)}
            />
            <input type="submit" className="submit" value="comment" />
          </form>
      : <></>
      }
      {comments.map((comment) => {
        return (
          <div key={comment.commentID} className="singlecomment">
            <p>
              by :
              <span>
                <Link className="username" to={`/${comment.username}`}>
                  {comment.username}
                </Link>
              </span>{" "}
              - {comment.commentText}
            </p>
            <p>on : {new Date(comment.createdAt).getDate()}/{new Date(comment.createdAt).getMonth()}/{new Date(comment.createdAt).getFullYear()}</p>
          </div>
        );
      })}
    </CommentsWrapper>
  );
};

export default Comments;
