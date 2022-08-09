/* eslint-disable react-hooks/exhaustive-deps */
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookmarkTemplate from "@/components/myBookmark/bookmarkTemplate";
import { useProfileState } from "@/hooks/useProfile";
import { BookmarkList, ProfileDetail } from "@/types/model";
import bookmarkAPI from "@/utils/apis/bookmark";
import profileAPI from "@/utils/apis/profile";
import MyBookmark from "@/components/myBookmark/myBookmark";
import { TagType } from "@/types/type";

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
  );
};

export default Tag;
