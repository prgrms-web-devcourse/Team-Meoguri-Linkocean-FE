import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import Link from "next/link";
import storage from "@/utils/localStorage";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const LogoutTooltip = ({ ...props }) => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      storage.removeItem("OAUTH_TYPE");
      storage.removeItem("LINKOCEAN_TOKEN");
      signOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tooltip {...props}>
      <Arrow />
      <Link href="/" passHref>
        <Logout onClick={handleLogout}>logout</Logout>
      </Link>
    </Tooltip>
  );
};

export default LogoutTooltip;

const Tooltip = styled.div`
  position: absolute;
  margin-top: 110px;
  right: 20px;
`;

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
