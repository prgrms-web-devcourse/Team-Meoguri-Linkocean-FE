import styled from "@emotion/styled";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import PageLayout from "@/components/common/pageLayout/index";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import Textarea from "@/components/common/textarea";
import Select from "@/components/common/select";
import Radio from "@/components/common/radio";
import Button from "@/components/common/button";
import ErrorText from "@/components/common/errorText";
import { useEffect, useRef, useState } from "react";
import { color, text } from "@/styles/theme";
import Tag from "@/components/create/tag";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import bookmarkAPI, { EditBookmarkPayload } from "@/utils/apis/bookmark";
import { CATEGORY, OpenType } from "@/types/type";
import { BookmarkDetail } from "@/types/model";

type EditCategoryType = typeof CATEGORY[number] | "no-category";

const Edit = () => {
  const router = useRouter();
  const [bookmark, setBookmark] = useState<BookmarkDetail>();

  useEffect(() => {
    if (!router.isReady) return;
    const id = Number(router.query.bookmarkId);
    (async () => {
      try {
        const {
          data: { url, title, memo, tags: tag, category, openType },
        } = await bookmarkAPI.getBookmarkDetail(id);
        setUrl(url);
        setTitle(title);
        setMemo(memo as string);
        setTag(tag as string[]);
        setCategory(category);
        setOpenType(openType);
      } catch (error) {
        console.log(error);
        router.push("/404");
      }
    })();
  }, [router.query, router.isReady, router]);

  const getTags = (elements: string[]) => {
    setTags(elements);
  };

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [category, setCategory] = useState<EditCategoryType>("no-category");
  const [tag, setTag] = useState<string[]>([]);
  const [openType, setOpenType] = useState<OpenType>();
  const [tags, setTags] = useState<string[]>();
  const [submit, setSubmit] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const handleChangeCategory = (elements: string) => {
    setCategory(elements as typeof CATEGORY[number]);
  };

  const getCategory = (element: string) => {
    setCategory(element as typeof CATEGORY[number]);
  };

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenType(event.target.value as OpenType);
  };

  const handleEdit = () => {
    setSubmit(true);
    if (title === "") {
      titleRef.current?.focus();
    }

    edit(Number(router.query.bookmarkId), {
      title,
      memo,
      category,
      tags: tag,
      openType: openType as OpenType,
    });
  };

  const edit = async (bookmarkId: number, payload: EditBookmarkPayload) => {
    try {
      await bookmarkAPI.editBookmark(bookmarkId, payload);
      Router.push(`/my/detail/${Number(router.query.bookmarkId)}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout>
      {" "}
      <PageLayout.Aside>
        <UserInfo />
        <MyFilterMenu
          getTagsData={getTags}
          getCategoryData={getCategory}
          tagList={tagList}
          categoryList={categoryList}
        />
      </PageLayout.Aside>
      <PageLayout.Article>
        <Contents>
          <DivWrapper>
            <PageName>북마크 수정</PageName>

            <StyledLabel>URL</StyledLabel>
            <StyledInput
              style={{ marginBottom: "40px" }}
              value={url}
              disabled
            />

            <StyledLabel>제목</StyledLabel>
            <StyledInput
              ref={titleRef}
              value={title}
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
            />
            {submit && title === "" ? (
              <StyledErrorText>* 제목은 필수 입력값입니다.</StyledErrorText>
            ) : (
              <StyledErrorText> </StyledErrorText>
            )}

            <StyledLabel>
              메모
              <OverLine>{memo.length}/200</OverLine>
            </StyledLabel>
            {memo.length > 199 ? (
              <>
                <Textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value.substring(0, 200))}
                  placeholder="텍스트를 입력하세요."
                  style={{
                    width: "470px",
                    height: "155px",
                    padding: "10px 16px",
                    fontSize: "16px",
                  }}
                />
                <ErrorText style={{ marginBottom: "40px", marginTop: "3px" }}>
                  * 200자 이내로 입력 가능합니다.
                </ErrorText>
              </>
            ) : (
              <Textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="텍스트를 입력하세요."
                style={{
                  width: "470px",
                  height: "155px",
                  padding: "10px 16px",
                  marginBottom: "40px",
                  fontSize: "16px",
                }}
              />
            )}

            <StyledLabel>카테고리</StyledLabel>
            <StyledSelect>
              <Select
                selectedOption={
                  category === "no-category"
                    ? undefined
                    : { value: category, text: category }
                }
                width="470px"
                onChange={handleChangeCategory}
              >
                <Select.Trigger>선택</Select.Trigger>
                <Select.OptionList style={{ zIndex: "10", width: "470px" }}>
                  <Select.Option value="자기계발">자기계발</Select.Option>
                  <Select.Option value="인문">인문</Select.Option>
                  <Select.Option value="정치">정치</Select.Option>
                  <Select.Option value="사회">사회</Select.Option>
                  <Select.Option value="예술">예술</Select.Option>
                  <Select.Option value="과학">과학</Select.Option>
                  <Select.Option value="기술">기술</Select.Option>
                  <Select.Option value="it">IT</Select.Option>
                  <Select.Option value="가정">가정</Select.Option>
                  <Select.Option value="건강">건강</Select.Option>
                  <Select.Option value="여행">여행</Select.Option>
                  <Select.Option value="요리">요리</Select.Option>
                </Select.OptionList>
              </Select>
            </StyledSelect>

            <StyledLabel>태그</StyledLabel>
            <Tag tag={tag} setTag={setTag} />

            <StyledLabel>공개 범위</StyledLabel>
            <RadioWrapper>
              <Contents>
                <OptionLabel>전체공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="all"
                  checked={openType === "all"}
                  onChange={radioHandler}
                />
              </Contents>
              <Contents>
                <OptionLabel>비공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="private"
                  checked={openType === "private"}
                  onChange={radioHandler}
                />
              </Contents>
              <Contents>
                <OptionLabel>일부공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="partial"
                  checked={openType === "partial"}
                  onChange={radioHandler}
                />
              </Contents>
            </RadioWrapper>

            <ButtonWrapper>
              <Button
                buttonType="large"
                colorType="main-color"
                width="194"
                style={{ margin: "120px auto" }}
                onClick={handleEdit}
              >
                수정 완료
              </Button>
              <Link href="/" passHref>
                <Button
                  buttonType="large"
                  colorType="gray"
                  width="194"
                  style={{ margin: "120px auto" }}
                >
                  취소
                </Button>
              </Link>
            </ButtonWrapper>
          </DivWrapper>
        </Contents>
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Edit;

const Contents = styled.div`
  display: flex;
`;

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const PageName = styled.div`
  color: ${color.$gray800};
  ${text.$headline5};
  margin-bottom: 40px;
`;

const StyledLabel = styled(Label)`
  display: flex;
  justify-content: space-between;
  margin: 0 0 5px 2px;
`;

const OverLine = styled.div`
  ${text.$overline}
  margin: auto 5px;
`;

const StyledErrorText = styled(ErrorText)`
  margin-top: 2px;
  margin-bottom: 40px;
`;

const StyledInput = styled(Input)`
  width: 470px;

  input::placeholder {
    font-size: 16px;
  }
`;

const StyledSelect = styled.div`
  margin-bottom: 40px;
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 470px;
  margin: 10px 0 0 2px;
`;

const StyledRadio = styled(Radio)`
  margin: auto 10px;
  padding: 3px;
`;

const OptionLabel = styled(Label)`
  margin: auto 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const data = {
  profileId: 1,
  imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
  favoriteCategories: ["it"],
  categories: ["it", "technology"],
  username: "joy",
  bio: "안녕하세요! 행복한 조이입니당.",
  followerCount: 12,
  followeeCount: 10,
};

const tagList = [
  {
    tag: "JAVA",
    count: 5,
  },
  {
    tag: "JAVASCRIPT",
    count: 5,
  },
  {
    tag: "PYTHON",
    count: 5,
  },
  {
    tag: "C++",
    count: 5,
  },
  {
    tag: "C",
    count: 5,
  },
  {
    tag: "C#",
    count: 5,
  },
  {
    tag: "RUBY",
    count: 5,
  },
  {
    tag: "GOLANG",
    count: 5,
  },
];

const categoryList = [
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

// const bookmark = {
//   id: 1,
//   title: "네이버 웹툰",
//   url: "https://comic.naver.com/index",
//   imageUrl: "imageUrl1",
//   category: "it",
//   memo: "memo",
//   openType: "partial",
//   isFavorite: false,
//   updatedAt: "2022-01-01",

//   tags: ["Spring", "React"],

//   reactionCount: {
//     like: 12,
//     hate: 10,
//   },

//   reaction: {
//     like: true,
//     hate: false,
//   },

//   profile: {
//     profileId: 1,
//     username: "crush",
//     imageUrl: "image_url",
//     isFollow: true,
//   },
// };
