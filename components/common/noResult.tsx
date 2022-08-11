import styled from "@emotion/styled";
import * as theme from "@/styles/theme";

const NoResult = () => {
  return (
    <Container>
      <ImageContainer>
        <img src="/image/crush.png" alt="검색 결과가 없습니다!" aria-hidden />
      </ImageContainer>
      <Text>검색 결과가 없습니다!</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 835px;
  height: 420px;
  opacity: 0.7;
`;

const ImageContainer = styled.div`
  transform: rotate(-9deg);
  img {
    display: block;
  }
`;

const Text = styled.span`
  ${theme.text.$headline5}
  color: ${theme.color.$mainColor};
`;

export default NoResult;
