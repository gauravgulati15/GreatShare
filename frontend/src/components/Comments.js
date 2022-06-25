import React from "react";
import { Link } from "react-router-dom";

import CommentsWrapper from "../styled-components/CommentsWrapper";
const Comments = ({ comments }) => {
  return (
    <CommentsWrapper>
      <h2>Comments -: </h2>
      <form action="">
        <input
          type="text"
          className="comment"
          name=""
          id=""
          placeholder="Enter your comment"
        />
        <input type="submit" className="submit" value="comment" />
      </form>
      {comments.map((comment) => {
        return (
          <div key={comment.commentId} className="singlecomment">
            <p>
              by :
              <span>
                <Link className="username" to={`/${comment.username}`}>
                  {comment.username}
                </Link>
              </span>{" "}
              - {comment.comment}
            </p>
            <p>on : {comment.createdAt}</p>
          </div>
        );
      })}
    </CommentsWrapper>
  );
};

export default Comments;
