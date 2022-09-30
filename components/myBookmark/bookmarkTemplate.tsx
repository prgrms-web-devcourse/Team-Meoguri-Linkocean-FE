import { FormEvent, useEffect, useRef, useState } from "react";
import {
  CardWrap,
  Pagination,
  Input,
  Select,
  BookmarkCard,
  NoResult,
  SelectCheckbox,
  TagButton,
} from "@/components/common";
import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import { useRouter } from "next/router";
import bookmarkAPI from "@/utils/apis/bookmark";
import { BookmarkList } from "@/types/model";
import {
  CATEGORY,
  TagType,
  FilterType,
  FilterKeyType,
  SortType,
  FavoriteQueryType,
  CategoryQueryType,
  TagQueryType,
  BaseQueryType,
} from "@/types/type";
import { getQueryString } from "@/utils/queryString";

const PAGE_SIZE = 8;

interface MyBookmarkProps {
  type: FilterKeyType;
  categories?: typeof CATEGORY[number][];
  tags?: TagType[];
}

const MyBookmark = ({ type, categories = [], tags = [] }: MyBookmarkProps) => {
  const router = useRouter();
  const searchTitleRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<
    FavoriteQueryType | CategoryQueryType | TagQueryType
  >(() => {
    const initState: BaseQueryType = {
      searchTitle: "",
      order: "upload",
      page: 1,
      size: PAGE_SIZE,
    };

    switch (type) {
      case "category":
        return { ...initState, category: "전체" };
      case "tag":
        return { ...initState, tags: [] };
      default:
        return { ...initState, favorite: true };
    }
  });
  const [myBookmarks, setMyBookmarks] = useState<BookmarkList>();
  const [deleteId, setDeleteId] = useState<number>(-1);

  const handleChanges = (value: string | number | string[], name: string) => {
    if (state[name as keyof typeof state] === value) {
      return;
    }

    const nextState = { ...state, page: 1, [name]: value };
    setState(nextState);
  };

  const handleChangeSearchTitle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const $searchTitle = searchTitleRef.current as HTMLInputElement;
    const trimmedSearchTitle = $searchTitle.value.trim();

    $searchTitle.value = trimmedSearchTitle;
    if (trimmedSearchTitle === "") {
      return;
    }

    handleChanges(trimmedSearchTitle, "searchTitle");
  };

  useEffect(() => {
    (async () => {
      const partialQuery = { ...state } as Partial<BaseQueryType>;
      if (partialQuery.searchTitle === "") {
        delete partialQuery.searchTitle;
      }

      let queryString = "";

      if (type === "category") {
        const typedPartialQuery = partialQuery as Partial<CategoryQueryType>;
        if (typedPartialQuery.category === "전체") {
          delete typedPartialQuery.category;
        }

        queryString = getQueryString(typedPartialQuery);
      } else if (type === "tag") {
        const typedPartialQuery = partialQuery as Partial<TagQueryType>;
        const tagsString = typedPartialQuery.tags?.join(",");
        delete typedPartialQuery.tags;

        queryString = getQueryString({
          ...typedPartialQuery,
          tags: tagsString,
        });
      } else if (type === "favorite") {
        queryString = getQueryString(partialQuery);
      }

      try {
        const response = await bookmarkAPI.getMyBookmarks(queryString);
        setMyBookmarks(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [state, type]);

  return (
    <Wrapper>
      <Title>내 북마크</Title>
      <FilterDiv>
        <QueryDiv>
          <Select
            version2
            selectedOption={{
              value: type,
              text: FilterType[type],
            }}
            onChange={(newType) => {
              if (type !== newType) router.push(`/my/${newType}`);
            }}
          >
            <Select.Trigger>선택</Select.Trigger>
            <Select.OptionList>
              {Object.entries(FilterType).map(([optionValue, optionText]) => (
                <Select.Option value={optionValue} key={optionValue}>
                  {optionText}
                </Select.Option>
              ))}
            </Select.OptionList>
          </Select>

          {type === "category" && (
            <Select
              version2
              selectedOption={{
                value: (state as CategoryQueryType).category,
                text: (state as CategoryQueryType).category,
              }}
              onChange={(category) => handleChanges(category, "category")}
            >
              <Select.Trigger>선택</Select.Trigger>
              <Select.OptionList>
                {["전체", ...categories].map((category) => (
                  <Select.Option value={category} key={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select.OptionList>
            </Select>
          )}

          {type === "tag" && (
            <SelectCheckbox
              tags={tags}
              checkedList={(state as TagQueryType).tags}
              setCheckedList={(checkedTags) => {
                handleChanges(checkedTags, "tags");
              }}
            />
          )}

          <form action="submit" onSubmit={handleChangeSearchTitle}>
            <Input
              searchIcon
              ref={searchTitleRef}
              endIcon
              style={{ border: 0 }}
              autoFocus
            />
          </form>
        </QueryDiv>

        {type === "tag" && (
          <TagResultDiv>
            {(state as TagQueryType).tags.map((curTag) => (
              <TagButton
                key={curTag}
                onClick={() =>
                  handleChanges(
                    (state as TagQueryType).tags.filter(
                      (tag) => tag !== curTag
                    ),
                    "tags"
                  )
                }
              >
                {curTag}
              </TagButton>
            ))}
          </TagResultDiv>
        )}
      </FilterDiv>

      {myBookmarks &&
      myBookmarks.totalCount === 0 &&
      searchTitleRef.current?.value.length !== 0 ? (
        <NoResult />
      ) : (
        <>
          <SubFilterDiv>
            <h2>전체 {myBookmarks?.totalCount.toLocaleString()}개</h2>
            <Select
              onChange={(order) => handleChanges(order, "order")}
              selectedOption={{
                value: state.order,
                text: SortType[state.order],
              }}
              version2
            >
              <Select.Trigger>선택</Select.Trigger>
              <Select.OptionList>
                <Select.Option value="upload">최신 순</Select.Option>
                <Select.Option value="like">좋아요 순</Select.Option>
              </Select.OptionList>
            </Select>
          </SubFilterDiv>

          <CardWrap>
            {myBookmarks?.bookmarks.map((element) =>
              deleteId !== element.id ? (
                <BookmarkCard
                  key={element.id}
                  data={element}
                  deleteBookmark={setDeleteId}
                />
              ) : null
            )}
          </CardWrap>
        </>
      )}

      <PaginationDiv>
        <Pagination
          count={
            myBookmarks ? Math.ceil(myBookmarks.totalCount / PAGE_SIZE) : 0
          }
          onChange={(pageNum) => handleChanges(pageNum, "page")}
          defaultPage={state.page}
        />
      </PaginationDiv>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  margin: auto;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  ${text.$headline5}
  color:${color.$gray800};
  margin: 9px 0 28px 0;
`;

export const FilterDiv = styled.div`
  position: relative;
  border-radius: 8px;
  margin-bottom: 38px;
  padding: 15px 20px;
  background-color: #f4f9fc;

  &:after {
    content: "";
    display: block;
    width: 98px;
    height: 33px;
    background-image: url("/image/crab.png");
    position: absolute;
    top: -33px;
    right: 46px;
    background-size: cover;
  }
`;

export const QueryDiv = styled.div`
  display: flex;
  gap: 14px;
`;

export const TagResultDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
`;

export const Tag = styled.span``;

export const SubFilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ContentDiv = styled.div`
  padding-top: 2px;
  min-height: 288px;
`;

export const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 26px;
`;

export default MyBookmark;
