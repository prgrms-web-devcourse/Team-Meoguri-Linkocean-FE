import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Header from "@/components/common/header";

const NotFound = () => {
  const HeaderMemo = React.useMemo(() => <Header />, []);

  return (
    <Layout>
      {HeaderMemo}
      <Main>
        {" "}
        <ImageWrapper>
          <Image
            src="/image/404-stone.png"
            width="476px"
            height="248px"
            style={{ marginLeft: "45px", marginTop: "32px" }}
          />
        </ImageWrapper>
      </Main>
    </Layout>
  );
};

export default NotFound;

const Layout = styled.div`
  min-height: 100vh;
  main {
    display: flex;
    min-height: calc(100vh-62px);
  }
  box-sizing: border-box;
`;

const Main = styled.main`
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80%;
    background: url("/image/404-ocean.png") no-repeat;
    background-size: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 412px;
  height: 205px;
  bottom: 0;
  right: 0;
`;
