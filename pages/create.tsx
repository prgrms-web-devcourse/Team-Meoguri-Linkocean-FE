import styled from "@emotion/styled";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import PageLayout from "@/components/common/pageLayout/index";
<<<<<<< HEAD
import { useState } from "react";
=======
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import Textarea from "@/components/common/textarea";
import Select from "@/components/common/select";
import Radio from "@/components/common/radio";
import Button from "@/components/common/button";
import { useRef, useState } from "react";
import { color, text } from "@/styles/theme";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2015ca1 ([#63] handleCreate 추가)
=======
// import Tag from "@/components/create/tag";
>>>>>>> 4a70a32 ([#63] refactor: tag 컴포넌트 브랜치 이동)
=======
import Tag from "@/components/create/tag";
>>>>>>> c8b8274 ([#63] style: tag 스타일 개선)

const Create = () => {
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState([]);
  const [tags, setTags] = useState<string[]>();
<<<<<<< HEAD
  const [category, setCategory] = useState<string>();
=======
  const [category, setCategory] = useState("");
  const [openType, setOpenType] = useState<string>();
  const [bio, setBio] = useState("");

  const urlRef = useRef<HTMLInputElement>(null);

>>>>>>> 2015ca1 ([#63] handleCreate 추가)
  const getTags = (elements: string[]) => {
    setTags(elements);
  };
  const getCategory = (element: string) => {
    setCategory(element);
  };

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenType(event.target.value);
  };

  const handleCreate = () => {
    if (url === "") {
      alert("url을 입력해주세요");
      urlRef.current?.focus();
    } else if (category === "") {
      alert("카테고리를 선택해주세요");
    } else if (openType === undefined) {
      alert("공개 범위를 선택해주세요");
    }
  };

  return (
    <PageLayout>
      {" "}
      <PageLayout.Aside>
        <UserInfo data={data} />
        <MyFilterMenu
          getTagsData={getTags}
          getCatagoryData={getCategory}
          tagList={tagList}
          categoryList={categoryList}
        />
      </PageLayout.Aside>
      <PageLayout.Article>
<<<<<<< HEAD
        <Contents>북마크 추가</Contents>
=======
        <Contents>
          <DivWrapper>
            <PageName>북마크 추가</PageName>

            <StyledLabel>URL</StyledLabel>
            {/* URL 중복 확인 요청, 링크메타데이터 요청 */}
            <StyledInput
              ref={urlRef}
              placeholder="URL을 입력하세요."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <StyledLabel>제목</StyledLabel>
            <StyledInput placeholder="제목을 입력하세요." />

            <StyledLabel>
              BIO
              <OverLine>{bio.length}/200</OverLine>
            </StyledLabel>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="텍스트를 입력하세요."
              style={{
                width: "470px",
                height: "155px",
                padding: "10px 20px",
                marginBottom: "40px",
                fontSize: "16px",
              }}
            />

            <StyledLabel>카테고리</StyledLabel>
            {category && <h2>{category}</h2>}
            <StyledSelect>
              <Select width="470px" onChange={setCategory}>
                <Select.Trigger>선택</Select.Trigger>
                <Select.OptionList>
                  <Select.Option value="self-development">
                    자기계발
                  </Select.Option>
                  <Select.Option value="humanities">인문</Select.Option>
                  <Select.Option value="politics">정치</Select.Option>
                  <Select.Option value="social">사회</Select.Option>
                  <Select.Option value="art">예술</Select.Option>
                  <Select.Option value="science">과학</Select.Option>
                  <Select.Option value="technology">기술</Select.Option>
                  <Select.Option value="it">IT</Select.Option>
                  <Select.Option value="home">가정</Select.Option>
                  <Select.Option value="health">건강</Select.Option>
                  <Select.Option value="travel">여행</Select.Option>
                  <Select.Option value="cooking">요리</Select.Option>
                </Select.OptionList>
              </Select>
            </StyledSelect>

            <StyledLabel>태그</StyledLabel>
            {/* <StyledInput placeholder="태그를 입력하세요." /> */}
            <Tag tag={tag} setTag={setTag} />

            <StyledLabel>공개 범위</StyledLabel>
            {openType && <h2>{openType}</h2>}
            <RadioWrapper>
              <Contents>
                <OptionLabel>전체공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="all"
                  onChange={radioHandler}
                />
              </Contents>
              <Contents>
                <OptionLabel>비공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="private"
                  onChange={radioHandler}
                />
              </Contents>
              <Contents>
                <OptionLabel>일부공개</OptionLabel>
                <StyledRadio
                  name="openType"
                  value="partial"
                  onChange={radioHandler}
                />
              </Contents>
            </RadioWrapper>

            <ButtonWrapper>
              {/* 북마크 등록 */}
              <Button
                buttonType="large"
                colorType="main-color"
                width="194"
                style={{ margin: "120px auto" }}
                onClick={handleCreate}
              >
                작성완료
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
>>>>>>> 7db69eb ([#63] feat: radio 버튼 임시 처방)
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Create;

const Contents = styled.div`
<<<<<<< HEAD
  /* border: 1px solid black; */
=======
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
>>>>>>> 7db69eb ([#63] feat: radio 버튼 임시 처방)
`;

const data = {
  profileId: 1,
  imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
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
