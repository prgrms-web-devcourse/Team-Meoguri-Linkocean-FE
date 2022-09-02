import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { color } from "@/styles/theme";
import Image from "next/image";
import ProfileImage from "@/components/common/profileImage";
import LogoutTooltip from "@/components/common/logoutTooltip";
import Button from "@/components/common/button";
import Link from "next/link";
import { useProfileState } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import storage from "@/utils/localStorage";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const [feed, setFeed] = useState(false);
  const [meoguri, setMeoguri] = useState(false);
  const [my, setMy] = useState(false);
  const router = useRouter();

  const { imageUrl } = useProfileState();

  const toggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (!storage.getItem("LINKOCEAN_TOKEN", false)) {
      router.push("/");
      alert("로그인 후 이용 가능한 서비스 입니다.");
    }
  }, [router]);

  useEffect(() => {
    if (window.location.pathname === "/feed") {
      setFeed(true);
    }

    if (window.location.pathname === "/meoguri") {
      setMeoguri(true);
    }

    if (window.location.pathname === "/my/favorite") {
      setMy(true);
    }
  }, [feed, meoguri, my]);

  return (
    <StyledHeader>
      <NavigatorWrapper>
        <Link href="/my/favorite" passHref>
          <Logo>
            <LinkOcean />
            <Image
              src="/image/logo.png"
              alt="Link Ocean"
              width={188}
              height={37}
            />
          </Logo>
        </Link>
        <Link href="/feed" passHref>
          {feed ? (
            <CurrentNavigator>전체 피드</CurrentNavigator>
          ) : (
            <Navigator>전체 피드</Navigator>
          )}
        </Link>
        <Link href="/meoguri" passHref>
          {meoguri ? (
            <CurrentNavigator>사용자 검색</CurrentNavigator>
          ) : (
            <Navigator>사용자 검색</Navigator>
          )}
        </Link>
        <Link href="/my/favorite" passHref>
          {my ? (
            <CurrentNavigator>마이페이지</CurrentNavigator>
          ) : (
            <Navigator>마이페이지</Navigator>
          )}
        </Link>
      </NavigatorWrapper>

      <UserWrapper>
        <Link href="/my/favorite">
          <Icon
            src="/icon/favorite.svg"
            alt="favorite"
            width={30}
            height={30}
          />
        </Link>
        <Link href="/notification" passHref>
          <AlarmWrapper>
            <Icon src="/icon/bell.svg" alt="alarm" width={30} height={30} />
          </AlarmWrapper>
        </Link>
        <UserImg onClick={toggle}>
          <ProfileImage size="sm" src={imageUrl} />
        </UserImg>
        <LogoutTooltip
          onMouseLeave={toggle}
          style={{ display: show ? "block" : "none" }}
        />
        <Link href="/create">
          <Button
            buttonType="large"
            colorType="main-color"
            width="127"
            style={{ margin: "120px auto" }}
          >
            북마크 추가 +
          </Button>
        </Link>
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.h1`
  min-width: 820px;
  height: 80px;
  padding: 0 125px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 1px solid ${color.$gray400};
`;

const Logo = styled.a`
  cursor: pointer;
  padding-top: 20px;
  margin-right: 20px;
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

const CurrentNavigator = styled.a`
  margin: auto 20px;
  color: ${color.$mainColor};
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  text-decoration: none;
  cursor: pointer;
`;

const UserWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Icon = styled(Image)`
  cursor: pointer;
`;

const AlarmWrapper = styled.div`
  margin: 0 10px 0 10px;
`;

const UserImg = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;
