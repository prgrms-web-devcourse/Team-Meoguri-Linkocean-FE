import Button from "@/components/common/button";
import CategoryItem from "@/components/common/categoryItem";
import ErrorText from "@/components/common/errorText";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import { CATEGORY } from "@/types/type";
import styled from "@emotion/styled";

const SignUp = () => {
  return (
    <Layout>
      <img src="/icon/logo.svg" alt="Link Ocean" width={357} height={57} />

      <CategoryForm>
        <Label style={{ marginBottom: "22px" }}>선호 카테고리 선택</Label>
        <CategoryContainer>
          {CATEGORY.map((category) => (
            <CategoryItem name={category} />
          ))}
        </CategoryContainer>
        <ErrorText>1개 이상 선택해주세요.</ErrorText>
      </CategoryForm>

      <UsernameForm>
        <Label style={{ marginBottom: "6px" }}>유저 네임</Label>
        <Input type="text" />
        <ErrorText style={{ marginTop: "5px" }}>
          해당 유저 네임이 존재합니다.
        </ErrorText>
      </UsernameForm>

      <Button
        buttonType="small"
        colorType="main-color"
        width="175"
        style={{ margin: "63px auto 0" }}
      >
        회원 가입
      </Button>
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

const CategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 102px 0 75px;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 790px;
  margin-bottom: 11px;
`;

const UsernameForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 790px;
`;

export default SignUp;
