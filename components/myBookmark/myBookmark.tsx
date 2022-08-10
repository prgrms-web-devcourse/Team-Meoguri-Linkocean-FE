/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import Pagination from "@/components/common/pagination";
import React, { useEffect, useRef, useState } from "react";
import { color, text } from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import BookmarkCard from "@/components/common/bookmarkCard";
import { useRouter } from "next/router";
import bookmarkAPI from "@/utils/apis/bookmark";
import { BookmarkList } from "@/types/model";

const PAGE_SIZE = 8;

// 1. router.pathname을 매개변수로 넘기면
// base_url 반환하는 함수 (/my/favorite, /my/tag, /my/category)
// 2. favorite=true&sort=upload, favorite 넘기면
// sort=upload 만 반환하는 함수
interface MyBookmarkProps {
  PageTitle: string;
}

const MyBookmark = ({ PageTitle }: MyBookmarkProps) => {
  const router = useRouter();
  const searchInput = useRef<HTMLInputElement>(null);
  const [sort, setSort] = useState<string>("upload");
  const [searchQuery, setSearchQuery] = useState("");
  const [myBookmarks, setMyBookmarks] = useState<BookmarkList>({
    totalCount: 0,
    bookmarks: [],
  });

  const searching = () => {
    // searchTitle 쌓이는 문제
    const keyword = searchInput.current?.value;
    if (keyword) {
      setSearchQuery(`${searchQuery}&searchTitle=${keyword}`);
    }
  };
  useEffect(() => {
    // router에 따른 filtering(category|tag|favorite)
    let routerQuery = "";
    const key = Object.keys(router.query)[0];
    const value = router.query[key];
    if (key === "category" || key === "tags") {
      if (value === "전체") {
        routerQuery = "";
      } else if (typeof value === "string") {
        routerQuery = `${key}=${value}&`;
      }
    } else {
      routerQuery = "favorite=true&";
    }
    getMyBookmarksApi(routerQuery);
    // setSearchQuery(routerQuery);
  }, []);

  useEffect(() => {
    // router에 따른 filtering(category|tag|favorite)
    let routerQuery = "";
    const key = Object.keys(router.query)[0];
    const value = router.query[key];
    if (key === "category" || key === "tags") {
      if (value === "전체") {
        routerQuery = "";
      } else if (typeof value === "string") {
        routerQuery = `${key}=${value}&`;
      }
    } else {
      routerQuery = "favorite=true&";
    }
    getMyBookmarksApi(routerQuery);
  }, [router.asPath, router.query]);

  useEffect(() => {
    // 검색
    getMyBookmarksApi(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    // sort
    console.log(router.pathname);
    const query = `${searchQuery}sort=${sort}&`;
    // router.push(`${router.pathname}?${query}`);
    getMyBookmarksApi(query);
  }, [sort]);

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

  const changePage = (pageNum: number) => {
    console.log(pageNum);
  };

  return (
    <Wrapper>
      <Title>{PageTitle}</Title>
      <FilterDiv>
        <SearchDiv>
          <Input searchIcon ref={searchInput} />
          <Button
            buttonType="small"
            colorType="main-color"
            onClick={() => searching()}
          >
            검색
          </Button>
        </SearchDiv>
        <SelectDiv>
          <Select onChange={setSort}>
            <Select.Trigger>선택</Select.Trigger>
            <Select.OptionList>
              <Select.Option value="upload">최신 순</Select.Option>
              <Select.Option value="like">좋아요 순</Select.Option>
            </Select.OptionList>
          </Select>
        </SelectDiv>
      </FilterDiv>
      <ContentDiv>
        {myBookmarks.bookmarks.map((element) => (
          <BookmarkCard
            key={element.title}
            data={element}
            deleteBookmark={() => console.log("hello")}
          />
        ))}
      </ContentDiv>
      <PaginationDiv>
        <Pagination
          count={Math.ceil(100 / PAGE_SIZE)}
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
