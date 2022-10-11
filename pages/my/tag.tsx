/* eslint-disable react-hooks/exhaustive-deps */
import { PageLayout, Meta } from "@/components/common";
import BookmarkTemplate from "@/components/myBookmark/bookmarkTemplate";
import { useProfileState } from "@/hooks/useProfile";

const Tag = () => {
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
          <BookmarkTemplate type="tag" tags={profile.tags} />
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Tag;
