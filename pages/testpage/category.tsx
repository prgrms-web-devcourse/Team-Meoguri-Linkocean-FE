/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import Pagination from "@/components/common/pagination";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { color, text } from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import BookmarkCard from "@/components/common/bookmarkCard";
import { useRouter } from "next/router";
import { getProfile } from "@/types/dummyData";
import bookmarkAPI from "@/utils/apis/bookmark";
import profileAPI from "@/utils/apis/profile";
import { BookmarkList, ProfileDetail } from "@/types/model";

const PAGE_SIZE = 8;

const Category = () => {
  const router = useRouter();
  const searchInput = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>();
  const [sort, setSort] = useState<"like" | "update" | "">("");
  const [requestQuery, setRequestQuery] = useState({
    page: 1,
    size: 8,
    order: "update",
    tags: "",
    category: "",
    searchTitle: "",
    favorite: "",
  });

  const [userData, setUserData] = useState<ProfileDetail>({
    profileId: 0,
    favoriteCategories: [],
    username: "",
    followerCount: 0,
    followeeCount: 0,
  });

  const initQuery = {};

  const [myBookmarks, setMyBookmarks] = useState<BookmarkList>({
    totalCount: 0,
    bookmarks: [],
  });
  const getQueryString = (obj: object) =>
    Object.entries(obj)
      .map((entry) => entry.join("="))
      .join("&");

  useEffect(() => {
    const pageCategory: string =
      typeof router.query.category === "string" ? router.query.category : "";
    setRequestQuery({ ...requestQuery, category: pageCategory });
    getUserData();
    getMyBookmarks(requestQuery);
  }, [router]);

  useEffect(() => {
    const categoryParamsObj = category ? { category } : { category: "" };
    const categorySearchParams = new URLSearchParams(
      categoryParamsObj
    ).toString();
    if (category !== undefined) {
      router.push(`category/?${categorySearchParams}`);
    }
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tag: tagsString };
    const tagSearchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags.length !== 0) {
      router.push(`tag/?${tagSearchParams}`);
    }
  }, [category, tags]);

  const getMyBookmarks = useCallback(
    async (q: typeof requestQuery) => {
      const queryString = getQueryString(q);
      const response = await bookmarkAPI.getFeedBookmarks(queryString);
      setMyBookmarks(response.data);
    },
    [myBookmarks]
  );

  const getUserData = useCallback(async () => {
    const profileData = await profileAPI.getMyProfile();
    setUserData(profileData.data);
  }, [userData]);

  const search = () => {
    const keyword = searchInput.current?.value;
    if (keyword) {
      setRequestQuery({ ...requestQuery, searchTitle: keyword });
    }
    getMyBookmarks(requestQuery);
  };
  const changePage = (pageNum: number) => {
    console.log(pageNum);
  };

  const AsideMemo = React.useMemo(
    () => (
      <PageLayout.Aside>
        <UserInfo data={userData} />
        <MyFilterMenu
          categoryList={userData.categories}
          tagList={userData.tags}
          getCategoryData={setCategory}
          getTagsData={setTags}
        />
      </PageLayout.Aside>
    ),
    [userData]
  );
  return (
    <PageLayout>
      {AsideMemo}
      <PageLayout.Article>
        <Wrapper>
          <Title>카테고리 목록</Title>
          <FilterDiv>
            <SearchDiv>
              <Input searchIcon ref={searchInput} />
              <Button
                buttonType="small"
                colorType="main-color"
                onClick={search}
              >
                검색
              </Button>
            </SearchDiv>
            <SelectDiv>
              <Select>
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
              <BookmarkCard key={element.title} data={element} />
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
      </PageLayout.Article>
    </PageLayout>
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
export default Category;
