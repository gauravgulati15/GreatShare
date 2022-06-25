import React from "react";
import styled from "styled-components";
import CreateForm from "../styled-components/CreateForm";
const LoginForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const Login = () => {
  return (
    <LoginForm>
      <CreateForm>
        <h1>Great Share</h1>
        <div className="inputBox">
          <input type="text" name="email" id="email" required="required" />
          <span>Email</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="password"
            id="password"
            required="required"
          />
          <span>Password</span>
        </div>
        <button>Log In</button>

        <div className="signUpRedirect">
          <h3>New user? </h3>
          <a href="/signup">Sign Up</a>
        </div>
      </CreateForm>
    </LoginForm>
  );
};

export default Login;
