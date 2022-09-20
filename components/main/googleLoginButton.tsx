import { getQueryString } from "@/utils/queryString";
import styled from "@emotion/styled";
import Link from "next/link";
import LoginButton from "./loginButton";

const GOOGLE_END_POINT = "https://accounts.google.com/o/oauth2/v2/auth";
const params = {
  client_id: process.env.GOOGLE_ID,
  redirect_uri: process.env.REDIRECT_URI,
  response_type: "code",
  scope: "https://www.googleapis.com/auth/userinfo.email",
};
const authorizationURL = `${GOOGLE_END_POINT}?${getQueryString(params)}`;

const GoogleLoginButton = () => {
  return (
    <Link href={authorizationURL}>
      <GoogleButton>
        <GoogleIcon />
        구글 로그인
      </GoogleButton>
    </Link>
  );
};

const GoogleButton = styled(LoginButton)`
  color: #7f7f7f;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.25);
  cursor: pointer;
  box-sizing: border-box;
`;

const GoogleIcon = styled.span`
  background: url("/icon/google.svg") no-repeat center center;
  background-size: 24px 24px;
  display: inline-block;
  vertical-align: middle;
  width: 45px;
  height: 45px;
`;

export default GoogleLoginButton;
