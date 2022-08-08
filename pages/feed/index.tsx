import Head from "next/head";
import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/router";
import FeedFilterMenu from "@/components/common/filterMenu/feedFilterMenu";
import Input from "@/components/common/input";
import PageLayout from "@/components/common/pageLayout";
import styled from "@emotion/styled";
import Button from "@/components/common/button";
import Label from "@/components/common/label";
import Checkbox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Pagination from "@/components/common/pagination";
import { Bookmark, BookmarkList } from "@/types/model";
import BookmarkCard from "@/components/common/bookmarkCard";
import { CATEGORY } from "@/types/type";
import bookmarkAPI from "@/utils/apis/bookmark";
import { getQueryString } from "@/utils/queryString";
import * as theme from "@/styles/theme";

const PAGE_SIZE = 8;

type CategoryType = "전체" | typeof CATEGORY[number];
type OrderType = "update" | "like";

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
  order: "update",
  page: 1,
  size: PAGE_SIZE,
};

// TODO: 새로고침 시 query와 필터링 상태와 동기화 및 올바르지 않은 query일 경우 404 페이지 보내기, 로딩

const Feed = () => {
  const router = useRouter();

  const [state, setState] = useState<Filtering>(INITIAL_FILTERING);
  const [feedBookmarks, setFeedBookmarks] = useState<BookmarkList>({
    totalCount: 0,
    bookmarks: [],
  });

  const searchTitleRef = useRef<HTMLInputElement>(null);

  const getFeedBookmarks = useCallback(async () => {
    const queryString = getQueryString(state);
    const response = await bookmarkAPI.getFeedBookmarks(queryString);
    setFeedBookmarks(response.data);
  }, [state]);

  const changeRoutePath = useCallback(
    (nextState: Filtering) => {
      const { size, ...query } = nextState;
      router.push(`/feed?${getQueryString(query)}`);
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

  useEffect(() => {
    const $searchTitle = searchTitleRef.current as HTMLInputElement;
    $searchTitle.value = state.searchTitle;

    getFeedBookmarks();
  }, [getFeedBookmarks, state.searchTitle]);

  return (
    <>
      <Head>
        <title>LinkOcean | 피드</title>
      </Head>

      <PageLayout>
        <PageLayout.Aside>
          <FeedFilterMenu getCategoryData={handleChangeCategory} />
        </PageLayout.Aside>

        <PageLayout.Article>
          <Layout>
            <Title>피드 페이지</Title>

            <Form action="submit" onSubmit={handleChangeSearchTitle}>
              <SearchTitle>
                <Input searchIcon name="searchTitle" ref={searchTitleRef} />
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
                      text: state.order === "update" ? "최신 순" : "좋아요 순",
                    }}
                  >
                    <Select.Trigger>정렬</Select.Trigger>
                    <Select.OptionList>
                      <Select.Option value="update">최신 순</Select.Option>
                      <Select.Option value="like">좋아요 순</Select.Option>
                    </Select.OptionList>
                  </Select>
                </div>
              </FormRight>
            </Form>

            <BookmarkContainer>
              {feedBookmarks.bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} data={bookmark} />
              ))}
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
  height: 549px;
  margin-bottom: 90px;
`;

export default Feed;
