import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import Alarm from "@/components/common/alarm";
import Top from "@/components/common/top";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { color, text } from "@/styles/theme";
import { Notification } from "@/types/model";
import notificationAPI from "@/utils/apis/notification";
import { getQueryString } from "@/utils/queryString";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import bookmarkCardStories from "stories/components/bookmarkCard.stories";

const PAGE_SIZE = 8;
const isLastCard = (index: number, length: number) =>
  index === Math.max(0, length - 1);

type Page = {
  page: number;
  size: number;
};

const INITIAL_PAGE: Page = {
  page: 1,
  size: PAGE_SIZE,
};

const Notifications = () => {
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>();
  const [state, setState] = useState<Page>(INITIAL_PAGE);
  const [notification, setNotification] = useState<{
    value: Notification[];
    isLoading: boolean;
  }>({ value: [], isLoading: false });
  const [isEndPage, setIsEndPage] = useState(false);

  const getTags = (elements: string[]) => {
    setTags(elements);
  };
  const getCategory = (element: string) => {
    setCategory(element);
  };

  const getNotification = useCallback(async () => {
    const { ...query } = state;
    const queryString = getQueryString(state);

    try {
      setNotification(({ value }) => ({ value, isLoading: true }));

      const {
        data: { notifications },
      } = await notificationAPI.getNotifications(queryString);

      if (notifications.length === 0 || notifications.length < query.size) {
        setIsEndPage(true);
      }

      setNotification(({ value }) => {
        const nextValue =
          query.page === INITIAL_PAGE.page
            ? notifications
            : [...value, ...notifications];

        return {
          value: nextValue,
          isLoading: false,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }, [state]);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isEndPage) {
      setTarget(undefined);
      return;
    }

    if (isIntersecting && !notification.isLoading) {
      setState({ ...state, page: state.page + 1 });
    }
  };
  const { setTarget } = useIntersectionObserver({
    onIntersect,
    threshold: 0.7,
  });

  useEffect(() => {
    getNotification();
  }, [getNotification]);

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
              {notification.value.map((index, i) => (
                <div
                  ref={
                    isLastCard(i, notification.value.length) ? setTarget : null
                  }
                  key={notification.value[i].info.bookmark.id}
                >
                  <Alarm data={index} />
                  <Contents style={{ height: "10px" }} />
                </div>
              ))}
            </AlarmWrapper>
          </DivWrapper>
          <Top />
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
