import styled from "styled-components";
const Postgrid = styled.div`
  display: grid;
  justify-content: space-around;
  width: 100%;
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
