import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import { handleLogout } from "@/utils/logout";

const LogoutTooltip = ({ ...props }) => {
  return (
    <Tooltip {...props}>
      <Arrow />
      <Logout onClick={handleLogout}>logout</Logout>
    </Tooltip>
  );
};

export default LogoutTooltip;

const Tooltip = styled.div`
  position: absolute;
  margin-top: 90px;
  right: 200px;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  margin-left: 88px;
  border-bottom: 8px solid ${color.$skyBlue};
  border-top: 8px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
`;

const Logout = styled.div`
  width: 177px;
  height: 40px;
  border-radius: 8px;
  border: 3px solid ${color.$skyBlue};
  background-color: white;
  color: ${color.$skyBlue};
  ${text.$subtitle1};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`;
