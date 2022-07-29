import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";

const userTooltip = () => {
  const handleLogout = () => {
    // logout
  };

  return (
    <>
      <Arrow />
      <Logout onClick={() => handleLogout}>Logout</Logout>
    </>
  );
};

export default userTooltip;

const Arrow = styled.div`
  width: 0;
  height: 0;
  margin-left: 146px;
  border-bottom: 8px solid ${color.$skyBlue};
  border-top: 8px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
`;

const Logout = styled.div`
  width: 180px;
  height: 35px;
  border-radius: 8px;
  border: 4px solid ${color.$skyBlue};
  color: ${color.$skyBlue};
  ${text.$subtitle1};
  display: flex;
  justify-content: center;
  align-items: center;
`;
