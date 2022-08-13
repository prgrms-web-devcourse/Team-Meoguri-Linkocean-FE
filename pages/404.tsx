import styled from "@emotion/styled";
import React, { useState } from "react";
import Header from "@/components/common/header";
import { color } from "@/styles/theme";
import Button from "@/components/common/button";
import Link from "next/link";
import NotFoundTooltip from "@/components/common/notFoundTooltip";

const NotFound = () => {
  const HeaderMemo = React.useMemo(() => <Header />, []);
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

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
          <MemberWrapper>
            <Joy
              src="/image/joy.png"
              width={109}
              height={104}
              onMouseOver={toggle}
              onMouseOut={toggle}
            />
            {show && <JoyToolTip index="joy" />}
            <Nadia src="/image/nadia.png" width={123} height={102} />
            <Hani src="/image/hani.png" width={187} height={176} />
            <Crush src="/image/crush.png" width={164} height={164} />
            <Jacob src="/image/jacob.png" width={143} height={145} />
            <Hyoni src="/image/hyoni.png" width={64} height={53} />
            <Haha src="/image/haha.png" width={84} height={85} />
            <Groot src="/image/groot.png" width={173} height={159} />
          </MemberWrapper>
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
  margin-top: 8%;
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

const MemberWrapper = styled.div`
  position: relative;
`;

const Joy = styled.img`
  position: fixed;
  left: 3%;
  bottom: 30%;
  cursor: pointer;

  &:hover {
  }
`;

const JoyToolTip = styled(NotFoundTooltip)`
  position: fixed;
  left: 4%;
  bottom: 48%;
`;

const Nadia = styled.img`
  position: fixed;
  left: 18%;
  bottom: 25%;
  cursor: pointer;
`;

const Hani = styled.img`
  position: fixed;
  left: 33%;
  bottom: 5%;
  cursor: pointer;
`;

const Crush = styled.img`
  position: fixed;
  left: 54%;
  bottom: 13%;
  cursor: pointer;
`;

const Jacob = styled.img`
  position: fixed;
  left: 72%;
  bottom: 23%;
  cursor: pointer;
`;

const Hyoni = styled.img`
  position: fixed;
  left: 1%;
  bottom: 3%;
  cursor: pointer;
`;

const Haha = styled.img`
  position: fixed;
  left: 79%;
  bottom: 2%;
  cursor: pointer;
`;

const Groot = styled.img`
  position: fixed;
  left: 87%;
  bottom: 6%;
  cursor: pointer;
`;
