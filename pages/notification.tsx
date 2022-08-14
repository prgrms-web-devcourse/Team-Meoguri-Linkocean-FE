import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { color, text } from "@/styles/theme";
import { Notification } from "@/types/model";
import notificationAPI from "@/utils/apis/notification";
import { getQueryString } from "@/utils/queryString";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useProfileState } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import {
  UserInfo,
  MyFilterMenu,
  PageLayout,
  Alarm,
  Top,
  Meta,
} from "@/components/common";

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
  const [state, setState] = useState<Page>(INITIAL_PAGE);
  const [notification, setNotification] = useState<{
    value: Notification[];
    isLoading: boolean;
  }>({ value: [], isLoading: false });
  const [isEndPage, setIsEndPage] = useState(false);
  const userProfile = useProfileState();
  const router = useRouter();

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
    <>
      <Meta
        title="북마크 알림 | LinkOcean"
        description="북마크 알림 | LinkOcean"
        robots="noindex, nofollow"
      />
      <PageLayout>
        <PageLayout.Aside>
          <UserInfo data={userProfile} />
          <MyFilterMenu
            tagList={userProfile.tags}
            categoryList={userProfile.categories}
            getCategoryData={(category) => {
              router.push(`/my/category?category=${category}`);
            }}
            getTagsData={(tags) => {
              router.push(`/my/tag?tags=${tags[0]}`);
            }}
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
                      isLastCard(i, notification.value.length)
                        ? setTarget
                        : null
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
    </>
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
