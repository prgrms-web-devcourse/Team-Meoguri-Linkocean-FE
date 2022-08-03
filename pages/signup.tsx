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
import Head from "next/head";
import * as theme from "@/styles/theme";
import axios from "axios";
import { useRouter } from "next/router";

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
  const [username, setUsername] = useState({ value: "", errorText: "" });

  const router = useRouter();

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

    // TODO: 유저 네임 중복 에러 메시지 설정
    // API 요청 테스트 필요
    // signup({ username: username.value, category: userCategory.value });
  };

  const signup = async (body: {
    username: string;
    category: CategoryType[];
  }) => {
    try {
      await axios.post(`${process.env.END_POINT}/api/v1/profiles`, body);
      router.push("/my/favorite");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>LinkOcean | 회원가입</title>
      </Head>
      <Layout>
        <h1>
          <img src="/icon/logo.svg" alt="Link Ocean" width={357} height={57} />
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

          <StyledButton
            type="submit"
            buttonType="small"
            colorType="main-color"
            width="175"
            style={{ margin: "63px auto 0" }}
            disabled={
              // TODO:닉네임 중복일 때 조건 추가 필요
              userCategory.errorText !== "" ||
              username.errorText !== "" ||
              username.value === ""
            }
          >
            회원 가입
          </StyledButton>

          <Link href="/" passHref>
            <LinkText>이미 다른 계정이 있나요? 로그인하러 가기</LinkText>
          </Link>
        </Form>
      </Layout>
    </>
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

const StyledButton = styled(Button)`
  &:disabled {
    background-color: ${theme.color.$mainColor};
    cursor: not-allowed;
  }
`;

const LinkText = styled.a`
  display: block;
  margin: 9px auto 0;
  color: ${theme.color.$gray600};
  ${theme.text.$caption};
`;

export default SignUp;
