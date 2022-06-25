import styled from "styled-components";

const UserProfile = styled.div`
  .Header {
    display: flex;
    width: 80%;
    justify-content: space-around;
    align-items: end;
  }
  .profilelikes {
    width: 40%;
    display: flex;
    justify-content: end;
    align-items: end;
  }
  h3 {
    margin: 0;
    color: white;
  }
  .user {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  h2 {
    margin-left: 1rem;
    padding-bottom: 5px;
    color: #ff67e7;
  }
  .hovertext {
    position: relative;
  }
  .hovertext:before {
    content: attr(data-hover);
    visibility: hidden;
    opacity: 0;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px 0;
    transition: opacity 0.5s ease-in-out;

    position: absolute;
    z-index: 1;
    right: 110%;
    top: 110%;
  }

  .hovertext:hover:before {
    opacity: 1;
    visibility: visible;
  }
`;

export default UserProfile;
