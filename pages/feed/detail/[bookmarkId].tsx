import FeedFilterMenu from "@/components/common/filterMenu/feedFilterMenu";
import PageLayout from "@/components/common/pageLayout";
import DetailPage from "@/components/detail";
import { getBookMarkDetail } from "@/types/dummyData";
import { useState } from "react";

const MyDetail = () => {
  const [category, setCategory] = useState<string>();
  const getCategory = (element: string) => {
    setCategory(element);
  };

  return (
    <PageLayout>
      <PageLayout.Aside>
        <FeedFilterMenu getCategoryData={getCategory} />
      </PageLayout.Aside>
      <PageLayout.Article>
        <DetailPage data={getBookMarkDetail} isWriter />
      </PageLayout.Article>
    </PageLayout>
  );
};

export default MyDetail;
