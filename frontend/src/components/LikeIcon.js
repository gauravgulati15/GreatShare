import React from "react";
import { useState } from "react";
import styled from "styled-components";
const LikeWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position:realtive
  transform: translate(-50%, -50%);
  .heart {
    width: 100px;
    height: 100px;
    background: url("https://cssanimation.rocks/images/posts/steps/heart.png")
      no-repeat;
    background-position: 0 0;
    cursor: pointer;
    transition: background-position 1s steps(28);
    transition-duration: 0s;

    &.is-active {
      transition-duration: 1s;
      background-position: -2800px 0;
    }
  }
  p {
    margin-left: 24px;
  }
`;
const LikeIcon = ({ likes }) => {
  const [clicked, setClicked] = useState(false);
  const handleLike = () => {
    if (clicked === false) {
      setClicked(true);
    }
  };
  return (
    <LikeWrapper>
      <div
        className={clicked ? "heart is-active" : "heart"}
        onClick={handleLike}
      ></div>
    </LikeWrapper>
  );
};

export default LikeIcon;
