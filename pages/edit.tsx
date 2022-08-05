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
import { useState } from "react";
import { color, text } from "@/styles/theme";
import Tag from "@/components/create/tag";

const Edit = () => {
  const INIT_OPTION = { value: bookmark.category, text: bookmark.category };

  const [category, setCategory] = useState(INIT_OPTION.value);
  const [tag, setTag] = useState<string[]>(bookmark.tags);
  const [tags, setTags] = useState<string[]>();
  const [title, setTitle] = useState<string>(bookmark.title);
  const [openType, setOpenType] = useState<string>();
  const [memo, setMemo] = useState(bookmark.memo);

  const getTags = (elements: string[]) => {
    setTags(elements);
  };
  const getCategory = (element: string) => {
    setCategory(element);
  };

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenType(event.target.value);
  };

  const handleEdit = () => {
    if (category === "") {
      alert("카테고리를 선택해주세요");
    } else if (openType === undefined) {
      alert("공개 범위를 선택해주세요");
    }
  };

  const item = [];
  item.push(tag);
  console.log(item);

  return (
    <PageLayout>
      {" "}
      <PageLayout.Aside>
        <UserInfo data={data} />
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

            <StyledLabel>* URL</StyledLabel>
            <StyledInput value={bookmark.url} disabled />

            <StyledLabel>제목</StyledLabel>
            <StyledInput
              value={title}
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
            />

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
                  ❗️ 200자 이내로 입력 가능합니다.
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

            <StyledLabel>* 카테고리</StyledLabel>
            <StyledSelect>
              <Select
                selectedOption={INIT_OPTION}
                width="470px"
                onChange={setCategory}
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
                  <Select.Option value="it">it</Select.Option>
                  <Select.Option value="가정">가정</Select.Option>
                  <Select.Option value="건강">건강</Select.Option>
                  <Select.Option value="여행">여행</Select.Option>
                  <Select.Option value="요리">요리</Select.Option>
                </Select.OptionList>
              </Select>
            </StyledSelect>

            <StyledLabel>태그</StyledLabel>
            <Tag tag={tag} setTag={setTag} />

            <StyledLabel>* 공개 범위</StyledLabel>
            <RadioWrapper>
              <Contents>
                <OptionLabel>전체공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="all"
                  onChange={radioHandler}
                  checked={bookmark.openType === "all"}
                />
              </Contents>
              <Contents>
                <OptionLabel>비공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="private"
                  onChange={radioHandler}
                  checked={bookmark.openType === "private"}
                />
              </Contents>
              <Contents>
                <OptionLabel>일부공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="partial"
                  onChange={radioHandler}
                  checked={bookmark.openType === "partial"}
                />
              </Contents>
            </RadioWrapper>

            <ButtonWrapper>
              {/* 북마크 수정 */}
              <Button
                buttonType="large"
                colorType="main-color"
                width="194"
                style={{ margin: "120px auto" }}
                onClick={handleEdit}
              >
                수정 완료
              </Button>
              <Button
                buttonType="large"
                colorType="gray"
                width="194"
                style={{ margin: "120px auto" }}
              >
                취소
              </Button>
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

const StyledInput = styled(Input)`
  width: 470px;
  margin-bottom: 40px;

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

const bookmark = {
  id: 1,
  title: "네이버 웹툰",
  url: "https://comic.naver.com/index",
  imageUrl: "imageUrl1",
  category: "it",
  memo: "memo",
  openType: "partial",
  isFavorite: false,
  updatedAt: "2022-01-01",

  tags: ["Spring", "React"],

  reactionCount: {
    like: 12,
    hate: 10,
  },

  reaction: {
    like: true,
    hate: false,
  },

  profile: {
    profileId: 1,
    username: "crush",
    imageUrl: "image_url",
    isFollow: true,
  },
};
