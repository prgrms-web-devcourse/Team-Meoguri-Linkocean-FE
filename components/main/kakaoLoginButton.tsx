import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";
import LoginButton from "./loginButton";

const KakaoLoginButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <KakaoButton {...props}>
      <KakaoIcon />
      카카오 로그인
    </KakaoButton>
  );
};

const KakaoButton = styled(LoginButton)`
  color: rgba(0, 0, 0, 85);
  background-color: #fee500;
`;

const KakaoIcon = styled.span`
  background: url("/icon/kakao.svg") no-repeat center center;
  background-size: 38px 38px;
  display: inline-block;
  vertical-align: middle;
  width: 45px;
  height: 45px;
`;

export default KakaoLoginButton;
