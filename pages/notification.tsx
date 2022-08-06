import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import Alarm, { AlarmProps } from "@/components/common/alarm";
import styled from "@emotion/styled";
import { useState } from "react";
import { color, text } from "@/styles/theme";
import { Notification } from "@/types/model";

const Notifications = () => {
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
          getCategoryData={getCategory}
          tagList={tagList}
          categoryList={categoryList}
        />
      </PageLayout.Aside>
      <PageLayout.Article>
        <Contents>
          <DivWrapper>
            <PageName>알림</PageName>
            <AlarmWrapper>
              {dummyNotification.map((i) => (
                <>
                  <Alarm data={i} />
                  <Contents style={{ height: "10px" }} />
                </>
              ))}
            </AlarmWrapper>
          </DivWrapper>
        </Contents>
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Notifications;

const Contents = styled.div`
  display: flex;
`;

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const PageName = styled.div`
  color: ${color.$gray800};
  ${text.$headline5};
  margin-bottom: 40px;
`;

const AlarmWrapper = styled.div`
  width: 836px;
`;

const data = {
  profileId: 1,
  imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
  favoriteCategories: ["it"],
  categories: ["it", "technology"],
  username: "joy",
  bio: "안녕하세요! 행복한 조이입니당.",
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

const dummyNotification: Notification[] = [
  {
    type: "SHARE",
    info: {
      bookmark: {
        id: 1,
        title: "네이버",
        link: "https://www.naver.com",
      },
      sender: {
        id: 1,
        username: "haha",
      },
    },
  },
  {
    type: "FEED",
    info: {
      bookmark: {
        id: 2,
        title: "구글",
        link: "https://www.google.com",
      },
      sender: {
        id: 2,
        username: "jacob",
      },
    },
  },
  {
    type: "OLD",
    info: {
      bookmark: {
        id: 3,
        title: "프로그래머스",
        link: "https://school.programmers.co.kr/my-courses/learning",
      },
    },
  },
];
