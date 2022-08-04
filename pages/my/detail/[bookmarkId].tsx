import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
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
        <UserInfo data={userData} />
        <MyFilterMenu
          tagList={userData.tags}
          categoryList={userData.favoriteCategories}
          getTagsData={getTags}
          getCategoryData={getCategory}
        />
      </PageLayout.Aside>
      <PageLayout.Article>ab</PageLayout.Article>
    </PageLayout>
  );
};

const userData = {
  profileId: 1,
  // imageUrl: "image_url",
  favoriteCategories: ["인문", "정치", "사회"],
  username: "user",
  bio: "hi i'm user",
  followerCount: 3,
  followeeCount: 2,
  tags: [
    {
      name: "JAVA",
      count: 5,
    },
    {
      name: "node",
      count: 5,
    },
    {
      name: "React",
      count: 5,
    },
    {
      name: "study",
      count: 5,
    },
    {
      name: "JAVASCRIPT",
      count: 5,
    },
  ],
  categories: ["인문", "정치", "사회"],
};

export default MyDetail;
