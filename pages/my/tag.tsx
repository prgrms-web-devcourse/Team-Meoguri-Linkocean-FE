/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import Pagination from "@/components/common/pagination";
import React, { useEffect, useState } from "react";
import { text } from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import BookmarkCard from "@/components/common/bookmarkCard";
import { Bookmark } from "@/types/model";
import { useRouter } from "next/router";

export interface Dummy {
  count: number;
  name: string;
  data: Bookmark[];
}

const dummyResponse: Dummy = {
  count: 100,
  name: "bookmarks",
  data: [
    {
      id: 1,
      title: "네이버 웹툰",
      url: "https://comic.naver.com/index",
      openType: "all",
      updatedAt: "2022-01-01",
      imageUrl:
        "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_g",
      likeCount: 122,
      isFavorite: false,
      isWriter: true,
      tags: ["Spring", "네이버", "자주사용하는"],
    },
    {
      id: 2,
      title: "emotion",
      url: "https://emotion.sh/docs/best-practices",
      openType: "all",
      category: "IT",
      updatedAt: "2022-12-02",
      likeCount: 222,
      isFavorite: false,
      isWriter: true,
      tags: ["style", "React", "라이브러리"],
    },
    {
      id: 3,
      title: "네이버 웹툰",
      url: "https://comic.naver.com/index",
      openType: "all",
      category: "건강",
      updatedAt: "2022-02-04",
      imageUrl:
        "http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg",
      likeCount: 34,
      isFavorite: false,
      isWriter: true,
      tags: ["Spring", "React"],
    },
    {
      id: 4,
      title: "카페추천",
      url: "https://comic.naver.com/index",
      openType: "all",
      category: "가정",
      updatedAt: "2022-02-31",
      imageUrl:
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      likeCount: 83,
      isFavorite: false,
      isWriter: true,
      tags: ["Spring", "React"],
    },
    {
      id: 5,
      title: "음원 사이트",
      url: "https://comic.naver.com/index",
      openType: "all",
      category: "IT",
      updatedAt: "2022-07-22",
      imageUrl: "https://byline.network/wp-content/uploads/2018/05/cat.png",
      likeCount: 64,
      isFavorite: false,
      isWriter: true,
      tags: ["Spring", "React"],
    },
    {
      id: 6,
      title: "멜론",
      url: "https://comic.naver.com/index",
      openType: "all",
      category: "IT",
      updatedAt: "2022-08-23",
      imageUrl:
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      likeCount: 134,
      isFavorite: false,
      isWriter: true,
      tags: ["Spring", "React"],
    },
    {
      id: 7,
      title: "고양이",
      url: "https://byline.network/2018/05/21-20/",
      openType: "all",
      category: "요리",
      updatedAt: "2022-06-26",
      imageUrl:
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      likeCount: 23432,
      isFavorite: false,
      isWriter: true,
      tags: ["Spring", "React"],
    },
  ],
};

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

const dummyData = {
  favorite: false,
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfnFobXDZ9yiIjEpNUoA6CaoinBpWJF2d1rA&usqp=CAU",
  id: 2,
  title: "다음 웹툰",
  tags: ["Spring", "React"],
  category: "IT",
  url: "https://emotion.sh/docs/best-practices",
  updatedAt: "2022-01-01",
  openType: "all",
  likeCount: 12,
  isWriter: true,
};

const data = {
  profileId: 1,
  imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
  categories: ["it", "technology"],
  username: "joy",
  bio: "안녕하세요! 행복한 조이입니당.",
  followerCount: 12,
  followeeCount: 10,
};

const My = () => {
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    // const tagParamsObj = tags ? { tag: tags } : {tag:["1"] };
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tag: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags !== undefined) {
      router.push(`?${searchParams.toString()}`);
    }
  }, [tags]);

  useEffect(() => {
    const categoryParamsObj = { category };
    const searchParams = new URLSearchParams(categoryParamsObj).toString();
    if (category.length !== 0) {
      router.push(`category/?${searchParams.toString()}`);
    }
  }, [category]);

  const AsideMemo = React.useMemo(
    () => (
      <PageLayout.Aside>
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
          <Title>태그 목록</Title>
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
                  <Select.Option value="recent">최신 순</Select.Option>
                  <Select.Option value="like">좋아요 순</Select.Option>
                </Select.OptionList>
              </Select>
            </SelectDiv>
          </FilterDiv>
          <ContentDiv>
            {dummyResponse.data.map((e) => (
              // <div>hello</div>
              <BookmarkCard key={e.id} data={e} />
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
  gap: 37px;
`;

const Title = styled.h1`
  ${text.$headline4}
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  margin-top: 50px;
`;
export default My;

// 최신 순
// 좋아요 순

// ?pages=?&size=?&order=?&tags=?&category=?&searchTitle=?&favorite=?
// page
// size
// order
// tags
// category
// searchTitle
// favorite
