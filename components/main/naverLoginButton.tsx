import styled from "@emotion/styled";
import Script from "next/script";
import { ButtonHTMLAttributes } from "react";
import LoginButton from "./loginButton";

const NaverLoginButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <NaverButton {...props}>
      <NaverIcon />
      네이버 로그인
    </NaverButton>
  );
};

const NaverButton = styled(LoginButton)`
  color: #fff;
  background-color: #03c75a;
`;

const NaverIcon = styled.span`
  background: url("/icon/naver.svg") no-repeat center center;
  background-size: 38px 38px;
  display: inline-block;
  vertical-align: middle;
  width: 45px;
  height: 45px;
`;

export default NaverLoginButton;
