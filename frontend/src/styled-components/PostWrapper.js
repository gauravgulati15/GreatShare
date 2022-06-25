import styled from "styled-components";

const PostWrapper = styled.div`
  min-height: 90vh;
  h1 {
  }
  .first-row {
    display: flex;
    justify-content: space-around;
    height: 10vh;
    text-align: center;
  }
  .second-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .postlikes {
    display: flex;
    font-family: "Montserrat", sans-serif;
    align-items: center;
    justify-content: center;
    height: 10vh;
  }
  img {
    width: 30%;
    height: 30vh;
  }
  .postContent {
    width: 50%;
    font-size: 1.5em;
  }
  .likesCount {
    width: 80%;
    font-size: 1.2em;
  }
  .title {
    font-family: "Lobster", cursive;
    font-size: 2.5rem;
  }
  @media (max-width: 1525px) {
    .postContent {
      width: 50%;
      font-size: 1.1em;
    }
  }
  @media (max-width: 725px) {
    .postContent {
      width: 50%;
      font-size: 1em;
    }
    img {
      width: 200px;
      height: 200px;
    }
  }
  @media (max-width: 632px) {
    .postContent {
      width: 50%;
      font-size: 0.8em;
    }
  }
  @media (max-width: 498px) {
    .likesCount {
      width: 80%;
      font-size: 0.9em;
    }
    img {
      width: 150px;
      height: 150px;
    }
    .postContent {
      width: 50%;
      font-size: 0.6em;
    }
  }
  @media (max-width: 398px) {
    .second-row {
      flex-direction: column;
    }
    img {
      width: 200px;
      height: 200px;
    }
    .postContent {
      width: 80%;
      font-size: 0.7em;
    }
  }
`;

export default PostWrapper;
