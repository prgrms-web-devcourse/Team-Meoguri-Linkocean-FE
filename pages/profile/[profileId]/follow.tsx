import PageLayout from "@/components/common/pageLayout";
import styled from "@emotion/styled";
import Head from "next/head";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import { getProfile } from "@/types/dummyData";
import FollowRadio from "@/components/follow/followRadio";
import Following from "@/components/common/following";
import { useRouter } from "next/router";
import {
  FollowCardContainer,
  Form,
  isLastCard,
  Layout,
} from "@/pages/my/follow";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Profile, ProfileDetail } from "@/types/model";
import profileAPI from "@/utils/apis/profile";
import { getQueryString } from "@/utils/queryString";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const PAGE_SIZE = 8;

type Filtering = {
  tab: "follower" | "followee";
  page: number;
  size: number;
};

const INITIAL_FILTERING: Filtering = {
  tab: "follower",
  page: 1,
  size: PAGE_SIZE,
};

// TODO: 자신의 profileID라면 my/follow로 보내기, 유저 정보가 없는 profileID값이 오면 404페이지로 보내기

const Follow = () => {
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<ProfileDetail>();
  const [state, setState] = useState(INITIAL_FILTERING);
  const [followProfiles, setFollowProfiles] = useState<{
    value: Profile[];
    isLoading: boolean;
  }>({ value: [], isLoading: false });
  const [isEndPage, setIsEndPage] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, id } = e.currentTarget;
    setState({ ...state, [name]: id, page: INITIAL_FILTERING.page });
    setIsEndPage(false);
  };

  const getUserProfile = useCallback(async () => {
    const profileId = parseInt(router.query.profileId as string, 10);

    try {
      const response = await profileAPI.getOtherProfile(profileId);
      setUserProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [router.query.profileId]);
  const getFollowProfiles = useCallback(async () => {
    if (!userProfile) {
      return;
    }

    const { profileId } = userProfile;
    const { tab, ...query } = state;
    const queryString = getQueryString(query);

    try {
      setFollowProfiles(({ value }) => ({ value, isLoading: true }));

      const {
        data: { profiles },
      } = await profileAPI.getFollow(profileId, tab, queryString);

      if (profiles.length === 0 || profiles.length < query.size) {
        setIsEndPage(true);
      }

      setFollowProfiles(({ value }) => {
        const nextValue =
          query.page === INITIAL_FILTERING.page
            ? profiles
            : [...value, ...profiles];

        return {
          value: nextValue,
          isLoading: false,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }, [state, userProfile]);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isEndPage) {
      setTarget(undefined);
      return;
    }

    if (isIntersecting && !followProfiles.isLoading) {
      setState({ ...state, page: state.page + 1 });
    }
  };
  const { setTarget } = useIntersectionObserver({
    onIntersect,
    threshold: 0.8,
  });

  useEffect(() => {
    if (router.query.profileId === undefined) {
      return;
    }

    getUserProfile();
  }, [router.query.profileId, getUserProfile]);

  useEffect(() => {
    getFollowProfiles();
  }, [getFollowProfiles]);

  return (
    <>
      <Head>
        <title>
          {state.tab === "follower"
            ? "LinkOcean | 팔로워"
            : "LinkOcean | 팔로잉"}
        </title>
      </Head>

      <PageLayout>
        <PageLayout.Aside>
          {userProfile ? (
            <>
              <UserInfo data={userProfile} />
              <MyFilterMenu
                tagList={userProfile.tags}
                categoryList={userProfile.categories}
                getCategoryData={() => {}}
                getTagsData={() => {}}
              />
            </>
          ) : (
            "로딩 중..."
          )}
        </PageLayout.Aside>
        <PageLayout.Article>
          <Layout>
            <Form>
              <FollowRadio
                name="tab"
                id="follower"
                text={`팔로워 (${
                  userProfile ? userProfile.followerCount : " "
                })`}
                checked={state.tab === "follower"}
                onChange={handleChange}
              />
              <FollowRadio
                name="tab"
                id="followee"
                text={`팔로잉 (${
                  userProfile ? userProfile.followeeCount : " "
                })`}
                checked={state.tab === "followee"}
                onChange={handleChange}
              />
            </Form>
            <FollowCardContainer>
              {followProfiles.value.map(
                ({ profileId, imageUrl, isFollow, username }, index) => (
                  <div
                    ref={
                      isLastCard(index, followProfiles.value.length)
                        ? setTarget
                        : null
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
            </FollowCardContainer>
          </Layout>
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Follow;
