/* eslint-disable react-hooks/exhaustive-deps */
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MyBookmark from "@/components/myBookmark/myBookmark";
import { useProfileState } from "@/hooks/useProfile";

const Favorite = () => {
  const profile = useProfileState();
  const router = useRouter();
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>();

  // useEffect(() => {
  //   const tagsString = tags === undefined ? "" : tags.join(",");
  //   const tagParamsObj = { tag: tagsString };
  //   const searchParams = new URLSearchParams(tagParamsObj).toString();
  //   if (tags !== undefined) {
  //     router.push(`tag/?${searchParams}`);
  //   }
  // }, [tags]);

  // useEffect(() => {
  //   const categoryParamsObj = category ? { category } : { category: "" };
  //   const searchParams = new URLSearchParams(categoryParamsObj).toString();
  //   if (category !== undefined) {
  //     router.push(`category/?${searchParams}`);
  //   }
  // }, [category]);

  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tag: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags !== undefined) {
      router.push(`tag/?${searchParams}`);
    }
  }, [tags]);

  useEffect(() => {
    const categoryParamsObj = category ? { category } : { category: "" };
    const searchParams = new URLSearchParams(categoryParamsObj).toString();
    if (category !== undefined) {
      router.push(`category/?${searchParams}`);
    }
  }, [category]);

  const AsideMemo = React.useMemo(
    () => (
      <PageLayout.Aside>
        <UserInfo data={profile} />
        <MyFilterMenu
          categoryList={profile.categories}
          tagList={profile.tags}
          isFavorite
          getCategoryData={setCategory}
          getTagsData={setTags}
        />
      </PageLayout.Aside>
    ),
    [profile]
  );

  return (
    <PageLayout>
      {AsideMemo}
      <PageLayout.Article>
        <MyBookmark PageTitle="즐겨찾기 목록" />
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Favorite;
