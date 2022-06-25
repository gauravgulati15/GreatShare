import styled from "styled-components";

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 80%;
  padding-left: 10vw;
  h2 {
    font-family: "Pacifico", cursive;
    font-size: 2em;
  }
  .comment {
    width: 60vw;
    height: 2.5vh;
    border-radius: 5px;
  }
  .submit {
    height: 3vh;
    margin-left: 1vw;
    background: white;
    border-radius: 5px;
    border: none;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
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
