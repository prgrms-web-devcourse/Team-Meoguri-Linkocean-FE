import styled from "@emotion/styled";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import Pagination from "@/components/common/pagination";
import React, { ChangeEvent, useCallback, useState } from "react";
import { text } from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import Radio from "@/components/common/radio";

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

const dummyCategory = [
  "self_development",
  "humanities",
  "politics",
  "social",
  "art",
  "science",
  "technology",
  "it",
  "home",
  "health",
  "travel",
  "cooking",
];

const data = {
  profileId: 1,
  imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
  categories: ["it", "technology"],
  username: "joy",
  bio: "안녕하세요! 행복한 조이입니당.",
  followerCount: 12,
  followeeCount: 10,
};

const dummyBookmark = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const My = () => {
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>();
  const [temp, setTemp] = useState("");
  let a = React.useRef(temp);
  const test = (s: React.MutableRefObject<string>) => {
    a = s;
  };
  const onChange = () => {
    console.log("change");
  };
  const AsideMemo = React.useMemo(
    () => (
      <PageLayout.Aside>
        {tags}
        {category}
        <UserInfo data={data} />
        <MyFilterMenu
          categoryList={dummyCategory}
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
          <Title>즐겨찾기 목록</Title>
          <FilterDiv>
            <SearchDiv>
              <Input
                searchIcon
                onChange={(e) => {
                  setTemp(e.target.value);
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
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select.OptionList>
              </Select>
            </SelectDiv>
          </FilterDiv>
          <ContentDiv>
            {dummyBookmark.map((e) => (
              <DummyDiv>{e}</DummyDiv>
            ))}
          </ContentDiv>
          <PaginationDiv>
            <Pagination count={3} onChange={onChange} />
          </PaginationDiv>
        </Wrapper>
      </PageLayout.Article>
    </PageLayout>
  );
};

const Wrapper = styled.div`
  border: 1px solid black;
  margin: auto;
  width: 835px;
`;

const Title = styled.h1`
  ${text.$headline4}
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DummyDiv = styled.div`
  border: 1px solid red;
  width: 190px;
  height: 260px;
  justify-content: center;
`;
const ContentDiv = styled.div`
  border: 1px solid;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const SelectDiv = styled.div`
  float: right;
`;
const SearchDiv = styled.div`
  display: flex;
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export default My;
