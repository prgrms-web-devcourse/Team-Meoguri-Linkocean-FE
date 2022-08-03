import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";
import LoginButton from "./loginButton";

const GoogleLoginButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <GoogleButton {...props}>
      <GoogleIcon />
      구글 로그인
    </GoogleButton>
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
