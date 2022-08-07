import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Header from "@/components/common/header";

const NotFound = () => {
  const HeaderMemo = React.useMemo(() => <Header />, []);

  return (
    <Layout>
      {HeaderMemo}
      <Main>404~</Main>
    </Layout>
  );
};

export default NotFound;

const Layout = styled.div`
  min-height: 100vh;
  /* main {
    display: flex;
    min-height: calc(100vh-62px);
  } */
  box-sizing: border-box;
`;

const Main = styled.main`
  position: relative;
  height: calc(100vh-62px);

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 719px;
    min-height: calc(100vh-62px);
    bottom: 0;
    background: url("/image/404-background.png");
    background-size: 1440px 719px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    z-index: -100;
  }
`;
