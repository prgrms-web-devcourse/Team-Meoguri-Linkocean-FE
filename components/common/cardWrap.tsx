import styled from "@emotion/styled";

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, calc(20% - 20px));
  max-width: 1140px;
  gap: 25px;
  @media (max-width: 1140px) {
    grid-template-columns: repeat(4, calc(25% - 19px));
    width: 100%;
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, calc(50% - 12px));
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 100%);
  }
`;

export default CardWrap;
