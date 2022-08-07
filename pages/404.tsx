import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Header from "@/components/common/header";
import { color, text } from "@/styles/theme";

const NotFound = () => {
  const HeaderMemo = React.useMemo(() => <Header />, []);

  return (
    <Layout>
      {HeaderMemo}
      <Main>
        <Back>
          <Title>404</Title>
          <Subtitle>Not Found</Subtitle>
          {/* <StyledImage src="/image/joy.png" width={325} height={176} /> */}
        </Back>
      </Main>
    </Layout>
  );
};

export default NotFound;

const Layout = styled.div`
  min-height: 100vh;
  main {
    display: flex;
    min-height: calc(100vh - 62px);
  }
  box-sizing: border-box;
`;

const Main = styled.main`
  height: calc(100vh - 62px);
`;

const Back = styled.div`
  display: block;
  width: 100%;
  height: calc(100vh - 62px);
  background: url("/image/404-background.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 0 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  color: ${color.$skyBlue};
  font-size: 200px;
  font-weight: 700;
  margin-top: 5%;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  color: ${color.$skyBlue};
  font-size: 74px;
  font-weight: 700;
`;

// const StyledImage = styled(Image)`
//   position: absolute;
// `;
