/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout, UserInfo, MyFilterMenu } from "@/components/common";
import BookmarkTemplate from "@/components/myBookmark/bookmarkTemplate";
import { useProfileState } from "@/hooks/useProfile";

const Category = () => {
  const profile = useProfileState();
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>();
  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tags: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags.length !== 0) {
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
        <BookmarkTemplate PageTitle="카테고리 목록" />
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Category;
