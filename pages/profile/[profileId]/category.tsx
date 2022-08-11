/* eslint-disable react-hooks/exhaustive-deps */
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import OtherBookmark from "@/components/common/otherBookmark/otherBookmarkTemplate";
import { useProfileState } from "@/hooks/useProfile";
import OtherFilterMenu from "@/components/common/filterMenu/otherFilterMenu";
import profileAPI from "@/utils/apis/profile";
import { ProfileDetail } from "@/types/model";

const Category = () => {
  const profile = useProfileState();
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>();
  const [otherProfileInfo, setOtherProfileInfo] = useState<ProfileDetail>();
  const { profileId } = router.query;

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
    if (profileId !== undefined) {
      getOtherProfileApi(parseInt(profileId[0], 10));
    }
  }, []);

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
