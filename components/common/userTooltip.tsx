import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import Image from "next/image";

const userTooltip = () => (
  <Tooltip>
    <Arrow />
    <Logout>Logout</Logout>
  </Tooltip>
);

export default userTooltip;

const Tooltip = styled.div``;

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
