import FeedFilterMenu from "@/components/common/filterMenu/feedFilterMenu";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import styled from "@emotion/styled";
import { useState } from "react";

export default {
  title: "components/PageLayout",
  component: PageLayout,
  argTypes: {},
};

export const Feed = () => {
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
        <UserInfo data={data} />
        <FeedFilterMenu getCategoryData={getCategory} />
      </PageLayout.Aside>
      <PageLayout.Article>
        <Contents>내용</Contents>
      </PageLayout.Article>
    </PageLayout>
  );
};
export const Default = () => {
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
        <UserInfo data={data} />
        <MyFilterMenu
          getTagsData={getTags}
          getCatagoryData={getCategory}
          tagList={tagList}
          categoryList={categoryList}
        />
      </PageLayout.Aside>
      <PageLayout.Article>
        <Contents>
          내용 djsklf;ajdkfljadsklfjkadfkjfkajds
          klfkljdafjadfkl;ajsdklfjasdjfklajsfkljlaksfjkajlvsfadsklf;sadjsklf;jadsklfjkds
          dsfamdsjfkl;ajdfskl djfkld;jdkslf dsklf dsk fdkls fdj;fjadsk fkadlfj
          alsfjf;kds;lfkdfj kdsfjl
        </Contents>
      </PageLayout.Article>
    </PageLayout>
  );
};

const Contents = styled.div`
  border: 1px solid black;
`;

const data = {
  profileId: 1,
  imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
  categories: ["it", "technology"],
  username: "joy",
  bio: "안녕하세요! 행복한 조이입니당. sadfjklajfkaj;ds",
  followerCount: 12,
  followeeCount: 10,
};

const tagList = [
  {
    name: "JAVA",
    count: 5,
  },
  {
    name: "JAVASCRIPT",
    count: 5,
  },
  {
    name: "PYTHON",
    count: 5,
  },
  {
    name: "C++",
    count: 5,
  },
  {
    name: "C",
    count: 5,
  },
  {
    name: "C#",
    count: 5,
  },
  {
    name: "RUBY",
    count: 5,
  },
  {
    name: "GOLANG",
    count: 5,
  },
];

const categoryList = [
  "self_development",
  "humanities",
  "politics",
  "social",
  "art",
  "science",
  "technology",
  "it",
  "home",
  "health",
  "travel",
  "cooking",
];
