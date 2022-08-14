/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout, UserInfo, MyFilterMenu, Meta } from "@/components/common";
import BookmarkTemplate from "@/components/myBookmark/bookmarkTemplate";
import { useProfileState } from "@/hooks/useProfile";

const Favorite = () => {
  const profile = useProfileState();
  const router = useRouter();
  const [category, setCategory] = useState<string>();
  const [tags, setTags] = useState<string[]>();

  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tags: tagsString };
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
    <>
      <Meta
        title={`${profile.username}`}
        description="나의 북마크 모음"
        needOg
        robots="noindex, nofollow"
      />
      <PageLayout>
        {AsideMemo}
        <PageLayout.Article>
          <BookmarkTemplate PageTitle="즐겨찾기 목록" />
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Favorite;
