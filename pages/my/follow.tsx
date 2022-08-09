import PageLayout from "@/components/common/pageLayout";
import styled from "@emotion/styled";
import Head from "next/head";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import { getProfile } from "@/types/dummyData";
import FollowRadio from "@/components/follow/followRadio";
import Following from "@/components/common/following";
import { useCallback, useEffect, useState } from "react";
import { Profile } from "@/types/model";
import profileAPI from "@/utils/apis/profile";
import { useRouter } from "next/router";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { getQueryString } from "@/utils/queryString";

// TODO: 팔로우 하기, 언팔로우 하기, 전역 유저 정보, 라우팅
const PAGE_SIZE = 8;
export const isLastCard = (index: number, length: number) =>
  index === Math.max(0, length - 1);

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

const Follow = () => {
  const [tempUser, setTempUser] = useState(DUMMY_USER.HYONI); // 유저 context로 대체될 코드

  const [state, setState] = useState(INITIAL_FILTERING);
  const [followProfiles, setFollowProfiles] = useState<{
    value: Profile[];
    isLoading: boolean;
  }>({ value: [], isLoading: false });
  const [isEndPage, setIsEndPage] = useState(false);

  const handleChange = (type: string, value: string | number) => {
    setState({ ...state, [type]: value, page: INITIAL_FILTERING.page });
    setIsEndPage(false);
  };

  const getFollowProfiles = useCallback(async () => {
    const { profileId } = tempUser;
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
  }, [state, tempUser]);

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
          <UserInfo data={{ ...tempUser, imageUrl: "", bio: "" }} />
          <MyFilterMenu
            tagList={getProfile.tags}
            categoryList={getProfile.categories}
            getCategoryData={() => {}}
            getTagsData={() => {}}
          />
        </PageLayout.Aside>
        <PageLayout.Article>
          <Layout>
            <Form>
              <FollowRadio
                name="follow"
                id="follower"
                text={`팔로워 (${tempUser.followerCount})`}
                checked={state.tab === "follower"}
                onChange={() => {
                  handleChange("tab", "follower");
                }}
              />
              <FollowRadio
                name="follow"
                id="followee"
                text={`팔로잉 (${tempUser.followeeCount})`}
                checked={state.tab === "followee"}
                onChange={() => {
                  handleChange("tab", "followee");
                }}
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

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 835px;
  margin: 0 auto;
`;

export const Form = styled.form`
  margin-bottom: 37px;
  text-align: center;
`;

export const FollowCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 31px;
  width: 835px;
`;

export default Follow;

const DUMMY_USER = {
  HYONI: {
    profileId: 3,
    imageUrl: null,
    favoriteCategories: ["여행"],
    username: "효니",
    bio: null,
    followerCount: 4,
    followeeCount: 0,
    tags: [],
    categories: [],
  },
  MEOGURI: {
    profileId: 5,
    imageUrl: null,
    favoriteCategories: ["IT"],
    username: "머구리",
    bio: null,
    followerCount: 0,
    followeeCount: 1,
    tags: [],
    categories: [],
  },
};

export const { isFollow, ...DUMMY_USER_INFO } = getProfile;

export const DUMMY_FOLLOWE = {
  profiles: [
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },

    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },

    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
  ],
};
