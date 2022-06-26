import React, { useState } from "react";
import styled from "styled-components";
import SignupForm from "../styled-components/SignupForm";
import GreatShareService from "../API/api";
import { useNavigate, Navigate } from "react-router-dom";

const SignUpWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [phoneNo, setPhoneNo] = useState("");
  const [emailID, setEmailID] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailOtp,setEmailOtp] = useState("");
  const [phoneOtp,setPhoneOtp] = useState("");

  const [otpSend, setOtpSend] = useState({
    email: false,
    phoneNumber: false,
  });
  const [verification, setVerification] = useState({
    email: false,
    phoneNumber: false,
  });

  const sendPhoneCode = async (e)=>{
    // e.preventDefault();
    try{
      const res = await GreatShareService.sendPhoneCode(phoneNo);
      if(res[0]=== false){
        throw new Error(res[1]);
      }
      setOtpSend({...otpSend, phoneNumber: true});
      
    } catch(error){
      console.log(error);
      // TODO: alert
    }
  }

  const sendEmailCode = async (e)=>{
    // e.preventDefault();
    try{
      const res = await GreatShareService.sendEmailCode(emailID);
      if(res[0]=== false){
        throw new Error(res[1]);
      }
      setOtpSend({...otpSend, email: true});
      
    } catch(error){
      console.log(error);
      // TODO: alert
    }
  }

  const verifyPhoneCode = async (e)=>{
    // e.preventDefault();
    try{
      const res = await GreatShareService.verifyPhoneCode(phoneNo, phoneOtp);
      if(res[0]=== false){
        throw new Error(res[1]);
      }
      setVerification({...verification, phoneNumber: true});
      console.log(verification);
      console.log(res);
    } catch(error){
      console.log(error);
      // TODO: alert
    }
  }

  const verifyEmailCode = async (e)=>{
    // e.preventDefault();
    try{
      console.log(e.target.value);
      const res = await GreatShareService.verifyEmailCode(emailID, emailOtp);
      if(res[0]=== false){
        throw new Error(res[1]);
      }
      setVerification({...verification, email: true});
      console.log(verification);
    } catch(error){
      console.log(error);
      // TODO: alert
    }
  }

  const HandleSignUp = async(e) => {
    e.prevent.default();
    // if(true){
      try{
        const res = await GreatShareService.createNewUser({
          username: username,
          emailID: emailID,
          phoneNo: phoneNo,
          password: password
        });

        if(res[0] === false) throw new Error(res[1]);
        // TODO: alert

        return <Navigate to="/" replace={true}></Navigate>

      } catch(error){
        console.log(error);
      }
    // } else {
      // TODO: alert
    }

  return (
    <SignUpWrapper>
      <SignupForm onSubmit={()=>HandleSignUp}>
        <h2>Sign Up</h2>
        <div className="inputBox">
          <input type="text" required="required" onChange={(e)=>{setUsername(e.target.value)}}/>
          <span>Username</span>
        </div>
        <div className="inputBox">
          <input type="text" required="required" onChange={(e)=>{setPassword(e.target.value)}}/>
          <span>Password</span>
        </div>
        <div className="inputBox">
          <input type="text" required="required" onChange={(e)=>{setEmailID(e.target.value)}}/>
          <span>Email</span>
          <button
            className={otpSend.email ? "hidden" : ""}
            onClick={sendEmailCode}
            type="button"
          >
            Send OTP
          </button>
        </div>
        <div className={otpSend.email ? "inputBox" : "hidden"}>
          <input type="text" required="required" onChange={(e)=>setEmailOtp(e.target.value)}/>
          <span>Enter OTP</span>
          <button onClick={verifyEmailCode} type="button">Verify OTP</button>
        </div>
        <div className="inputBox">
          <input type="text" required="required" onChange={(e)=>setPhoneNo(e.target.value)}/>
          <span>Phone Number</span>
          <button
            className={otpSend.phoneNumber ? "hidden" : ""}
            onClick={sendPhoneCode}
            type="button"
          >
            Send OTP
          </button>
        </div>
        <div className={otpSend.phoneNumber ? "inputBox" : "hidden"}>
          <input type="text" required="required" onChange={(e)=>setPhoneOtp(e.target.value)}/>
          <span>Enter OTP</span>
          <button onClick={verifyPhoneCode} type="button">Verify OTP</button>
        </div>
        <input className="submitButton" type="submit" value="Sign up" />
      </SignupForm>
    </SignUpWrapper>
  );
};

export default SignUp;
