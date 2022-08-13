import Head from "next/head";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { FormEvent, useState, useEffect, useCallback } from "react";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import {
  Following,
  PageLayout,
  UserInfo,
  Input,
  Button,
  NoResult,
  Top,
} from "@/components/common";
import { Profile } from "@/types/model";
import profileAPI from "@/utils/apis/profile";
import { useProfileDispatch, useProfileState } from "@/hooks/useProfile";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { getQueryString } from "@/utils/queryString";
import * as theme from "@/styles/theme";
import { LINKOCEAN_PATH } from "@/utils/constants";
import { FollowCardContainer, isLastCard, Layout } from "./my/follow";

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

  const userProfile = useProfileState();
  const userProfileDispatcher = useProfileDispatch();

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
      const {
        data: { profiles: responseProfiles, hasNext },
      } = await profileAPI.getProfilesByUsername(queryString);

      if (!hasNext) {
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
    router.push(`${LINKOCEAN_PATH.meoguri}?name=${trimmedUsername}`);
  };
  const handleFollow = (profileId: number) => {
    const index = profiles.findIndex(
      (profile) => profile.profileId === profileId
    );
    const isDeleteFollowAction = profiles[index].isFollow;

    userProfileDispatcher({
      type: isDeleteFollowAction ? "UN_FOLLOW" : "FOLLOW",
    });

    const copiedValue = [...profiles];
    copiedValue[index].isFollow = !copiedValue[index].isFollow;
    setProfiles(copiedValue);
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
    if (Object.keys(router.query).length === 0) {
      setUsernameInputValue("");
      setState(INITIAL_FILTERING);
      setProfiles([]);
    }
  }, [router.query]);

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
          <UserInfo />
          <MyFilterMenu
            tagList={userProfile.tags}
            categoryList={userProfile.categories}
            getCategoryData={(category) => {
              router.push(`${LINKOCEAN_PATH.myCategory}?category=${category}`);
            }}
            getTagsData={(tags) => {
              router.push(`${LINKOCEAN_PATH.myTag}?tags=${tags[0]}`);
            }}
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
              profiles.length === 0 ? (
                <NoResult />
              ) : (
                profiles.map(
                  ({ profileId, imageUrl, isFollow, username }, index) => (
                    <div
                      ref={
                        isLastCard(index, profiles.length) ? setTarget : null
                      }
                      key={profileId}
                    >
                      <Following
                        profileId={profileId}
                        profileImg={imageUrl}
                        userName={username}
                        following={isFollow}
                        handleClick={handleFollow}
                        isMine={profileId === userProfile.profileId}
                      />
                    </div>
                  )
                )
              )}
            </MeoguriCardContainer>
            <Top />
          </Layout>
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

const Title = styled.h2`
  margin: 10px 0 29px 4px;
  color: ${theme.color.$gray800};
  ${theme.text.$headline5}
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 37px;
`;

const MeoguriCardContainer = styled(FollowCardContainer)``;

export default Meoguri;
