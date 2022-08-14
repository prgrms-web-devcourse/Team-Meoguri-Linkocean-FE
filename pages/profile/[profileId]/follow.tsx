import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  PageLayout,
  UserInfo,
  Following,
  Top,
  Meta,
} from "@/components/common";
import FollowRadio from "@/components/follow/followRadio";
import OtherFilterMenu from "@/components/common/filterMenu/otherFilterMenu";
import {
  FollowCardContainer,
  Form,
  isLastCard,
  Layout,
} from "@/pages/my/follow";
import { Profile, ProfileDetail } from "@/types/model";
import profileAPI from "@/utils/apis/profile";
import { getQueryString } from "@/utils/queryString";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useProfileDispatch, useProfileState } from "@/hooks/useProfile";
import { LINKOCEAN_PATH } from "@/utils/constants";

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

const Follow = () => {
  const router = useRouter();

  const myProfile = useProfileState();
  const myProfileDispatcher = useProfileDispatch();

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
  const handleUserInfo = () => {
    if (!userProfile) {
      return;
    }

    const isDeleteFollowAction = userProfile.isFollow;

    const nextFollowerCount = isDeleteFollowAction
      ? userProfile.followerCount - 1
      : userProfile.followerCount + 1;
    setUserProfile({
      ...userProfile,
      followerCount: nextFollowerCount,
      isFollow: !userProfile.isFollow,
    });

    if (isDeleteFollowAction) {
      myProfileDispatcher({ type: "UN_FOLLOW" });
    } else {
      myProfileDispatcher({ type: "FOLLOW" });
    }

    if (state.tab === "follower") {
      const { profileId, imageUrl, username, isFollow } = myProfile;

      const nextFollowProfilesValue = isDeleteFollowAction
        ? followProfiles.value.filter(
            (profile) => profile.profileId !== profileId
          )
        : [
            ...followProfiles.value,
            { profileId, imageUrl, username, isFollow } as Profile,
          ];
      setFollowProfiles({ ...followProfiles, value: nextFollowProfilesValue });
    }
  };
  const handleFollowing = (profileId: number) => {
    if (!userProfile) {
      return;
    }

    const index = followProfiles.value.findIndex(
      (followProfile) => followProfile.profileId === profileId
    );

    const isDeleteFollowAction = followProfiles.value[index].isFollow;
    myProfileDispatcher({
      type: isDeleteFollowAction ? "UN_FOLLOW" : "FOLLOW",
    });

    const copiedValue = [...followProfiles.value];
    copiedValue[index].isFollow = !copiedValue[index].isFollow;
    setFollowProfiles({
      ...followProfiles,
      value: copiedValue,
    });
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
    if (!userProfile?.profileId) {
      return;
    }

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
  }, [state, userProfile?.profileId]);

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
    if (!router.isReady || myProfile.profileId === 0) {
      return;
    }

    const queryProfileId = parseInt(router.query.profileId as string, 10);
    if (queryProfileId === myProfile.profileId) {
      router.push(LINKOCEAN_PATH.myFollow);
    }

    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, myProfile.profileId]);

  useEffect(() => {
    getFollowProfiles();
  }, [getFollowProfiles]);

  return (
    <>
      <Meta
        title={`${userProfile ? userProfile.username : ""}의 특별한 머구리들`}
        description={`${
          userProfile ? userProfile.username : ""
        }의 특별한 머구리들 입니다.`}
        og={{
          title: "다른 머구리의 특별한 머구리들",
          description: "다른 머구리의 특별한 머구리들 입니다.",
        }}
        robots="noindex, nofollow"
      />

      <PageLayout>
        <PageLayout.Aside>
          {userProfile ? (
            <>
              <UserInfo data={userProfile} handleClick={handleUserInfo} />
              <OtherFilterMenu
                tagList={userProfile.tags}
                categoryList={userProfile.categories}
                getCategoryData={(category) => {
                  router.push(
                    `${LINKOCEAN_PATH.other}/${userProfile.profileId}/category?category=${category}`
                  );
                }}
                getTagsData={(tags) => {
                  router.push(
                    `${LINKOCEAN_PATH.other}/${userProfile.profileId}/tag?tags=${tags[0]}`
                  );
                }}
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
                    key={profileId}
                  >
                    <Following
                      profileId={profileId}
                      profileImg={imageUrl}
                      userName={username}
                      following={isFollow}
                      handleClick={handleFollowing}
                      isMine={profileId === myProfile.profileId}
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

export default Follow;
