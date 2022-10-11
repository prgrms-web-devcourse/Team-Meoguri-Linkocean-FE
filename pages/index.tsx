import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { Meta } from "@/components/common";
import GoogleLoginButton from "@/components/main/googleLoginButton";
import storage from "@/utils/localStorage";
import { LINKOCEAN_PATH, STORAGE_KEY } from "@/utils/constants";
import * as theme from "@/styles/theme";
import authAPI from "@/utils/apis/auth";

export default function Home() {
  const router = useRouter();

  const loginSuccess = useCallback(async () => {
    try {
      const response = await authAPI.loginSuccess();
      const nextPage = response.data.hasProfile
        ? LINKOCEAN_PATH.myFavorite
        : LINKOCEAN_PATH.signup;
      router.push(nextPage);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      const { code } = router.query;
      if (typeof code !== "string") {
        return;
      }

      try {
        const response = await authAPI.auth(code);
        storage.setItem(STORAGE_KEY.token, response.data.accessToken);
        storage.setItem(STORAGE_KEY.refreshToken, response.data.refreshToken);
        loginSuccess();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [router.query, loginSuccess]);

  useEffect(() => {
    if (storage.getItem(STORAGE_KEY.token, null)) {
      loginSuccess();
    }
  }, [loginSuccess]);

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
            <h1>
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
            </h1>

            <GoogleLoginButton />
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  order: 1;
  width: 380px;
  height: 530px;
  border: 3px solid ${theme.color.$skyBlue};
  border-radius: 8px;
  padding: 68px 62px;
  text-align: center;
  box-sizing: border-box;
`;

const LinkOcean = styled.div`
  margin-bottom: 8px;
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
