import styled from "styled-components";

const SignupForm = styled.form`
  * {
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  background-color: white;

  display: flex;
  min-height: 55vh;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: max(20vw, 325px);
  border-radius: 5px;

  .inputBox {
    position: relative;
    width: 80%;
  }
  .inputBox input {
    width: 100%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    outline: none;
    color: pink;
    font-size: 1em;
  }
  .inputBox span {
    position: absolute;
    left: 0;
    padding: 10px;
    pointer-events: none;
    font-size: 0.8em;
    color: pink;

    transition: 0.4s;
  }
  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    color: pink;
    transform: translateX(10px) translateY(-7px);
    font-size: 0.65em;
    padding: 0 10px;
    background: white;
    border-left: 1px solid #00dfc4;
    border-right: 1px solid #00dfc4;
    letter-spacing: 0.2em;
  }
  h2 {
    margin: 15px;
  }
  .inputBox button {
    margin-top: 10px;
  }
  .submitButton {
    margin-bottom: 10px;
  }
  .hidden {
    display: none;
  }
`;
export default SignupForm;
