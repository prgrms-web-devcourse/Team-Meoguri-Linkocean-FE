/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  Pagination,
  Input,
  Button,
  Select,
  BookmarkCard,
  NoResult,
} from "@/components/common";
import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import { useRouter } from "next/router";
import bookmarkAPI from "@/utils/apis/bookmark";
import { BookmarkList } from "@/types/model";
import { deleteDuplicateQuery } from "@/utils/deleteDuplicateQuery";

const PAGE_SIZE = 8;

interface MyBookmarkProps {
  PageTitle: string;
}

const MyBookmark = ({ PageTitle }: MyBookmarkProps) => {
  const router = useRouter();
  const searchInput = useRef<HTMLInputElement>(null);
  const [requestQuery, setRequestQuery] = useState("init");
  const [myBookmarks, setMyBookmarks] = useState<BookmarkList>({
    totalCount: -1,
    bookmarks: [],
  });
  const [deleteId, setDeleteId] = useState<number>(-1);
  const getMyBookmarksApi = (query: string) => {
    (async () => {
      try {
        const res = await bookmarkAPI.getMyBookmarks(query);
        setMyBookmarks(res.data as BookmarkList);
      } catch (error) {
        console.error(error);
      }
    })();
  };
  const [page, setPage] = useState(1);

  const searching = () => {
    const keyword = searchInput.current?.value.trim();
    const current = searchInput.current as HTMLInputElement;
    current.value = keyword as string;
    let query = deleteDuplicateQuery(requestQuery, "searchTitle");
    query = deleteDuplicateQuery(query, "page");
    if (keyword) {
      setRequestQuery(`${query}searchTitle=${keyword}&page=1`);
    } else {
      setRequestQuery(`${query}`);
    }
  };

  const sorting = (element: string) => {
    const query = deleteDuplicateQuery(requestQuery, "order");
    const queryWithSort = `${query}order=${element}`;
    setRequestQuery(queryWithSort);
  };

  const changePage = (pageNum: number) => {
    setPage(pageNum);
    const query = deleteDuplicateQuery(requestQuery, "page");
    const queryWithSort = `${query}page=${pageNum}`;
    setRequestQuery(queryWithSort);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      searching();
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    setPage(1);
    if (searchInput.current) {
      searchInput.current.value = "";
    }
    let routerQuery = "no";
    const key = Object.keys(router.query)[0];
    const value = router.query[key];
    if (key === "category" || key === "tags") {
      if (value === "전체") {
        routerQuery = "";
      } else if (typeof value === "string") {
        routerQuery = `${key}=${value}`;
      }
    } else {
      routerQuery = "favorite=true&";
    }
    if (router.isReady) {
      setRequestQuery(routerQuery);
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    if (router.isReady && requestQuery !== "init") {
      getMyBookmarksApi(requestQuery);
    }
  }, [requestQuery, router.isReady]);

  useEffect(() => {
    if (myBookmarks.totalCount % PAGE_SIZE === 1 && deleteId !== -1) {
      const query = deleteDuplicateQuery(requestQuery, "page");
      setRequestQuery(`${query}page=${page - 1}`);
    } else if (deleteId !== -1) {
      getMyBookmarksApi(requestQuery);
    }
  }, [deleteId, router.isReady]);

  return (
    <Wrapper>
      <Title>{PageTitle}</Title>
      <FilterDiv>
        <SearchDiv>
          <Input searchIcon ref={searchInput} onKeyDown={onKeyPress} />
          <Button
            buttonType="small"
            colorType="main-color"
            onClick={() => searching()}
          >
            검색
          </Button>
        </SearchDiv>
        <SelectDiv>
          <Select onChange={(e) => sorting(e)}>
            <Select.Trigger>선택</Select.Trigger>
            <Select.OptionList>
              <Select.Option value="upload">최신 순</Select.Option>
              <Select.Option value="like">좋아요 순</Select.Option>
            </Select.OptionList>
          </Select>
        </SelectDiv>
      </FilterDiv>
      {myBookmarks.totalCount === 0 &&
      searchInput.current?.value.length !== 0 ? (
        <NoResult />
      ) : (
        <ContentDiv>
          {myBookmarks.bookmarks.map((element) =>
            deleteId !== element.id ? (
              <BookmarkCard
                key={element.id}
                data={element}
                deleteBookmark={setDeleteId}
              />
            ) : null
          )}
        </ContentDiv>
      )}
      <PaginationDiv>
        <Pagination
          count={Math.ceil(myBookmarks.totalCount / PAGE_SIZE)}
          onChange={(pageNum) => {
            changePage(pageNum);
          }}
          defaultPage={page}
        />
      </PaginationDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  width: 835px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const Title = styled.h1`
  ${text.$headline5}
  color:${color.$gray800};
  margin: 9px 0 0 15px;
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentDiv = styled.div`
  padding-top: 2px;
  min-height: 288px;
`;

const SelectDiv = styled.div`
  z-index: 1;
`;
const SearchDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 26px;
`;

export default MyBookmark;
