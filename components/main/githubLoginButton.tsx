import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";
import LoginButton from "./loginButton";

const GithubLoginButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <GithubButton {...props}>
      <GithubIcon />
      깃허브 로그인
    </GithubButton>
  );
};

const GithubButton = styled(LoginButton)`
  color: #fff;
  background-color: #22272b;
  cursor: pointer;
  box-sizing: border-box;
`;

const GithubIcon = styled.span`
  background: url("/icon/github.svg") no-repeat center center;
  background-size: 25px 25px;
  display: inline-block;
  vertical-align: middle;
  width: 45px;
  height: 45px;
`;

export default GithubLoginButton;
