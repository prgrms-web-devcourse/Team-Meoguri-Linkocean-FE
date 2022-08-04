import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import DetailPage from "@/components/detail";
import { getBookMarkDetail, getProfile } from "@/types/dummyData";
import { useState } from "react";

const MyDetail = () => {
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>();
  const getTags = (elements: string[]) => {
    setTags(elements);
  };
  const getCategory = (element: string) => {
    setCategory(element);
  };

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
        <DetailPage data={getBookMarkDetail} isWriter />
      </PageLayout.Article>
    </PageLayout>
  );
};
export default MyDetail;
