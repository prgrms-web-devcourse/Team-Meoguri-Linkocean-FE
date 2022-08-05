import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import { useState } from "react";
import Button from "../common/button";
import Input from "../common/input";
import Label from "../common/label";
import ProfileImage from "../common/profileImage";
import Select from "../common/select";
import Textarea from "../common/textarea";
// import SelectCategoryModal from "./selectCategoryModal";
// import ImageUploader from "./imageUploader";

const EditPage = () => {
  const [file, setFile] = useState<File>();
  const [categories, setCategories] = useState(["IT"]);

  return (
    <Page>
      {/* <ImageUploader file={file} setFile={setFile} /> */}
      <InputBox>
        <Label>유저 네임</Label>
        <Input width="100%" placeholder="유저네임을 입력하세요" />
      </InputBox>
      <InputBox>
        <Label>선호 카테고리</Label>
        {/* <SelectCategoryModal
        categories={categories}
        setCategories={setCategories}
      />
      {categories.map((category) => (
        <CategoryTag>{category}</CategoryTag>
      ))} */}
      </InputBox>
      <InputBox>
        <Label>자기 소개</Label>
        <Textarea width="100%" placeholder="텍스트를 입력해주세요" />
      </InputBox>
      <InputBox>
        <Label>오래된 북마크 기간</Label>
        <Select width="470px">
          <Select.Trigger>선택</Select.Trigger>
          <Select.OptionList>
            <Select.Option value="1">1개월</Select.Option>
          </Select.OptionList>
        </Select>
      </InputBox>
      <ButtonBox>
        <Button width="170" colorType="main-color" buttonType="large">
          수정 완료
        </Button>
        <Button width="170" colorType="gray" buttonType="large">
          취소
        </Button>
      </ButtonBox>
    </Page>
  );
};

const Page = styled.div`
  width: 470px;
  margin: auto;
`;
const CategoryTag = styled.span`
  display: inline-block;
  background-color: ${color.$gray100};
  padding: 6px 20px;
  margin-top: 12px;
  border-radius: 26px;
  margin-right: 8px;
  ${text.$caption}
`;

const InputBox = styled.div`
  margin-top: 44px;
  label {
    display: block;
    margin-bottom: 6px;
    margin-left: 4px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 117px;
  gap: 10px;
`;

export default EditPage;
