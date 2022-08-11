/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import Pagination from "@/components/common/pagination";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { color, text } from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import BookmarkCard from "@/components/common/bookmarkCard";
import { useRouter } from "next/router";
import bookmarkAPI from "@/utils/apis/bookmark";
import { BookmarkList } from "@/types/model";
import { deleteDuplicateQuery } from "@/utils/deleteDuplicateQuery";
import NoResult from "@/components/common/noResult";

const PAGE_SIZE = 8;

interface MyBookmarkProps {
  PageTitle: string;
}

const MyBookmark = ({ PageTitle }: MyBookmarkProps) => {
  const router = useRouter();
  const searchInput = useRef<HTMLInputElement>(null);
  const [requestQuery, setRequestQuery] = useState("");
  const [myBookmarks, setMyBookmarks] = useState<BookmarkList>({
    totalCount: 0,
    bookmarks: [],
  });
  const [deleteId, setDeleteId] = useState<number>();
  const getMyBookmarksApi = (query: string) => {
    (async () => {
      try {
        const res = await bookmarkAPI.getMyBookmarks(query);
        console.log(query);
        setMyBookmarks(res.data as BookmarkList);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const searching = () => {
    const keyword = searchInput.current?.value;
    if (keyword) {
      const query = deleteDuplicateQuery(requestQuery, "searchTitle");
      setRequestQuery(`${query}searchTitle=${keyword}`);
    }
  };

  const sorting = (element: string) => {
    const query = deleteDuplicateQuery(requestQuery, "order");
    const queryWithSort = `${query}order=${element}`;
    setRequestQuery(queryWithSort);
  };

  const changePage = (pageNum: number) => {
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
    // router에 따른 filtering(category|tag|favorite) => 같은 페이지에서 쿼리 변경될 때
    if (!router.isReady) return;
    if (searchInput.current) {
      searchInput.current.value = "";
    }
    let routerQuery = "";
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
    setRequestQuery(routerQuery);
  }, [router.asPath]);

  useEffect(() => {
    // requestQuery가 변경될 때 api 호출
    getMyBookmarksApi(requestQuery);
    // const temp = deleteDuplicateQuery(requestQuery, "favorite");
    // router.push(`${router.pathname}?&${temp}`);
  }, [requestQuery]);

  useEffect(() => {}, [deleteId]);

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
      <ContentDiv>
        {myBookmarks.totalCount === 0 &&
        searchInput.current?.value.length !== 0 ? (
          <NoResult />
        ) : null}
        {myBookmarks.bookmarks.map((element) =>
          deleteId !== element.id ? (
            <BookmarkCard
              key={element.title}
              data={element}
              deleteBookmark={setDeleteId}
            />
          ) : null
        )}
      </ContentDiv>
      <PaginationDiv>
        <Pagination
          count={Math.ceil(myBookmarks.totalCount / PAGE_SIZE)}
          onChange={(pageNum) => {
            changePage(pageNum);
          }}
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
  ${text.$headline4}
  color:${color.$gray800};
  margin: 9px 0 0 15px;
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentDiv = styled.div`
  padding-top: 2px;
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
