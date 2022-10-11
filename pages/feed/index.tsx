import { useRouter } from "next/router";
import { FormEvent, useState, useEffect, useCallback, useRef } from "react";
import styled from "@emotion/styled";
import {
  Input,
  PageLayout,
  Select,
  Pagination,
  BookmarkCard,
  NoResult,
  Meta,
  CardWrap,
} from "@/components/common";
import { BookmarkList } from "@/types/model";
import { CATEGORY, CategoryQueryType, SortType } from "@/types/type";
import { useProfileState } from "@/hooks/useProfile";
import bookmarkAPI from "@/utils/apis/bookmark";
import { getQueryString } from "@/utils/queryString";
import { LINKOCEAN_PATH, PAGE_SIZE } from "@/utils/constants";

import {
  FilterDiv,
  PaginationDiv,
  SubFilterDiv,
  Title,
  Wrapper,
} from "@/components/myBookmark/bookmarkTemplate";

const INITIAL_FILTERING: CategoryQueryType = {
  category: "전체",
  searchTitle: "",
  order: "upload",
  page: 1,
  size: PAGE_SIZE,
};

const Feed = () => {
  const router = useRouter();

  const { profileId } = useProfileState();
  const [state, setState] = useState<CategoryQueryType>(INITIAL_FILTERING);
  const [feedBookmarks, setFeedBookmarks] = useState<BookmarkList>({
    totalCount: 0,
    bookmarks: [],
  });
  const [searchTitleInputValue, setSearchTitleInputValue] = useState("");
  const [isRouterReady, setIsRouterReady] = useState(false);

  const searchTitleRef = useRef<HTMLInputElement>(null);

  const getFeedBookmarks = useCallback(async () => {
    if (!isRouterReady) {
      return;
    }
    setSearchTitleInputValue(state.searchTitle);

    const query: Partial<CategoryQueryType> = { ...state };
    if (query.category === "전체") {
      delete query.category;
    }
    if (query.searchTitle === "") {
      delete query.searchTitle;
    }
    const queryString = getQueryString(query);
    const response = await bookmarkAPI.getFeedBookmarks(queryString);
    setFeedBookmarks(response.data);
  }, [state, isRouterReady]);

  const changeRoutePath = useCallback(
    (nextState: CategoryQueryType) => {
      const { size, searchTitle, ...query } = nextState;

      router.push({
        pathname: LINKOCEAN_PATH.feed,
        query: searchTitle === "" ? { ...query } : { ...query, searchTitle },
      });
    },
    [router]
  );

  const handleChanges = (
    value: string | number | string[],
    name: keyof CategoryQueryType
  ) => {
    if (state[name] === value) {
      return;
    }

    const nextState = { ...state, page: 1, [name]: value };
    setState(nextState);
    changeRoutePath(nextState);
  };

  const handleChangeSearchTitle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const $searchTitle = searchTitleRef.current as HTMLInputElement;
    const searchTitle = $searchTitle.value;
    const trimmedSearchTitle = searchTitle.trim();
    if (trimmedSearchTitle === "") {
      searchTitleRef?.current?.focus();
      return;
    }

    searchTitleRef?.current?.blur();

    handleChanges(trimmedSearchTitle, "searchTitle");
  };

  const handleBookmarkDelete = (id: number) => {
    const { totalCount, bookmarks } = feedBookmarks;
    const nextBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    const nextBookmarksLength = nextBookmarks.length;

    if (nextBookmarksLength !== 0) {
      setFeedBookmarks({
        totalCount,
        bookmarks: nextBookmarks,
      });
    } else {
      const needPrevPage =
        state.page === Math.ceil(feedBookmarks.totalCount / state.size) &&
        state.page !== 1;
      const nextPage = needPrevPage ? state.page - 1 : state.page;
      setState({ ...state, page: nextPage });
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { query } = router;
    const queryKeys = Object.keys(query);
    if (queryKeys.length === 0) {
      setIsRouterReady(true);
      return;
    }

    const searchTitle = query.searchTitle as string;
    const page = parseInt(query.page as string, 10);
    setIsRouterReady(true);

    setState({
      ...INITIAL_FILTERING,
      ...query,
      page,
    });
    setSearchTitleInputValue(searchTitle);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setSearchTitleInputValue("");
      setState(INITIAL_FILTERING);
    }
  }, [router.query]);

  useEffect(() => {
    getFeedBookmarks();
  }, [getFeedBookmarks]);

  return (
    <>
      <Meta
        title={`${
          state.searchTitle !== "" ? `${state.searchTitle} -` : ""
        } 전체 피드 검색`.trim()}
        description={`${
          state.searchTitle !== "" ? `${state.searchTitle} -` : ""
        } LinkOcean 전체 피드 검색 결과입니다.`.trim()}
        og={{
          title: "전체 피드 검색 | LinkOcean",
          description: "LinkOcean 전체 피드 검색 결과입니다.",
        }}
        robots="index, follow"
      />

      <PageLayout>
        <PageLayout.Article>
          <Wrapper>
            <Title>피드 페이지</Title>
            <FeedFilterDiv>
              <Select
                version2
                selectedOption={{
                  value: state.category,
                  text: state.category,
                }}
                onChange={(category) => handleChanges(category, "category")}
              >
                <Select.Trigger>선택</Select.Trigger>
                <Select.OptionList>
                  {["전체", ...CATEGORY].map((category) => (
                    <Select.Option value={category} key={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select.OptionList>
              </Select>

              <form action="submit" onSubmit={handleChangeSearchTitle}>
                <Input
                  searchIcon
                  name="searchTitle"
                  ref={searchTitleRef}
                  endIcon
                  style={{ border: 0 }}
                  value={searchTitleInputValue}
                  onChange={(e) => setSearchTitleInputValue(e.target.value)}
                  autoFocus
                />
              </form>
            </FeedFilterDiv>

            {state.searchTitle !== "" && feedBookmarks.totalCount === 0 ? (
              <NoResult />
            ) : (
              <>
                <SubFilterDiv>
                  <h2>전체 {feedBookmarks?.totalCount.toLocaleString()}개</h2>
                  <Select
                    onChange={(order) => handleChanges(order, "order")}
                    selectedOption={{
                      value: state.order,
                      text: SortType[state.order],
                    }}
                    version2
                  >
                    <Select.Trigger>선택</Select.Trigger>
                    <Select.OptionList>
                      <Select.Option value="upload">최신 순</Select.Option>
                      <Select.Option value="like">좋아요 순</Select.Option>
                    </Select.OptionList>
                  </Select>
                </SubFilterDiv>

                <CardWrap>
                  {feedBookmarks.bookmarks.map((bookmark) => (
                    <BookmarkCard
                      key={bookmark.id}
                      data={bookmark}
                      deleteBookmark={handleBookmarkDelete}
                      isMine={profileId === bookmark.profile?.profileId}
                    />
                  ))}
                </CardWrap>
              </>
            )}

            <PaginationDiv>
              <Pagination
                count={Math.ceil(feedBookmarks.totalCount / state.size)}
                onChange={(pageNum) => handleChanges(pageNum, "page")}
                defaultPage={state.page}
              />
            </PaginationDiv>
          </Wrapper>
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

const FeedFilterDiv = styled(FilterDiv)`
  display: flex;
  gap: 14px;
`;

export default Feed;
