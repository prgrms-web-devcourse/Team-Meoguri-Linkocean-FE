import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import LoginButton from "@/components/main/loginButton";
import { useEffect, MouseEvent, useCallback } from "react";
import { useRouter } from "next/router";
import profileAPI, { Login, OauthType } from "@/utils/apis/profile";
import storage from "@/utils/localStorage";
import GoogleLoginButton from "../components/main/googleLoginButton";
import NaverLoginButton from "../components/main/naverLoginButton";
import KakaoLoginButton from "../components/main/kakaoLoginButton";

const OAUTH_TYPE = "OAUTH_TYPE";
const TOKEN_KEY = "LINKOCEAN_TOKEN";

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();

  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    const oauthType = e.currentTarget.name as OauthType;
    const upperOAuthType = oauthType.toUpperCase();
    storage.setItem(OAUTH_TYPE, upperOAuthType);

    (async () => {
      try {
        await signIn(oauthType);
      } catch (error) {
        console.error(error);
      }
    })();
  };
  const handleSignOut = () => {
    signOut();

    storage.removeItem(OAUTH_TYPE);
    storage.removeItem(TOKEN_KEY);
  };

  const login = useCallback(async (payload: Login) => {
    try {
      const response = await profileAPI.login(payload);
      storage.setItem(TOKEN_KEY, response.data.token);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const loginSuccess = useCallback(async () => {
    try {
      const response = await profileAPI.loginSuccess();
      const nextPage = response.data.hasProfile ? "/my/favorite" : "/signup";
      router.push(nextPage);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    if (session) {
      (async () => {
        const oauthType = storage.getItem(OAUTH_TYPE, "");
        if (oauthType === "") {
          return;
        }

        await login({ email: session?.user?.email as string, oauthType });
        await loginSuccess();
      })();
    }
  }, [login, loginSuccess, session, session?.user?.email]);

  return (
    <>
      <Head>
        <title>LinkOcean</title>
      </Head>

      <Section>
        <SectionLayout>
          <LoginContainer>
            <Logo>
              <LinkOcean>
                <Image
                  src="/image/link-ocean.png"
                  alt="링크오션"
                  width={220}
                  height={41}
                />
              </LinkOcean>
              <div>
                <Image
                  src="/image/whale.png"
                  alt="링크오션 고래"
                  aria-hidden
                  width={164}
                  height={129}
                />
              </div>
            </Logo>

            <ButtonContainer>
              <GoogleLoginButton
                name="google"
                onClick={handleLogin}
                disabled={!!session}
              />
              <NaverLoginButton
                name="naver"
                onClick={handleLogin}
                disabled={!!session}
              />
              <KakaoLoginButton
                name="kakao"
                onClick={handleLogin}
                disabled={!!session}
              />
              <LogoutButton
                type="button"
                onClick={handleSignOut}
                disabled={!session}
              >
                임시 로그아웃
              </LogoutButton>
            </ButtonContainer>
          </LoginContainer>

          <AboutContainer>
            <Title>
              세계 최고의
              <br />
              북마크 공유 & 관리 서비스!
            </Title>

            <div>
              <MeoguriDescription>
                머구리란?
                <br />
                ‘바닷물 속에서 고기나 해산물을 채취하는 다이버나
                <br />
                잠수부를 가리키는 옛말’로
                <br />
                Link Ocean 사용자를 뜻합니다.
              </MeoguriDescription>
            </div>
          </AboutContainer>
        </SectionLayout>
      </Section>
    </>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(186, 229, 255, 0) 88.02%,
    rgba(187, 229, 255, 0.61) 100%
  );
`;

const SectionLayout = styled.div`
  display: inline-flex;
  gap: 76px;
`;

const LoginContainer = styled.div`
  order: 1;
  width: 380px;
  height: 530px;
  border: 3px solid ${theme.color.$skyBlue};
  border-radius: 8px;
  padding: 53px 63px 62px;
  text-align: center;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  display: flex;
  flex-direction: column;
  margin-bottom: 33px;
`;

const LinkOcean = styled.div`
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
`;

const LogoutButton = styled(LoginButton)`
  color: #fff;
  background-color: ${theme.color.$mainColor};
`;

const AboutContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 752px;
  height: 530px;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    bottom: 15px;
    left: -60px;
    width: 235px;
    height: 218px;
    background: url("/image/main-left-bubble.png") no-repeat;
    background-size: 235px 218px;
  }

  &::after {
    content: "";
    position: absolute;
    top: -62px;
    right: -26px;
    width: 168px;
    height: 162px;
    background: url("/image/main-right-bubble.png") no-repeat;
    background-size: 168px 162px;
  }
`;

const Title = styled.h2`
  ${theme.text.$headline2}
`;

const MeoguriDescription = styled.p`
  float: right;
  color: ${theme.color.$gray800};
  ${theme.text.$headline5}
`;
