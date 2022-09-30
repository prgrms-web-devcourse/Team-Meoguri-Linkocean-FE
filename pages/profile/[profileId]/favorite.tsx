/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  PageLayout,
  UserInfo,
  OtherFilterMenu,
  Meta,
} from "@/components/common";
import OtherBookmark from "@/components/otherBookmark/otherBookmarkTemplate";
import profileAPI from "@/utils/apis/profile";
import { ProfileDetail } from "@/types/model";

const Favorite = () => {
  const router = useRouter();
  const { profileId } = router.query;
  const [category, setCategory] = useState<string>();
  const [tags, setTags] = useState<string[]>();
  const [otherProfileInfo, setOtherProfileInfo] = useState<ProfileDetail>();

  const getOtherProfileApi = (id: number) => {
    (async () => {
      try {
        const res = await profileAPI.getOtherProfile(id);
        setOtherProfileInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  useEffect(() => {
    if (typeof profileId === "string") {
      getOtherProfileApi(parseInt(profileId, 10));
    }
  }, [profileId]);

  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tags: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags !== undefined && typeof profileId === "string") {
      router.push(`/profile/${profileId}/tag/?${searchParams}`);
    }
  }, [tags]);

  useEffect(() => {
    const categoryParamsObj = category ? { category } : { category: "" };
    const searchParams = new URLSearchParams(categoryParamsObj).toString();
    if (category !== undefined && typeof profileId === "string") {
      router.push(`/profile/${profileId}/category/?${searchParams}`);
    }
  }, [category]);

  return (
    <>
      <Meta
        title={`${otherProfileInfo ? otherProfileInfo.username : ""}`}
        description={`${
          otherProfileInfo ? otherProfileInfo.username : ""
        }의 북마크 모음`}
        og={{
          title: "다른 머구리의 북마크 | LinkOcean",
          description: "다른 머구리의 북마크 모음",
        }}
        robots="index, follow"
      />
      <PageLayout>
        <PageLayout.Article>
          {otherProfileInfo && (
            <OtherBookmark type="favorite" otherProfile={otherProfileInfo} />
          )}
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Favorite;
