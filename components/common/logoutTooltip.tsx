import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import useLogout from "@/hooks/useLogout";
import { ReactElement } from "react";
import useToggle from "@/hooks/useToggle";

const LogoutTooltip = ({ children, ...props }: { children?: ReactElement }) => {
  const logout = useLogout();
  const [toggle, setToggle] = useToggle(false);

  return (
    <Tooltip {...props} onClick={setToggle}>
      {children}
      {toggle ? (
        <Wrap>
          <Arrow />
          <Logout onClick={logout}>logout</Logout>
        </Wrap>
      ) : null}
    </Tooltip>
  );
};

export default LogoutTooltip;

const Tooltip = styled.div`
  position: relative;
`;

const Wrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  margin-left: 80px;
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
