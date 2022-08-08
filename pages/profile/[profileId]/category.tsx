/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import Pagination from "@/components/common/pagination";
import React, { useEffect, useState } from "react";
import { color, text } from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import BookmarkCard from "@/components/common/bookmarkCard";
import { useRouter } from "next/router";
import { getBookMarkList, getProfile } from "@/types/dummyData";
import OtherFilterMenu from "@/components/common/filterMenu/otherFilterMenu";

const dummyTag = [
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

const Category = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { profileId } = router.query;

  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tag: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags.length !== 0) {
      router.push(`/profile/${profileId as string}/tag?${searchParams}`);
    }
  }, [tags]);

  useEffect(() => {
    const categoryParamsObj = category ? { category } : { category: "" };
    const searchParams = new URLSearchParams(categoryParamsObj).toString();
    if (category !== undefined) {
      router.push(`/profile/${profileId as string}/category?${searchParams}`);
    }
  }, [category]);

  const AsideMemo = React.useMemo(
    () => (
      <PageLayout.Aside>
        <UserInfo data={getProfile} />
        <OtherFilterMenu
          categoryList={getProfile.categories}
          tagList={dummyTag}
          getCategoryData={setCategory}
          getTagsData={setTags}
        />
      </PageLayout.Aside>
    ),
    [category, tags]
  );

  return (
    <PageLayout>
      {AsideMemo}
      <PageLayout.Article>
        <Wrapper>
          <Title>딴사람</Title>
          <FilterDiv>
            <SearchDiv>
              <Input
                searchIcon
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <Button buttonType="small" colorType="main-color">
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
            {getBookMarkList.data.map((element) => (
              <BookmarkCard key={element.id} data={element} />
            ))}
          </ContentDiv>
          <PaginationDiv>
            <Pagination count={3} onChange={() => console.log("onChange")} />
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
  color:${color.$gray800}
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