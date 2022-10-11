import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
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
import { FollowTabType } from "@/types/type";
import FollowTabList from "../../components/follow/followTabList";

const PAGE_SIZE = 8;
export const isLastCard = (index: number, length: number) =>
  index === Math.max(0, length - 1);

type Filtering = {
  tab: FollowTabType;
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

  const handleChange = (tab: FollowTabType) => {
    setState({ ...state, tab, page: INITIAL_FILTERING.page });
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
        og={{}}
        robots="noindex, nofollow"
      />

      <PageLayout>
        <PageLayout.Article>
          <Layout>
            <UserInfo />

            <FollowTabList profile={userProfile} onClick={handleChange} />

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
  margin: auto;
  max-width: 1130px;
`;

export const FollowCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 20px 15px;
  @media (max-width: 1209px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Follow;
