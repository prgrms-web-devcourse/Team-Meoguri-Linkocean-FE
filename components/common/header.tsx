import styled from "@emotion/styled";
import { useState } from "react";
import { color, text } from "@/styles/theme";
import Image from "next/image";
import ProfileImage from "@/components/common/profileImage";
import LogoutTooltip from "@/components/common/logoutTooltip";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <StyledHeader>
      <Logo>
        <LinkOcean />
        <Image src="/icon/logo.svg" alt="Link Ocean" width={252} height={48} />
      </Logo>
      <NavigatorWrapper>
        <Navigator>피드</Navigator>
        <Navigator>머구리 찾기</Navigator>
        <Navigator>마이페이지</Navigator>
      </NavigatorWrapper>
      <UserWrapper>
        <AlarmButton>
          <Image src="/icon/bell.svg" alt="alarm" width={30} height={30} />
        </AlarmButton>
        <UserImg onClick={toggle}>
          <ProfileImage size="sm" />
        </UserImg>
        <UserName onClick={toggle}>username</UserName>
        <LogoutTooltip
          onMouseLeave={toggle}
          style={{ display: show ? "block" : "none" }}
        />
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  min-width: 820px;
  height: 62px;
  padding: 0 20px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 2px solid ${color.$gray400};
`;

const Logo = styled.div`
  cursor: pointer;
  padding-top: 5px;
`;

const LinkOcean = styled.h1`
  position: absolute;
  margin: -1px;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  white-space: nowrap;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
`;

const NavigatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Navigator = styled.nav`
  margin: auto 20px;
  color: ${color.$gray600};
  ${text.$headline5};
  cursor: pointer;
`;

const UserWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const AlarmButton = styled.div`
  cursor: pointer;
`;

const UserImg = styled.div`
  margin: auto 10px;
  cursor: pointer;
`;

const UserName = styled.div`
  color: ${color.$gray600};
  ${text.$headline5};
  cursor: pointer;
`;
