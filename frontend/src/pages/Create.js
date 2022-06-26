import React from "react";
import CreatePost from "../components/CreatePost";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import { useNavigate, Navigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const Create = () => {
  const navigate = useNavigate();
  const { authenticated, user } = useUserContext();
  console.log(authenticated);
  if(authenticated === false){
    return <Navigate to="/login" replace={true}></Navigate>
  }

  return (
    <Wrapper>
      <CreatePost user={user}/>
    </Wrapper>
  );
};

export default Create;
