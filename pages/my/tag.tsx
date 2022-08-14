/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout, UserInfo, MyFilterMenu, Meta } from "@/components/common";
import BookmarkTemplate from "@/components/myBookmark/bookmarkTemplate";
import { useProfileState } from "@/hooks/useProfile";

const Tag = () => {
  const profile = useProfileState();
  const router = useRouter();
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tags: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj);
    if (tags !== undefined) {
      router.push(`?${searchParams.toString()}`);
    }
  }, [tags]);

  useEffect(() => {
    const categoryParamsObj = { category };
    const searchParams = new URLSearchParams(categoryParamsObj).toString();
    if (category.length !== 0) {
      router.push(`category/?${searchParams}`);
    }
  }, [category]);

  return (
    <>
      <Meta
        title={`${profile.username}`}
        description="나의 북마크 모음"
        needOg
        robots="noindex, nofollow"
      />
      <PageLayout>
        <PageLayout.Aside>
          <UserInfo data={profile} />
          <MyFilterMenu
            categoryList={profile.categories}
            tagList={profile.tags}
            getCategoryData={setCategory}
            getTagsData={setTags}
          />
        </PageLayout.Aside>
        <PageLayout.Article>
          <BookmarkTemplate PageTitle="태그 목록" />
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Tag;
