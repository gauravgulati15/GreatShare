import styled from "styled-components";
const Postgrid = styled.div`
  align-self: center;
  display: grid;
  justify-content: space-around;
  margin-left: 10vw;
  width: 80%;
  gap: 20px;
  grid-template-columns: auto auto auto;

  @media (max-width: 980px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 672px) {
    grid-template-columns: auto;
  }
`;

export default Postgrid;
