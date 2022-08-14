import { FeedFilterMenu, Meta, PageLayout } from "@/components/common";
import DetailPage from "@/components/detail";
import { BookmarkDetail } from "@/types/model";
import bookmarkAPI from "@/utils/apis/bookmark";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyDetail = () => {
  const router = useRouter();
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
    <>
      <Meta
        title={`${bookmarkData?.title || ""}`}
        robots="index, follow"
        description={`${
          bookmarkData?.tags?.map((tag) => `#${tag}`).join(" ") || ""
        }/${bookmarkData?.memo || ""}/${bookmarkData?.url || ""}`}
        titleWithoutSuffix
        og={{
          title: "상세페이지 | LinkOcean",
          description: "LinkOcean 상세페이지",
        }}
      />
      <PageLayout>
        <PageLayout.Aside>
          <FeedFilterMenu
            getCategoryData={(category) => {
              router.push(`/feed?category=${category}`);
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
    </>
  );
};

export default MyDetail;
