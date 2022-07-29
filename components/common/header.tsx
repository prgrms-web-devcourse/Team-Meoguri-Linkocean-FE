import styled from "@emotion/styled";
// import LogoIcon from "@/pages/logo.svg";
import { color, text } from "../../styles/theme";
// import Logo from "./logo.svg";
// import bell from "../../public/icon/bell.svg";

const Header: React.FC = () => (
  <StyledHeader>
    <LogoArea />
    <NavigatorWrapper>
      <Navigator>피드</Navigator>
      <Navigator>머구리 찾기</Navigator>
      <Navigator>마이페이지</Navigator>
    </NavigatorWrapper>
    <UserInfo />
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.header`
  height: 62px;
  margin: 0 auto;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
`;

const LogoArea = styled.div`
  height: 62px;
  width: 10px;
  border: 1px solid;
`;

const NavigatorWrapper = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;

const Navigator = styled.div`
  margin: auto;
  color: ${color.$gray600};
  font: ${text.$headline5};
`;

const UserInfo = styled.div`
  height: 62px;
  width: 10px;
  border: 1px solid;
`;
