import { MyFilterMenu, PageLayout, UserInfo } from "@/components/common";
import DetailPage from "@/components/detail";
import { useProfileState } from "@/hooks/useProfile";
import { BookmarkDetail } from "@/types/model";
import bookmarkAPI from "@/utils/apis/bookmark";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyDetail = () => {
  const router = useRouter();
  const userProfile = useProfileState();
  const [bookmarkData, setBookmarkData] = useState<BookmarkDetail>();

  useEffect(() => {
    if (!router.isReady) return;
    const id = Number(router.query.bookmarkId);
    (async () => {
      try {
        const { data } = await bookmarkAPI.getBookmarkDetail(id);
        setBookmarkData(data);
      } catch (error) {
        console.error(error);
        router.push("/404");
      }
    })();
  }, [router.query, router.isReady, router]);

  return (
    <PageLayout>
      <PageLayout.Aside>
        <UserInfo />
        <MyFilterMenu
          tagList={userProfile.tags}
          categoryList={userProfile.favoriteCategories}
          getCategoryData={(category) => {
            router.push(`/my/category?category=${category}`);
          }}
          getTagsData={(tags) => {
            router.push(`/my/tag?tags=${tags[0]}`);
          }}
        />
      </PageLayout.Aside>
      <PageLayout.Article>
        {bookmarkData ? (
          <DetailPage
            id={Number(router.query.bookmarkId)}
            data={bookmarkData}
          />
        ) : null}
      </PageLayout.Article>
    </PageLayout>
  );
};
export default MyDetail;
