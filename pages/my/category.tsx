import React from "react";
import { PageLayout, Meta } from "@/components/common";
import BookmarkTemplate from "@/components/myBookmark/bookmarkTemplate";
import { useProfileState } from "@/hooks/useProfile";

const Category = () => {
  const profile = useProfileState();

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
          <BookmarkTemplate type="category" categories={profile.categories} />
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Category;
