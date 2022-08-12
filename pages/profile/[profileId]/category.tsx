/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout, UserInfo, OtherFilterMenu } from "@/components/common";
import OtherBookmark from "@/components/otherBookmark/otherBookmarkTemplate";
import profileAPI from "@/utils/apis/profile";
import { ProfileDetail } from "@/types/model";

const Category = () => {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>();
  const [otherProfileInfo, setOtherProfileInfo] = useState<ProfileDetail>();

  const { profileId } = router.query;

  const getOtherProfileApi = useCallback(async () => {
    const id = parseInt(router.query.profileId as string, 10);
    try {
      const response = await profileAPI.getOtherProfile(id);
      setOtherProfileInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [router.query.profileId]);

  useEffect(() => {
    getOtherProfileApi();
  }, [router.query.profileId]);

  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tags: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags.length !== 0 && profileId) {
      router.push(`/profile/${profileId[0]}/tag/?${searchParams}`);
    }
  }, [tags]);

  useEffect(() => {
    const categoryParamsObj = category ? { category } : { category: "" };
    const searchParams = new URLSearchParams(categoryParamsObj).toString();
    if (category !== undefined && profileId) {
      router.push(`/profile/${profileId[0]}/category/?${searchParams}`);
    }
  }, [category]);

  return (
    <PageLayout>
      <PageLayout.Aside>
        {otherProfileInfo !== undefined ? (
          <>
            <UserInfo data={otherProfileInfo} />
            <OtherFilterMenu
              categoryList={otherProfileInfo.categories}
              tagList={otherProfileInfo.tags}
              getCategoryData={setCategory}
              getTagsData={setTags}
            />
          </>
        ) : null}
      </PageLayout.Aside>
      <PageLayout.Article>
        <OtherBookmark PageTitle="카테고리 목록" />
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Category;
