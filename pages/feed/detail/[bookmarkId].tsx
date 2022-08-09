import FeedFilterMenu from "@/components/common/filterMenu/feedFilterMenu";
import PageLayout from "@/components/common/pageLayout";
import DetailPage from "@/components/detail";
import { BookmarkDetail } from "@/types/model";
import bookmarkAPI from "@/utils/apis/bookmark";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyDetail = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string>();
  const getCategory = (element: string) => {
    setCategory(element);
  };
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
        <FeedFilterMenu getCategoryData={getCategory} />
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
