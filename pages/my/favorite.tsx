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

  return (
    <>
      <Meta
        title={`${profile.username}`}
        description="나의 북마크 모음"
        og={{ title: "나의 북마크 | LinkOcean" }}
        robots="noindex, nofollow"
      />
      <PageLayout>
        <PageLayout.Article>
          <BookmarkTemplate type="favorite" />
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Favorite;
