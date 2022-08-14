import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import FollowRadio from "@/components/follow/followRadio";
import {
  Following,
  UserInfo,
  PageLayout,
  Top,
  Meta,
} from "@/components/common";
import { Profile } from "@/types/model";
import profileAPI from "@/utils/apis/profile";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useProfileState, useProfileDispatch } from "@/hooks/useProfile";
import { getQueryString } from "@/utils/queryString";
import { LINKOCEAN_PATH } from "@/utils/constants";

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
  const userProfile = useProfileState();
  const userProfileDispatcher = useProfileDispatch();
  const [state, setState] = useState(INITIAL_FILTERING);
  const [followProfiles, setFollowProfiles] = useState<{
    value: Profile[];
    isLoading: boolean;
  }>({ value: [], isLoading: false });
  const [isEndPage, setIsEndPage] = useState(false);
  const router = useRouter();

  const handleChange = (type: string, value: string | number) => {
    setState({ ...state, [type]: value, page: INITIAL_FILTERING.page });
    setIsEndPage(false);
  };
  const handleFollow = (profileId: number) => {
    const index = followProfiles.value.findIndex(
      (followProfile) => followProfile.profileId === profileId
    );
    const isDeleteFollowAction = followProfiles.value[index].isFollow;
    userProfileDispatcher({
      type: isDeleteFollowAction ? "UN_FOLLOW" : "FOLLOW",
    });

    const isFolloweeTab = state.tab === "followee";
    const copiedValue = [...followProfiles.value];
    if (isFolloweeTab) {
      copiedValue.splice(index, 1);
    } else {
      copiedValue[index].isFollow = !copiedValue[index].isFollow;
    }

    setFollowProfiles({
      ...followProfiles,
      value: copiedValue,
    });
  };

  const getFollowProfiles = useCallback(async () => {
    const { tab, ...query } = state;
    const queryString = getQueryString(query);

    try {
      setFollowProfiles(({ value }) => ({ value, isLoading: true }));

      const {
        data: { profiles: responseProfiles, hasNext },
      } = await profileAPI.getFollow(userProfile.profileId, tab, queryString);

      if (!hasNext) {
        setIsEndPage(true);
      }

      setFollowProfiles(({ value }) => {
        const nextValue =
          query.page === INITIAL_FILTERING.page
            ? responseProfiles
            : [...value, ...responseProfiles];

        return {
          value: nextValue,
          isLoading: false,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }, [state, userProfile.profileId]);

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
      <Meta
        title="나의 특별한 머구리들"
        description="나의 특별한 머구리들 입니다."
        needOg
        robots="noindex, nofollow"
      />

      <PageLayout>
        <PageLayout.Aside>
          <UserInfo />
          <MyFilterMenu
            tagList={userProfile.tags}
            categoryList={userProfile.categories}
            getCategoryData={(category: string) => {
              router.push(`${LINKOCEAN_PATH.myCategory}?category=${category}`);
            }}
            getTagsData={(tags: string[]) => {
              router.push(`${LINKOCEAN_PATH.myCategory}?tags=${tags[0]}`);
            }}
          />
        </PageLayout.Aside>
        <PageLayout.Article>
          <Layout>
            <Form>
              <FollowRadio
                name="follow"
                id="follower"
                text={`팔로워 (${userProfile.followerCount})`}
                checked={state.tab === "follower"}
                onChange={() => {
                  handleChange("tab", "follower");
                }}
              />
              <FollowRadio
                name="follow"
                id="followee"
                text={`팔로잉 (${userProfile.followeeCount})`}
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
                    key={profileId}
                  >
                    <Following
                      profileId={profileId}
                      profileImg={imageUrl}
                      userName={username}
                      following={isFollow}
                      handleClick={handleFollow}
                    />
                  </div>
                )
              )}
            </FollowCardContainer>
            <Top />
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
