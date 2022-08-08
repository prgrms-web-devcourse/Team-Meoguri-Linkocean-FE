import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import DetailPage from "@/components/detail";
import { getBookMarkDetail, getProfile } from "@/types/dummyData";
import bookmarkAPI from "@/utils/apis/bookmark";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyDetail = () => {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>();
  const getTags = (elements: string[]) => {
    setTags(elements);
  };
  const [bookmarkData, setBookmarkData] = useState(getBookMarkDetail);

  const getCategory = (element: string) => {
    setCategory(element);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const id = Number(router.query.bookmarkId);
    (async () => {
      try {
        const { data } = await bookmarkAPI.getBookmarkDetail(id);
        setBookmarkData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router.query, router.isReady]);

  return (
    <PageLayout>
      <PageLayout.Aside>
        <UserInfo data={getProfile} />
        <MyFilterMenu
          tagList={getProfile.tags}
          categoryList={getProfile.favoriteCategories}
          getTagsData={getTags}
          getCategoryData={getCategory}
        />
      </PageLayout.Aside>
      <PageLayout.Article>
        {bookmarkData ? (
          <DetailPage
            id={Number(router.query.bookmarkId)}
            data={bookmarkData}
          />
        ) : (
          <p>삭제된 북마크 페이지 입니다.</p>
        )}
      </PageLayout.Article>
    </PageLayout>
  );
};
export default MyDetail;
