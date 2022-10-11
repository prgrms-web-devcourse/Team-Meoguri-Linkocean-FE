import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Pagination,
  Input,
  Select,
  BookmarkCard,
  NoResult,
  SelectCheckbox,
  CardWrap,
  TagButton,
  UserInfo,
} from "@/components/common";
import { useRouter } from "next/router";
import bookmarkAPI from "@/utils/apis/bookmark";
import { BookmarkList, ProfileDetail } from "@/types/model";
import { LINKOCEAN_PATH, PAGE_SIZE } from "@/utils/constants";
import {
  BaseQueryType,
  CategoryQueryType,
  FavoriteQueryType,
  FilterKeyType,
  FilterType,
  TagQueryType,
} from "@/types/type";
import { getQueryString } from "@/utils/queryString";
import {
  ContentDiv,
  FilterDiv,
  PaginationDiv,
  QueryDiv,
  SubFilterDiv,
  TagResultDiv,
  Title,
  Wrapper,
} from "../myBookmark/bookmarkTemplate";
import TagResetButton from "../myBookmark/tagResetButton";

interface OtherBookmarkProps {
  otherProfile: ProfileDetail;
  type: FilterKeyType;
  onFollow: (otherProfile: ProfileDetail) => void;
}

const OtherBookmark = ({
  otherProfile,
  type,
  onFollow,
}: OtherBookmarkProps) => {
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
  const [otherBookmarks, setOtherBookmarks] = useState<BookmarkList>({
    totalCount: -1,
    bookmarks: [],
  });
  const [deleteId, setDeleteId] = useState<number>();

  const handleFollow = () => {
    const nextOtherProfile = {
      ...otherProfile,
      isFollow: !otherProfile.isFollow,
    };

    if (otherProfile.isFollow) {
      nextOtherProfile.followerCount -= 1;
    } else {
      nextOtherProfile.followerCount += 1;
    }

    onFollow(nextOtherProfile);
  };

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
        const response = await bookmarkAPI.getOtherBookmarks(
          otherProfile.profileId,
          queryString
        );
        setOtherBookmarks(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [state, type, otherProfile.profileId]);

  return (
    <Wrapper>
      <UserInfo data={otherProfile} handleClick={handleFollow} />

      <Title>{`${otherProfile.username} 북마크`}</Title>

      <FilterDiv>
        <QueryDiv>
          <Select
            version2
            selectedOption={{
              value: type,
              text: FilterType[type],
            }}
            onChange={(newType) => {
              if (type !== newType)
                router.push(
                  `${LINKOCEAN_PATH.other}/${otherProfile.profileId}/${newType}`
                );
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
                {["전체", ...otherProfile.categories].map((category) => (
                  <Select.Option value={category} key={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select.OptionList>
            </Select>
          )}

          {type === "tag" && (
            <SelectCheckbox
              tags={otherProfile.tags ?? []}
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
          <TagResultDiv hasTag={(state as TagQueryType).tags.length > 0}>
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
            {(state as TagQueryType).tags.length > 0 && (
              <TagResetButton
                onClick={() => {
                  handleChanges([], "tags");
                }}
              />
            )}
          </TagResultDiv>
        )}
      </FilterDiv>

      {otherBookmarks.totalCount === 0 &&
      searchTitleRef.current?.value.length !== 0 ? (
        <NoResult />
      ) : (
        <ContentDiv>
          <SubFilterDiv>
            <h2>전체 {otherBookmarks.totalCount.toLocaleString()}개</h2>
            <Select
              onChange={(order) => handleChanges(order, "order")}
              selectedOption={{
                value: state.order,
                text: state.order === "upload" ? "최신 순" : "좋아요 순",
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
            {otherBookmarks.bookmarks.map((element) => (
              <BookmarkCard
                key={element.id}
                data={element}
                deleteBookmark={setDeleteId}
              />
            ))}
          </CardWrap>
        </ContentDiv>
      )}

      <PaginationDiv>
        <Pagination
          count={
            otherBookmarks
              ? Math.ceil(otherBookmarks.totalCount / PAGE_SIZE)
              : 0
          }
          onChange={(pageNum) => handleChanges(pageNum, "page")}
          defaultPage={state.page}
        />
      </PaginationDiv>
    </Wrapper>
  );
};

export default OtherBookmark;
