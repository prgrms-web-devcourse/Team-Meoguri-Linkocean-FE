import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { color, text } from "@/styles/theme";
import { Notification } from "@/types/model";
import notificationAPI from "@/utils/apis/notification";
import { getQueryString } from "@/utils/queryString";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { PageLayout, Alarm, Top, Meta } from "@/components/common";

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
        title="북마크 알림"
        description="북마크 알림"
        robots="noindex, nofollow"
      />
      <PageLayout>
        <PageLayout.Article>
          <Contents>
            <PageName>알림</PageName>

            {notification.value.map((index, i) => (
              <AlarmWrapper
                ref={
                  isLastCard(i, notification.value.length) ? setTarget : null
                }
                key={notification.value[i].info.bookmark.id}
              >
                <Alarm data={index} />
              </AlarmWrapper>
            ))}

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
  flex-direction: column;
  width: 1140px;
  margin: auto;
`;

const PageName = styled.div`
  color: ${color.$gray800};
  ${text.$headline5}
  margin-bottom: 40px;
`;

const AlarmWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
