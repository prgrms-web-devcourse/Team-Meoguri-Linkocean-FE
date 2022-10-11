import {
  Button,
  ErrorText,
  Input,
  Label,
  Meta,
  PageLayout,
  Textarea,
} from "@/components/common";
import React, { useEffect, useState } from "react";
import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { usernameRegExp } from "@/utils/validation";
import profileAPI from "@/utils/apis/profile";
import { useProfileDispatch, useProfileState } from "@/hooks/useProfile";
import { CATEGORY } from "@/types/type";
import SelectCategoryModal from "@/components/myEdit/selectCategoryModal";
import ImageUploader from "@/components/myEdit/imageUploader";

const Edit = () => {
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [bioErrorMsg, setBioErrorMsg] = useState("");
  const [file, setFile] = useState<File | string>("");
  const [categories, setCategories] = useState<typeof CATEGORY[number][]>([]);
  const [input, setInput] = useState({
    userName: "",
    bio: "",
  });
  const router = useRouter();
  const { bio, username, favoriteCategories, imageUrl } = useProfileState();
  const dispatch = useProfileDispatch();

  const edit = () => {
    if (bioErrorMsg || userNameErrorMsg) return;
    submit();
  };

  useEffect(() => {
    setCategories(favoriteCategories);
    if (imageUrl) {
      setFile(imageUrl);
    }
    setInput({
      userName: username,
      bio: bio || "",
    });
  }, [favoriteCategories, imageUrl, bio, username]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    validate(value, name);
  };

  const validate = (value: string, name: string) => {
    switch (name) {
      case "userName":
        if (!usernameRegExp.test(value)) {
          setUserNameErrorMsg(
            "* 유저 네임은 2-6자의 한글, 영어, 숫자만 사용 가능합니다."
          );
        } else {
          setUserNameErrorMsg("");
        }
        break;
      case "bio":
        if (value.length > 200) {
          setBioErrorMsg("* 200글자 이하로 작성해주세요");
        } else {
          setBioErrorMsg("");
        }
        break;
      default:
        break;
    }
  };

  const submit = async () => {
    if (!categories) {
      console.error("categories 값이 비어있습니다.");
      return;
    }

    try {
      const editData = new FormData();
      editData.append("username", input.userName);
      editData.append("categories", categories.join(","));
      editData.append("bio", input.bio);
      if (file) {
        editData.append("image", file);
      }
      await profileAPI.editProfile(editData);

      dispatch({
        type: "EDIT_PROFILES",
        profile: {
          bio: input.bio,
          username: input.userName,
          imageUrl: typeof file === "string" ? file : URL.createObjectURL(file),
          favoriteCategories: categories,
        },
      });

      alert("내 프로필 수정이 완료되었습니다.");
      router.back();
    } catch (e) {
      setUserNameErrorMsg("* 유저네임이 중복되었습니다.");
      console.error(e);
    }
  };
  return (
    <>
      <Meta
        title="프로필 수정"
        description="프로필 수정"
        robots="noindex, nofollow"
        titleWithoutSuffix
      />
      <PageLayout>
        <PageLayout.Article>
          <Page>
            <ImageUploader file={file} setFile={setFile} />
            <InputBox>
              <Label>유저 네임</Label>
              <Input
                onChange={onChange}
                width="100%"
                name="userName"
                placeholder="유저네임을 입력하세요"
                defaultValue={username}
              />
              {userNameErrorMsg ? (
                <ErrorText style={{ height: "14px" }}>
                  {userNameErrorMsg}
                </ErrorText>
              ) : (
                <div style={{ height: "16px" }} />
              )}
            </InputBox>
            <InputBox>
              <Label>선호 카테고리</Label>
            </InputBox>
            <SelectCategoryModal
              categories={categories}
              setCategories={setCategories}
            />
            {categories?.map((category) => (
              <CategoryTag key={category}>{category}</CategoryTag>
            ))}
            <InputBox>
              <Label>자기 소개</Label>
              <Textarea
                onChange={onChange}
                name="bio"
                defaultValue={bio}
                width="100%"
                placeholder="텍스트를 입력해주세요"
              />
              {bioErrorMsg ? (
                <ErrorText style={{ height: "14px" }}>{bioErrorMsg}</ErrorText>
              ) : (
                <div style={{ height: "16px" }} />
              )}
            </InputBox>
            <ButtonBox>
              <Button
                onClick={edit}
                width="170"
                colorType="main-color"
                buttonType="large"
              >
                수정 완료
              </Button>
              <Button
                onClick={() => router.back()}
                width="170"
                colorType="gray"
                buttonType="large"
              >
                취소
              </Button>
            </ButtonBox>
          </Page>
        </PageLayout.Article>
      </PageLayout>
    </>
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
  margin-top: 40px;
  input {
    ${text.$body1}
  }
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

export default Edit;
