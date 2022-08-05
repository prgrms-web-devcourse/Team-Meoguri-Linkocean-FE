import FeedFilterMenu from "@/components/common/filterMenu/feedFilterMenu";
import Input from "@/components/common/input";
import PageLayout from "@/components/common/pageLayout";
import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import Button from "@/components/common/button";
import Label from "@/components/common/label";
import Checkbox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Pagination from "@/components/common/pagination";
import { Bookmark } from "@/types/model";
import BookmarkCard from "@/components/common/bookmarkCard";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { CATEGORY } from "@/types/type";

const PAGE_SIZE = 8;

type CategoryType = "전체" | typeof CATEGORY[number];
type OrderType = "update" | "like";

type Filtering = {
  category: CategoryType;
  searchTitle: string;
  follow: boolean;
  order: OrderType;
  pages: number;
  size: number;
};

const INITIAL_FILTERING: Filtering = {
  category: "전체",
  searchTitle: "",
  follow: false,
  order: "update",
  pages: 1,
  size: PAGE_SIZE,
};

const getUrl = (state: Filtering) => {
  return `/feed?${decodeURI(
    new URLSearchParams(
      Object.entries(state).map(([key, value]) => [key, value.toString()])
    ).toString()
  )}`;
};

const Feed = () => {
  console.log("feed");
  const router = useRouter();

  const [state, setState] = useState<Filtering>(INITIAL_FILTERING);

  const handleChangeFollow = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, follow: checked });
  };
  const handleChangeCategory = (selectedCategory: string) => {
    setState({ ...state, category: selectedCategory as CategoryType });
  };
  const handleChangeOrder = (selectedOrder: string) => {
    setState({ ...state, order: selectedOrder as OrderType });
  };
  const handleChangePages = (pages: number) => {
    setState({ ...state, pages });
  };
  const handleChangeSearchTitle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const $searchTitle = e.currentTarget.elements.namedItem(
      "searchTitle"
    ) as HTMLInputElement;
    setState({ ...state, searchTitle: $searchTitle.value });
  };

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

            <Test>{`상태: ${JSON.stringify(state, null, " ")}`}</Test>
            <Test>{`API url: ${new URLSearchParams(
              Object.entries(state).map(([key, value]) => [
                key,
                value.toString(),
              ])
            ).toString()}`}</Test>
            <Test>{`Browser URL: ${getUrl(state)}`}</Test>

            <Form action="submit" onSubmit={handleChangeSearchTitle}>
              <SearchTitle>
                <Input searchIcon name="searchTitle" />
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
                    onChange={handleChangeFollow}
                  />
                </Follow>

                <div>
                  <Select onChange={handleChangeOrder}>
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
              {DUMMY_BOOKMARK_LIST.map((bookmark) => (
                <BookmarkCard key={bookmark.id} data={bookmark} />
              ))}
            </BookmarkContainer>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                defaultPage={state.pages}
                count={6}
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

const Test = styled.div``;

export default Feed;

const DUMMY_BOOKMARK_LIST: Bookmark[] = [
  {
    id: 1,
    title: "네이버 웹툰",
    url: "https://comic.naver.com/index",
    openType: "all",
    updatedAt: "2022-01-01",
    imageUrl: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_g",
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
];
