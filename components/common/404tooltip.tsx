import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";

const LogoutTooltip = () => {
  return (
    <Tooltip>
      <Logout />
      <Arrow />
    </Tooltip>
  );
};

export default LogoutTooltip;

const Tooltip = styled.div`
  display: position;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  margin-left: 17px;
  border-bottom: 12px solid transparent;
  border-top: 12px solid ${color.$skyBlue};
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
`;

const Logout = styled.div`
  width: 81px;
  height: 40px;
  border-radius: 8px;
  border: 3px solid ${color.$skyBlue};
  color: ${color.$skyBlue};
  ${text.$subtitle1};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`;
