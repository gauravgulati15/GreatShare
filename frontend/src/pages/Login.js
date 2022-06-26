import React, { useState } from "react";
import styled from "styled-components";
import CreateForm from "../styled-components/CreateForm";
import Authenticate from "../API/Authenticate";
import { useUserContext } from "../context/user_context";
import { useNavigate, Navigate } from "react-router-dom";
import GreatShareService from "../API/api";

const LoginForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const Login = () => {
  const {setAuthenticated, setUser, user } = useUserContext();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const res = await GreatShareService.getUserDetailsByEmailID(loginDetails.email);
      
      if(res[0]===false || res[1].password !== loginDetails.password){
        throw new Error("Invalid credentials");
      }
      setUser({
        userID: res[1].userID,
        username: res[1].username,
        emailID: res[1].emailID,
        phoneNo: res[1].phoneNo
      })
      setAuthenticated(true);
      console.log(user);
      // <Navigate to="/" replace={true}></Navigate>
    } catch(error){
      // TODO: alert
      console.log(error);
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
