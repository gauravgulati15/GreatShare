import React, { useState } from "react";
import styled from "styled-components";
import CreateForm from "../styled-components/CreateForm";
import Authenticate from "../API/Authenticate";
import { useUserContext } from "../context/user_context";
import { useNavigate } from "react-router-dom";
const LoginForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const Login = () => {
  const { setAuthenticated } = useUserContext();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (Authenticate(loginDetails) === true) {
      console.log(Authenticate(loginDetails));
      setAuthenticated(true);
      navigate("/");
    } else {
      setLoginDetails({ email: "", password: "" });
    }
  };
  return (
    <LoginForm>
      <CreateForm onSubmit={handleLogin}>
        <h1>
          Great<span className="loginHeading">Share</span>
        </h1>
        <div className="inputBox">
          <input
            type="text"
            name="email"
            id="email"
            required="required"
            value={loginDetails.email}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, email: e.target.value });
            }}
          />
          <span>Email</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="password"
            id="password"
            required="required"
            value={loginDetails.password}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, password: e.target.value });
            }}
          />
          <span>Password</span>
        </div>
        <button type="submit">Log In</button>

        <div className="signUpRedirect">
          <h3>New user? </h3>
          <a href="/signup">Sign Up</a>
        </div>
      </CreateForm>
    </LoginForm>
  );
};

export default Login;
