import {
  Meta,
  OtherFilterMenu,
  PageLayout,
  UserInfo,
} from "@/components/common";
import DetailPage from "@/components/detail";
import { useProfileDispatch } from "@/hooks/useProfile";
import { BookmarkDetail, ProfileDetail } from "@/types/model";
import bookmarkAPI from "@/utils/apis/bookmark";
import profileAPI from "@/utils/apis/profile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyDetail = () => {
  const router = useRouter();
  const dispatch = useProfileDispatch();
  const [userProfile, setUserProfile] = useState<ProfileDetail>();

  const [bookmarkData, setBookmarkData] = useState<BookmarkDetail>();

  useEffect(() => {
    if (!router.isReady) return;
    const id = Number(router.query.bookmarkId);
    (async () => {
      try {
        const { profileId } = router.query;
        const { data } = await bookmarkAPI.getBookmarkDetail(id);
        const otherData = await profileAPI.getOtherProfile(Number(profileId));
        setBookmarkData(data);
        setUserProfile(otherData.data);
      } catch (e) {
        console.error(e);
        router.push("/404");
      }
    })();
  }, [router.query, router.isReady, router]);

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
      dispatch({ type: "UN_FOLLOW" });
    } else {
      dispatch({ type: "FOLLOW" });
    }
  };

  return (
    <>
      <Meta
        title={`${bookmarkData?.title || ""}`}
        robots="index, follow"
        description={`${
          bookmarkData?.tags?.map((tag) => `#${tag}`).join(" ") || ""
        }/${bookmarkData?.memo || ""}/${bookmarkData?.url || ""}`}
        titleWithoutSuffix
        og={{
          title: "상세페이지 | LinkOcean",
          description: "LinkOcean 상세페이지",
        }}
      />
      <PageLayout>
        <PageLayout.Aside>
          <UserInfo data={userProfile} handleClick={handleUserInfo} />
          <OtherFilterMenu
            tagList={userProfile?.tags}
            categoryList={userProfile?.categories}
            getCategoryData={(category) => {
              router.push(
                `/profile/${Number(
                  userProfile?.profileId
                )}/category?category=${category}`
              );
            }}
            getTagsData={(tags) => {
              router.push(
                `/profile/${Number(userProfile?.profileId)}/tag?tags=${tags[0]}`
              );
            }}
          />
        </PageLayout.Aside>
        <PageLayout.Article>
          {bookmarkData ? (
            <DetailPage
              id={Number(router.query.bookmarkId)}
              data={bookmarkData}
            />
          ) : null}
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};
export default MyDetail;
