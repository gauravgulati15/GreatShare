import styled from "styled-components";

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 0 20px;
  h2 {
    font-family: "Pacifico", cursive;
    font-size: 2em;
  }
  .comment {
    width: 80vw;
    height: 2.5vh;
    border-radius: 5px;
  }
  .submit {
    height: 3vh;
    margin-left: 1vw;
  }
  .comment::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */

    opacity: 1; /* Firefox */
    font-family: "Fira Sans", sans-serif;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    font-family: "Fira Sans", sans-serif;
  }
  .singlecomment {
    text-align: start;
  }
  .singlecomment p {
    margin: 10px;
    font-size: 1.1em;
    font-family: "Montserrat", sans-serif;
  }
  .username {
    text-decoration: none;
    font-weight: 700;
  }
`;

export default CommentsWrapper;
