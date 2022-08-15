import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useEffect, MouseEvent, useCallback } from "react";
import styled from "@emotion/styled";
import { Meta, ErrorText } from "@/components/common";
import {
  GoogleLoginButton,
  KakaoLoginButton,
  GithubLoginButton,
} from "@/components/main";
import profileAPI, { LoginPayload, OauthType } from "@/utils/apis/profile";
import storage from "@/utils/localStorage";
import { LINKOCEAN_PATH, STORAGE_KEY } from "@/utils/constants";
import { handleLogout } from "@/utils/logout";
import * as theme from "@/styles/theme";

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();

  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    const oauthType = e.currentTarget.name as OauthType;
    const upperOAuthType = oauthType.toUpperCase();
    storage.setItem(STORAGE_KEY.oauthType, upperOAuthType);

    (async () => {
      try {
        await signIn(oauthType);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const login = useCallback(async (payload: LoginPayload) => {
    try {
      const response = await profileAPI.login(payload);
      storage.setItem(STORAGE_KEY.token, response.data.token);
    } catch (error) {
      handleLogout();

      if (axios.isAxiosError(error) && error.response !== undefined) {
        const notAllowKakaoEmail =
          payload.oauthType === "KAKAO" && error.response.status === 400;
        if (notAllowKakaoEmail) {
          alert("이메일 제공에 동의하지 않아 회원가입에 실패했습니다.");
        }
      }

      console.error(error);
    }
  }, []);
  const loginSuccess = useCallback(async () => {
    try {
      const response = await profileAPI.loginSuccess();
      const nextPage = response.data.hasProfile
        ? LINKOCEAN_PATH.myFavorite
        : LINKOCEAN_PATH.signup;
      router.push(nextPage);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    if (!session) {
      return;
    }

    (async () => {
      const oauthType = storage.getItem(STORAGE_KEY.oauthType, "");
      if (oauthType === "") {
        return;
      }

      await login({ email: session?.user?.email as string, oauthType });
      await loginSuccess();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <Meta
        title="LinkOcean"
        titleWithoutSuffix
        description="세계 최고의 북마크 공유 & 관리 서비스 링크오션"
        og={{}}
        robots="index, nofollow"
      />

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
              <GithubLoginButton
                name="github"
                onClick={handleLogin}
                disabled={!!session}
              />
              <KakaoLoginButton
                name="kakao"
                onClick={handleLogin}
                disabled={!!session}
              />
              <ErrorText style={{ color: "gray" }}>
                * 카카오 로그인은 개발 단계로 이메일 제공에
                <br />
                동의해야 회원가입할 수 있습니다.
              </ErrorText>
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
  padding: 68px 62px;
  text-align: center;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  display: flex;
  flex-direction: column;
  margin-bottom: 42px;
`;

const LinkOcean = styled.div`
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
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
