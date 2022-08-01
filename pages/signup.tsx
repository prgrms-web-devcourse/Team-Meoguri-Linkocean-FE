import Button from "@/components/common/button";
import CategoryItem from "@/components/common/categoryItem";
import ErrorText from "@/components/common/errorText";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import { CATEGORY } from "@/types/type";
import styled from "@emotion/styled";
import Link from "next/link";
import { ChangeEventHandler, FormEvent, useCallback, useState } from "react";
import { usernameRegExp } from "@/utils/validation";

type ChangeInputHandler = ChangeEventHandler<HTMLInputElement>;
type CategoryType = typeof CATEGORY[number];
type UserCategory = {
  value: CategoryType[];
  errorText: string;
};

const SignUp = () => {
  const [userCategory, setUserCategory] = useState<UserCategory>({
    value: [],
    errorText: "1개 이상 선택해주세요.",
  });
  const getNextUserCategoryValue = useCallback(
    (selectedCategory: CategoryType) => {
      const hasSelectedCategory = userCategory.value.includes(selectedCategory);

      return hasSelectedCategory
        ? userCategory.value.filter((category) => category !== selectedCategory)
        : [...userCategory.value, selectedCategory];
    },
    [userCategory.value]
  );
  const handleCategoryClick: ChangeInputHandler = (e) => {
    const selectedCategory = e.target.name as CategoryType;
    const nextValue = getNextUserCategoryValue(selectedCategory);
    setUserCategory({
      value: nextValue,
      errorText: nextValue.length > 0 ? "" : "1개 이상 선택해주세요.",
    });
  };

  const [username, setUsername] = useState({ value: "", errorText: "" });
  const handleUsernameChange: ChangeInputHandler = (e) => {
    const nextValue = e.target.value;
    setUsername({
      value: nextValue,
      errorText: usernameRegExp.test(nextValue)
        ? ""
        : "유저 네임은 2-6자의 한글, 영어, 숫자만 사용 가능합니다.",
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO: API 연결 및 유저 네임 중복 에러 메시지 설정
    alert(
      `submit\n선호 카테고리: ${userCategory.value.join(" ")}\n유저 네임: ${
        username.value
      }`
    );
  };

  return (
    <Layout>
      <h1>
        <Link href="/" passHref>
          <a>
            <img
              src="/icon/logo.svg"
              alt="Link Ocean"
              width={357}
              height={57}
            />
          </a>
        </Link>
      </h1>

      <Form onSubmit={handleSubmit}>
        <CategorySection>
          <Label style={{ marginBottom: "22px" }}>선호 카테고리 선택</Label>
          <CategoryContainer>
            {CATEGORY.map((category) => (
              <CategoryItem
                name={category}
                onChange={handleCategoryClick}
                key={category}
              />
            ))}
          </CategoryContainer>
          <ErrorText style={{ height: "14px" }}>
            {userCategory.errorText}
          </ErrorText>
        </CategorySection>

        <UsernameSection>
          <Label style={{ marginBottom: "6px" }}>유저 네임</Label>
          <Input
            type="text"
            value={username.value}
            onChange={handleUsernameChange}
          />

          <ErrorText style={{ marginTop: "5px", height: "14px" }}>
            {username.errorText}
          </ErrorText>
        </UsernameSection>

        <Button
          type="submit"
          buttonType="small"
          colorType="main-color"
          width="175"
          style={{ margin: "63px auto 0" }}
          disabled={
            userCategory.errorText !== "" ||
            username.errorText !== "" ||
            username.value === ""
          }
        >
          회원 가입
        </Button>
      </Form>

      <Test>선택된 선호 카테고리: {userCategory.value.join(" ")}</Test>
      <Test>유저 네임: {username.value}</Test>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8vw auto;
  width: 790px;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 102px 0 75px;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 11px;
`;

const UsernameSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Test = styled.div``;

export default SignUp;
