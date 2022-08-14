import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { color, text } from "@/styles/theme";
import Tag from "@/components/create/tag";
import Link from "next/link";
import { useRouter } from "next/router";
import bookmarkAPI, { EditBookmarkPayload } from "@/utils/apis/bookmark";
import { CATEGORY, OpenType, TagType } from "@/types/type";
import { useProfileDispatch, useProfileState } from "@/hooks/useProfile";
import {
  UserInfo,
  MyFilterMenu,
  PageLayout,
  Input,
  Label,
  Textarea,
  Select,
  Radio,
  Button,
  ErrorText,
} from "@/components/common";

type EditCategoryType = typeof CATEGORY[number] | "no-category";

const Edit = () => {
  const userProfile = useProfileState();
  const router = useRouter();
  const dispatch = useProfileDispatch();
  const [priorTag, setPriorTag] = useState<string[]>();

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
        setPriorTag(tag);
        setCategory(category);
        setOpenType(openType);
        setSelectedOption({ value: category, text: category });
      } catch (error) {
        console.error(error);
        router.push("/404");
      }
    })();
  }, [router.query, router.isReady, router, dispatch]);

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [categoryType, setCategory] = useState<EditCategoryType>("no-category");
  const [tag, setTag] = useState<string[]>([]);
  const [openType, setOpenType] = useState<OpenType>();
  const [submit, setSubmit] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<{ value: string; text: string } | undefined>(undefined);

  const titleRef = useRef<HTMLInputElement>(null);

  const handleChangeCategory = (elements: string) => {
    setCategory(elements as EditCategoryType);
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
      category: categoryType,
      tags: tag,
      openType: openType as OpenType,
    });
  };

  const edit = async (bookmarkId: number, payload: EditBookmarkPayload) => {
    const copiedPayload: Partial<EditBookmarkPayload> = { ...payload };

    if (copiedPayload.category === "no-category") {
      delete copiedPayload.category;
    }
    try {
      await bookmarkAPI.editBookmark(
        bookmarkId,
        copiedPayload as EditBookmarkPayload
      );

      dispatch({
        type: "EDIT_BOOKMARK",
        newTags: tag,
        tags: priorTag || [],
        categories: payload.category,
      });

      router.replace(`/my/detail/${Number(router.query.bookmarkId)}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout>
      {" "}
      <PageLayout.Aside>
        <UserInfo data={userProfile} />
        <MyFilterMenu
          tagList={userProfile.tags}
          categoryList={userProfile.categories}
          getCategoryData={(category) => {
            router.push(`/my/category?category=${category}`);
          }}
          getTagsData={(tags) => {
            router.push(`/my/tag?tags=${tags[0]}`);
          }}
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
            {selectedOption && (
              <StyledSelect>
                <Select
                  selectedOption={
                    selectedOption.value === "no-category"
                      ? undefined
                      : selectedOption
                  }
                  width="470px"
                  onChange={handleChangeCategory}
                >
                  <Select.Trigger>선택</Select.Trigger>
                  <Select.OptionList style={{ zIndex: "10", width: "470px" }}>
                    {categoryList.map((index) =>
                      index === "no-category" ? (
                        <Select.Option value={index}>
                          -- 카테고리 없음 --
                        </Select.Option>
                      ) : (
                        <Select.Option value={index}>{index}</Select.Option>
                      )
                    )}
                  </Select.OptionList>
                </Select>
              </StyledSelect>
            )}

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

const categoryList = [
  "no-category",
  "자기계발",
  "인문",
  "정치",
  "사회",
  "예술",
  "과학",
  "기술",
  "IT",
  "가정",
  "건강",
  "여행",
  "요리",
];
