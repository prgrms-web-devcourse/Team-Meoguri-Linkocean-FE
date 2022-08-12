import styled from "@emotion/styled";
import React from "react";
import Header from "@/components/common/header";
import { color } from "@/styles/theme";
import Button from "@/components/common/button";
import Link from "next/link";

const NotFound = () => {
  const HeaderMemo = React.useMemo(() => <Header />, []);

  return (
    <Layout>
      {HeaderMemo}
      <Main>
        <Back>
          <Title>404</Title>
          <Subtitle>Not Found</Subtitle>
          <ButtonWrapper>
            <Link href="/my/favorite" passHref>
              <Button buttonType="large" colorType="main-color">
                마이 페이지로...
              </Button>
            </Link>
          </ButtonWrapper>
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
  font-size: 100px;
  font-weight: 700;
  margin-top: 5%;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  color: ${color.$skyBlue};
  font-size: 50px;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;
