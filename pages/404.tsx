import styled from "@emotion/styled";
import React, { useState } from "react";
import { color } from "@/styles/theme";
import Link from "next/link";
import { Header, Button, NotFound, Meta } from "@/components/common";

const NotFoundPage = () => {
  const HeaderMemo = React.useMemo(() => <Header />, []);
  const [joyShow, setJoyShow] = useState(false);
  const [nadiaShow, setNadiaShow] = useState(false);
  const [haniShow, setHaniShow] = useState(false);
  const [crushShow, setCrushShow] = useState(false);
  const [jacobShow, setJacobShow] = useState(false);
  const [hyoniShow, setHyoniShow] = useState(false);
  const [hahaShow, setHahaShow] = useState(false);
  const [grootShow, setGrootShow] = useState(false);

  const joyToggle = () => {
    setJoyShow(!joyShow);
  };
  const nadiaToggle = () => {
    setNadiaShow(!nadiaShow);
  };
  const haniToggle = () => {
    setHaniShow(!haniShow);
  };
  const crushToggle = () => {
    setCrushShow(!crushShow);
  };
  const jacobToggle = () => {
    setJacobShow(!jacobShow);
  };
  const hyoniToggle = () => {
    setHyoniShow(!hyoniShow);
  };
  const hahaToggle = () => {
    setHahaShow(!hahaShow);
  };
  const grootToggle = () => {
    setGrootShow(!grootShow);
  };

  return (
    <>
      <Meta title="404 Not Found" robots="noindex, nofollow" />
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
                onMouseOver={joyToggle}
                onMouseOut={joyToggle}
              />
              {joyShow && <JoyTooltip index="joy" />}

              <Nadia
                src="/image/nadia.png"
                width={123}
                height={102}
                onMouseOver={nadiaToggle}
                onMouseOut={nadiaToggle}
              />
              {nadiaShow && <NadiaTooltip index="nadia" />}

              <Hani
                src="/image/hani.png"
                width={187}
                height={176}
                onMouseOver={haniToggle}
                onMouseOut={haniToggle}
              />
              {haniShow && <HaniTooltip index="hani" />}

              <Crush
                src="/image/crush.png"
                width={164}
                height={164}
                onMouseOver={crushToggle}
                onMouseOut={crushToggle}
              />
              {crushShow && <CrushTooltip index="crush" />}

              <Jacob
                src="/image/jacob.png"
                width={143}
                height={145}
                onMouseOver={jacobToggle}
                onMouseOut={jacobToggle}
              />
              {jacobShow && <JacobTooltip index="jacob" />}

              <Hyoni
                src="/image/hyoni.png"
                width={64}
                height={53}
                onMouseOver={hyoniToggle}
                onMouseOut={hyoniToggle}
              />
              {hyoniShow && <HyoniTooltip index="hyoni" />}

              <Haha
                src="/image/haha.png"
                width={84}
                height={85}
                onMouseOver={hahaToggle}
                onMouseOut={hahaToggle}
              />
              {hahaShow && <HahaTooltip index="haha" />}

              <Groot
                src="/image/groot.png"
                width={173}
                height={159}
                onMouseOver={grootToggle}
                onMouseOut={grootToggle}
              />
              {grootShow && <GrootTooltip index="groot" />}
            </MemberWrapper>
          </Back>
        </Main>
      </Layout>
    </>
  );
};

export default NotFoundPage;

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
`;

const JoyTooltip = styled(NotFound)`
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

const NadiaTooltip = styled(NotFound)`
  position: fixed;
  left: 19%;
  bottom: 40%;
`;

const Hani = styled.img`
  position: fixed;
  left: 33%;
  bottom: 5%;
  cursor: pointer;
`;

const HaniTooltip = styled(NotFound)`
  position: fixed;
  left: 36%;
  bottom: 26%;
`;

const Crush = styled.img`
  position: fixed;
  left: 54%;
  bottom: 13%;
  cursor: pointer;
`;

const CrushTooltip = styled(NotFound)`
  position: fixed;
  left: 57%;
  bottom: 36%;
`;

const Jacob = styled.img`
  position: fixed;
  left: 72%;
  bottom: 23%;
  cursor: pointer;
`;

const JacobTooltip = styled(NotFound)`
  position: fixed;
  left: 73.5%;
  bottom: 45%;
`;

const Hyoni = styled.img`
  position: fixed;
  left: 2%;
  bottom: 3%;
  cursor: pointer;
`;

const HyoniTooltip = styled(NotFound)`
  position: fixed;
  left: 1.5%;
  bottom: 14%;
`;

const Haha = styled.img`
  position: fixed;
  left: 79%;
  bottom: 1.5%;
  cursor: pointer;
`;

const HahaTooltip = styled(NotFound)`
  position: fixed;
  left: 79%;
  bottom: 14%;
`;

const Groot = styled.img`
  position: fixed;
  left: 87%;
  bottom: 6%;
  cursor: pointer;
`;

const GrootTooltip = styled(NotFound)`
  position: fixed;
  left: 89.5%;
  bottom: 25%;
`;
