import { PageLayout, Meta } from "@/components/common";
import BookmarkTemplate from "@/components/myBookmark/bookmarkTemplate";
import { useProfileState } from "@/hooks/useProfile";

const Favorite = () => {
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
          <BookmarkTemplate type="favorite" />
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Favorite;
