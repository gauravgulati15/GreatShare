import React, { useState } from "react";
import styled from "styled-components";
import SignupForm from "../styled-components/SignupForm";
const SignUpWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const SignUp = () => {
  const Verify = () => {};
  const HandleSignUp = () => {};
  const [verification, setVerification] = useState({
    email: false,
    phoneNumber: false,
  });
  const [otpSend, setOtpSend] = useState({
    email: false,
    phoneNumber: false,
  });
  return (
    <SignUpWrapper>
      <SignupForm onSubmit={HandleSignUp}>
        <h2>Sign Up</h2>
        <div className="inputBox">
          <input type="text" required="required" />
          <span>Username</span>
        </div>
        <div className="inputBox">
          <input type="text" required="required" />
          <span>Password</span>
        </div>
        <div className="inputBox">
          <input type="text" required="required" />
          <span>Email</span>
          <button
            className={otpSend.email ? "hidden" : ""}
            onClick={() => setOtpSend({ ...otpSend, email: true })}
          >
            Send OTP
          </button>
        </div>
        <div className={otpSend.email ? "inputBox" : "hidden"}>
          <input type="text" required="required" />
          <span>Enter OTP</span>
          <button>Verify OTP</button>
        </div>
        <div className="inputBox">
          <input type="text" required="required" />
          <span>Phone Number</span>
          <button
            className={otpSend.phoneNumber ? "hidden" : ""}
            onClick={() => setOtpSend({ ...otpSend, phoneNumber: true })}
          >
            Send OTP
          </button>
        </div>
        <div className={otpSend.phoneNumber ? "inputBox" : "hidden"}>
          <input type="text" required="required" />
          <span>Enter OTP</span>
          <button>Verify OTP</button>
        </div>
        <input className="submitButton" type="submit" value="Sign up" />
      </SignupForm>
    </SignUpWrapper>
  );
};

export default SignUp;
