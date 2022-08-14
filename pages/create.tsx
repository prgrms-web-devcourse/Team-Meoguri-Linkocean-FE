import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import Tag from "@/components/create/tag";
import { useRouter } from "next/router";
import { color, text } from "@/styles/theme";
import bookmarkAPI, { CreateBookmarkPayload } from "@/utils/apis/bookmark";
import { CATEGORY, OpenType } from "@/types/type";
import { useProfileDispatch, useProfileState } from "@/hooks/useProfile";
import Link from "next/link";
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
  Meta,
} from "@/components/common";

type EditCategoryType = typeof CATEGORY[number] | "no-category";

const Create = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState<string[]>([]);
  const [categoryType, setCategoryType] = useState<EditCategoryType>();
  const [openType, setOpenType] = useState<OpenType>("all");
  const [memo, setMemo] = useState("");
  const [submit, setSubmit] = useState(false);
  const [result, setResult] = useState(false);

  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const userProfile = useProfileState();
  const router = useRouter();
  const dispatch = useProfileDispatch();

  const handleChangeCategory = (elements: string) => {
    if (elements === "no-category") {
      setCategoryType(undefined);
    } else {
      setCategoryType(elements as EditCategoryType);
    }
  };

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenType(event.target.value as OpenType);
  };

  const handleCreate = () => {
    setSubmit(true);
    if (url === "") {
      urlRef.current?.focus();
    } else if (title === "") {
      titleRef.current?.focus();
    }

    create({
      title,
      url,
      memo,
      category: categoryType as EditCategoryType,
      tags: tag,
      openType,
    });
  };

  const handleBlur = async () => {
    const IsDuplicateUrl = await bookmarkAPI.getIsDuplicateUrl(url);
    setResult(false);
    if (IsDuplicateUrl.data.isDuplicateUrl === true) {
      if (
        window.confirm(
          "이미 등록된 url입니다. \n해당 url로 작성된 북마크로 이동하시겠습니까?"
        )
      ) {
        const location = IsDuplicateUrl.headers.location.split("/");
        router.push(`/my/detail/${location[3]}`);
      } else {
        setResult(true);
        return;
      }
    }

    const response = await bookmarkAPI.getLinkMetadata(url);

    setTitle(response.data.title);
  };

  const create = async (payload: CreateBookmarkPayload) => {
    try {
      const response = await bookmarkAPI.createBookmark(payload);

      dispatch({
        type: "CREATE_BOOKMARK",
        tags: tag,
        categories: payload.category,
      });

      router.replace(`/my/detail/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const AsideMemo = React.useMemo(
    () => (
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
    ),
    [userProfile, router]
  );

  return (
    <>
      <Meta
        title="북마크 추가"
        description="북마크 추가"
        robots="noindex, nofollow"
      />
      <PageLayout>
        {AsideMemo}
        <PageLayout.Article>
          <Contents>
            <DivWrapper>
              <PageName>북마크 추가</PageName>

              <StyledLabel>URL</StyledLabel>
              <StyledInput
                ref={urlRef}
                placeholder="URL을 입력하세요."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={handleBlur}
              />
              {submit && url === "" && (
                <ErrorText>* url은 필수 입력값입니다.</ErrorText>
              )}
              {result && (
                <ErrorText>* 중복된 url은 등록할 수 없습니다.</ErrorText>
              )}
              <div style={{ marginBottom: "40px" }} />

              <StyledLabel>제목</StyledLabel>
              <StyledInput
                ref={titleRef}
                placeholder="제목을 입력하세요."
                value={title}
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
                  <ErrorText>* 200자 이내로 입력 가능합니다.</ErrorText>
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
                    marginBottom: "60px",
                    fontSize: "16px",
                  }}
                />
              )}

              <StyledLabel>카테고리</StyledLabel>
              <div style={{ marginBottom: "40px" }}>
                <Select width="470px" onChange={handleChangeCategory}>
                  <Select.Trigger>선택</Select.Trigger>
                  <Select.OptionList style={{ zIndex: "10", width: "470px" }}>
                    {categoryList.map((index) =>
                      index === "-- 카테고리 없음 --" ? (
                        <Select.Option value="no-category">
                          -- 카테고리 없음 --
                        </Select.Option>
                      ) : (
                        <Select.Option value={index}>{index}</Select.Option>
                      )
                    )}
                    {/* {categoryList.map((index) => (
                      <Select.Option value={index}>{index}</Select.Option>
                    ))} */}
                  </Select.OptionList>
                </Select>
              </div>

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
              {submit && openType === undefined ? (
                <StyledErrorText>
                  * 공개범위는 필수 선택값입니다.
                </StyledErrorText>
              ) : (
                <StyledErrorText> </StyledErrorText>
              )}

              <ButtonWrapper>
                <Button
                  buttonType="large"
                  colorType="main-color"
                  width="194"
                  style={{ margin: "60px auto" }}
                  onClick={handleCreate}
                >
                  작성 완료
                </Button>
                <Link href="/" passHref>
                  <Button
                    buttonType="large"
                    colorType="gray"
                    width="194"
                    style={{ margin: "60px auto" }}
                  >
                    취소
                  </Button>
                </Link>
              </ButtonWrapper>
            </DivWrapper>
          </Contents>
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Create;

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

const StyledInput = styled(Input)`
  width: 470px;

  input::placeholder {
    font-size: 16px;
  }
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

const OptionLabel = styled.div`
  margin: auto 0;
  ${text.$body1};
  color: ${color.$gray600};
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const StyledErrorText = styled(ErrorText)`
  margin-top: 2px;
  margin-bottom: 40px;
`;

const categoryList = [
  "-- 카테고리 없음 --",
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
