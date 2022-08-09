import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import Following from "@/components/common/following";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import { getProfile } from "@/types/dummyData";
import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import * as theme from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { FormEvent, useState, useEffect, useCallback } from "react";
import profileAPI from "@/utils/apis/profile";
import { Profile } from "@/types/model";
import { getQueryString } from "@/utils/queryString";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import {
  DUMMY_USER_INFO,
  FollowCardContainer,
  isLastCard,
  Layout,
} from "./my/follow";

// TODO: 본인 제외하기, 무한 스크롤, 유저 컨텍스트 연결

const PAGE_SIZE = 8;

type Filtering = {
  username: string;
  page: number;
  size: number;
};

const INITIAL_FILTERING: Filtering = {
  username: "",
  page: 1,
  size: PAGE_SIZE,
};

const Meoguri = () => {
  const router = useRouter();

  const [state, setState] = useState(INITIAL_FILTERING);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEndPage, setIsEndPage] = useState(false);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isEndPage) {
      setTarget(undefined);
      return;
    }

    if (isIntersecting && !isLoading) {
      setState({ ...state, page: state.page + 1 });
    }
  };
  const { setTarget } = useIntersectionObserver({
    onIntersect,
    threshold: 0.8,
  });

  const getProfiles = useCallback(async () => {
    if (state.username === "") {
      return;
    }
    setIsLoading(true);

    const queryString = getQueryString(state);

    try {
      const response = await profileAPI.getProfilesByUsername(queryString);
      const responseProfiles = response.data.profiles;

      if (
        responseProfiles.length === 0 ||
        responseProfiles.length < state.size
      ) {
        setIsEndPage(true);
      }

      setProfiles((prevProfiles) =>
        state.page === 1
          ? responseProfiles
          : [...prevProfiles, ...responseProfiles]
      );
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }, [state]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedUsername = usernameInputValue.trim();
    const isEmptyString = trimmedUsername === "";
    if (isEmptyString) {
      return;
    }

    setIsEndPage(false);
    setUsernameInputValue(trimmedUsername);
    setState({ ...INITIAL_FILTERING, username: trimmedUsername });
    router.push(`/meoguri?name=${trimmedUsername}`);
  };

  useEffect(() => {
    if (!router.isReady || router.query.name === undefined) {
      return;
    }

    const queryName = router.query.name as string;
    setUsernameInputValue(queryName);
    setState({ ...INITIAL_FILTERING, username: queryName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      <Head>
        <title>LinkOcean | 머구리 찾기</title>
      </Head>

      <PageLayout>
        <PageLayout.Aside>
          <UserInfo data={DUMMY_USER_INFO} />
          <MyFilterMenu
            tagList={getProfile.tags}
            categoryList={getProfile.categories}
            getCategoryData={() => {}}
            getTagsData={() => {}}
          />
        </PageLayout.Aside>
        <PageLayout.Article>
          <Layout>
            <Title>머구리 찾기</Title>

            <Form onSubmit={handleSubmit}>
              <Input
                searchIcon
                name="name"
                width="400px"
                value={usernameInputValue}
                onChange={(e) => setUsernameInputValue(e.target.value)}
              />
              <Button
                colorType="main-color"
                buttonType="small"
                type="submit"
                width="67"
              >
                검색
              </Button>
            </Form>

            <MeoguriCardContainer>
              {!isLoading &&
              router.query.name !== undefined &&
              profiles.length === 0
                ? "검색 결과가 없습니다."
                : profiles.map(
                    ({ profileId, imageUrl, isFollow, username }, index) => (
                      <div
                        ref={
                          isLastCard(index, profiles.length) ? setTarget : null
                        }
                      >
                        <Following
                          profileId={profileId}
                          profileImg={imageUrl}
                          userName={username}
                          following={isFollow}
                          key={profileId}
                        />
                      </div>
                    )
                  )}
            </MeoguriCardContainer>
            {isLoading ? "로딩 중..." : null}
          </Layout>
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

const Title = styled.h2`
  margin: 10px 0 29px 4px;
  color: ${theme.color.$gray800};
  ${theme.text.$headline5};
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 37px;
`;

const MeoguriCardContainer = styled(FollowCardContainer)``;

export default Meoguri;
