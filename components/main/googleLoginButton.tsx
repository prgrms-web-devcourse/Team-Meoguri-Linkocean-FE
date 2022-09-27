import { getQueryString } from "@/utils/queryString";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRef, useEffect } from "react";
import LoginButton from "./loginButton";

const GOOGLE_END_POINT = "https://accounts.google.com/o/oauth2/v2/auth";
const SCOPE = "https://www.googleapis.com/auth/userinfo.email";

const GoogleLoginButton = () => {
  const authorizationURL = useRef("");

  useEffect(() => {
    const params = {
      client_id: process.env.GOOGLE_ID,
      redirect_uri: window.location.origin,
      response_type: "code",
      scope: SCOPE,
    };
    authorizationURL.current = `${GOOGLE_END_POINT}?${getQueryString(params)}`;
  }, []);

  return (
    <Link href={authorizationURL.current}>
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
