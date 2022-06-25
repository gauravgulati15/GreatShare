import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  height: 60px;
  margin-top: 1vh;
  bottom: 0;
  position: sticky;
  width: 100%;
  color: #d47ae8;
  padding: 0;
`;

const Footer = () => {
  return (
    <Wrapper>
      <p>Made by : Gaurav and Harsh with Love❤️❤️</p>
    </Wrapper>
  );
};

export default Footer;
