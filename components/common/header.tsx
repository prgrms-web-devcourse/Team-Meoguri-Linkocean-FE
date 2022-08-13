import styled from "@emotion/styled";
import { useState } from "react";
import { color } from "@/styles/theme";
import Image from "next/image";
import ProfileImage from "@/components/common/profileImage";
import LogoutTooltip from "@/components/common/logoutTooltip";
import Link from "next/link";
import { useProfileState } from "@/hooks/useProfile";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);

  const { username, imageUrl } = useProfileState();

  const toggle = () => {
    setShow(!show);
  };

  return (
    <StyledHeader>
      <Link href="/my/favorite" passHref>
        <Logo>
          <LinkOcean />
          <Image
            src="/image/logo.jpg"
            alt="Link Ocean"
            width={252}
            height={44}
          />
        </Logo>
      </Link>
      <NavigatorWrapper>
        <Link href="/feed" passHref>
          <Navigator>전체 피드</Navigator>
        </Link>
        <Link href="/meoguri" passHref>
          <Navigator>머구리 찾기</Navigator>
        </Link>
        <Link href="/my/favorite" passHref>
          <Navigator>마이페이지</Navigator>
        </Link>
      </NavigatorWrapper>
      <UserWrapper>
        <Link href="/notification" passHref>
          <AlarmButton>
            <Image src="/icon/bell.svg" alt="alarm" width={30} height={30} />
          </AlarmButton>
        </Link>
        <UserImg onClick={toggle}>
          <ProfileImage size="sm" src={imageUrl} />
        </UserImg>
        <UserName onClick={toggle}>{username}</UserName>
        <LogoutTooltip
          onMouseLeave={toggle}
          style={{ display: show ? "block" : "none" }}
        />
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.h1`
  min-width: 820px;
  height: 62px;
  padding: 0 20px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 1px solid ${color.$gray400};
`;

const Logo = styled.a`
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

const Navigator = styled.a`
  margin: auto 20px;
  color: ${color.$gray600};
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${color.$gray800};
  }
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
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  cursor: pointer;
  user-select: none;
  margin-right: 20px;

  &:active {
    color: ${color.$gray800};
  }
`;
