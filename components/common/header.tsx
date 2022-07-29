import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import Image from "next/image";
import ProfileImage from "@/components/common/profileImage";

const Header: React.FC = () => (
  <StyledHeader>
    <Logo>
      <Image src="/icon/logo.svg" alt="logo" width={252} height={48} />
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
      <UserImg>
        <ProfileImage size="sm" />
      </UserImg>
      <UserName>username</UserName>
    </UserWrapper>
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.header`
  height: 62px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${color.$gray400};
`;

const Logo = styled.div`
  cursor: pointer;
`;

const NavigatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Navigator = styled.div`
  margin: auto 20px;
  color: ${color.$gray600};
  ${text.$headline5};
  cursor: pointer;
`;

const UserWrapper = styled.div`
  display: flex;
`;

const AlarmButton = styled.div`
  margin: auto;
  cursor: pointer;
`;

const UserImg = styled.div`
  margin: auto 10px;
  cursor: pointer;
`;

const UserName = styled.div`
  color: ${color.$gray600};
  ${text.$headline5};
  margin: auto;
  cursor: pointer;
`;
