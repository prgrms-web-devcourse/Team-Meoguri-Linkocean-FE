import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import styled from "@emotion/styled";
import {
  Input,
  PageLayout,
  Button,
  Label,
  Checkbox,
  Select,
  Pagination,
  BookmarkCard,
  NoResult,
  Meta,
} from "@/components/common";
import FeedFilterMenu from "@/components/common/filterMenu/feedFilterMenu";
import { BookmarkList } from "@/types/model";
import { CATEGORY } from "@/types/type";
import { useProfileState } from "@/hooks/useProfile";
import bookmarkAPI from "@/utils/apis/bookmark";
import { getQueryString } from "@/utils/queryString";
import { LINKOCEAN_PATH } from "@/utils/constants";
import * as theme from "@/styles/theme";

const PAGE_SIZE = 8;

type CategoryType = "전체" | typeof CATEGORY[number];
type OrderType = "upload" | "like";

type Filtering = {
  category: CategoryType;
  searchTitle: string;
  follow: boolean;
  order: OrderType;
  page: number;
  size: number;
};

const INITIAL_FILTERING: Filtering = {
  category: "전체",
  searchTitle: "",
  follow: false,
  order: "upload",
  page: 1,
  size: PAGE_SIZE,
};

const Feed = () => {
  const router = useRouter();

  const { profileId } = useProfileState();
  const [state, setState] = useState<Filtering>(INITIAL_FILTERING);
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

    const query: Partial<Filtering> = { ...state };
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
    (nextState: Filtering) => {
      const { size, searchTitle, ...query } = nextState;

      router.push({
        pathname: LINKOCEAN_PATH.feed,
        query: searchTitle === "" ? { ...query } : { ...query, searchTitle },
      });
    },
    [router]
  );

  const handleChangeState = (nextState: Filtering) => {
    setState(nextState);
    changeRoutePath(nextState);
  };
  const handleChangeFollow = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    handleChangeState({
      ...state,
      page: INITIAL_FILTERING.page,
      follow: checked,
    });
  };

  const handleChangeCategory = (selectedCategory: string) => {
    handleChangeState({
      ...state,
      searchTitle: INITIAL_FILTERING.searchTitle,
      page: INITIAL_FILTERING.page,
      category: selectedCategory as CategoryType,
    });
  };
  const handleChangeOrder = (selectedOrder: string) => {
    handleChangeState({
      ...state,
      page: INITIAL_FILTERING.page,
      order: selectedOrder as OrderType,
    });
  };
  const handleChangePages = (page: number) => {
    handleChangeState({ ...state, page });
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

    handleChangeState({
      ...state,
      page: INITIAL_FILTERING.page,
      searchTitle: trimmedSearchTitle,
    });
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
    const follow = (query.follow as string) === "true";
    setIsRouterReady(true);

    setState({
      ...INITIAL_FILTERING,
      ...query,
      page,
      follow,
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
        title={`${state.searchTitle} - 전체 피드 검색`.trim()}
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
        <PageLayout.Aside>
          {isRouterReady ? (
            <FeedFilterMenu
              getCategoryData={handleChangeCategory}
              category={state.category}
            />
          ) : null}
        </PageLayout.Aside>

        <PageLayout.Article>
          <Layout>
            <Title>피드 페이지</Title>

            <Form action="submit" onSubmit={handleChangeSearchTitle}>
              <SearchTitle>
                <Input
                  searchIcon
                  name="searchTitle"
                  ref={searchTitleRef}
                  value={searchTitleInputValue}
                  onChange={(e) => setSearchTitleInputValue(e.target.value)}
                />
                <Button
                  colorType="main-color"
                  buttonType="small"
                  type="submit"
                  width="82"
                >
                  검색
                </Button>
              </SearchTitle>

              <FormRight>
                <Follow>
                  <Label
                    htmlFor="follow"
                    style={{ userSelect: "none", cursor: "pointer" }}
                  >
                    팔로워 게시글만
                  </Label>
                  <Checkbox
                    name="follow"
                    id="follow"
                    on={state.follow}
                    onChange={handleChangeFollow}
                  />
                </Follow>

                <div>
                  <Select
                    onChange={handleChangeOrder}
                    selectedOption={{
                      value: state.order,
                      text: state.order === "upload" ? "최신 순" : "좋아요 순",
                    }}
                  >
                    <Select.Trigger>정렬</Select.Trigger>
                    <Select.OptionList>
                      <Select.Option value="upload">최신 순</Select.Option>
                      <Select.Option value="like">좋아요 순</Select.Option>
                    </Select.OptionList>
                  </Select>
                </div>
              </FormRight>
            </Form>

            <BookmarkContainer>
              {state.searchTitle !== "" && feedBookmarks.totalCount === 0 ? (
                <NoResult />
              ) : (
                feedBookmarks.bookmarks.map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.id}
                    data={bookmark}
                    deleteBookmark={handleBookmarkDelete}
                    isMine={profileId === bookmark.profile?.profileId}
                  />
                ))
              )}
            </BookmarkContainer>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                defaultPage={state.page}
                count={Math.ceil(feedBookmarks.totalCount / state.size)}
                onChange={handleChangePages}
              />
            </div>
          </Layout>
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 835px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 9px 0 35px 15px;
  color: ${theme.color.$gray800};
  ${theme.text.$headline5};
`;

const Form = styled.form`
  display: inline-flex;
  justify-content: space-between;
  margin-bottom: 37px;
`;

const SearchTitle = styled.div`
  display: flex;
  gap: 10px;
`;

const FormRight = styled.div`
  display: flex;
  gap: 27px;
`;

const Follow = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 12px;
`;

const BookmarkContainer = styled.div`
  margin-bottom: 90px;
  min-height: 288px;
`;

export default Feed;
