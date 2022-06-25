import React from "react";
import CreatePost from "../components/CreatePost";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;
const Create = () => {
  return (
    <Wrapper>
      <CreatePost />
    </Wrapper>
  );
};

export default Create;
