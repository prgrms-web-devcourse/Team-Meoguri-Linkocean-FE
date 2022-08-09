import { color, text } from "@/styles/theme";
import { CATEGORY } from "@/types/type";
import styled from "@emotion/styled";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import Button from "../common/button";
import CategoryItem from "../common/categoryItem";
import ErrorText from "../common/errorText";
import Modal from "../common/modal";

type ChangeInputHandler = ChangeEventHandler<HTMLInputElement>;

const SelectCategoryModal = ({
  setCategories,
  categories,
}: {
  categories: string[];
  setCategories: (categories: string[]) => void;
}) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [favoriteCategories, setFavoriteCategories] =
    useState<string[]>(categories);

  const handleCategoryClick: ChangeInputHandler = (e) => {
    if (favoriteCategories.includes(e.target.name)) {
      const filtered = favoriteCategories.filter(
        (category) => category !== e.target.name
      );
      setFavoriteCategories(filtered);
      return;
    }
    setFavoriteCategories([...favoriteCategories, e.target.name]);
  };

  const submitCategories = () => {
    if (favoriteCategories.length < 1) {
      return;
    }
    setCategories(favoriteCategories);
    setIsShowModal(false);
  };

  const cancel = () => {
    setFavoriteCategories(categories);
    setIsShowModal(false);
  };

  useEffect(() => {
    setFavoriteCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (typeof window !== "object") return;
    const body = document.getElementsByTagName("body")[0];
    if (isShowModal) {
      body.classList.add("scrollLock");
    } else {
      body.classList.remove("scrollLock");
    }
  }, [isShowModal]);

  return (
    <div>
      <Button
        onClick={() => {
          setIsShowModal(true);
        }}
        width="120"
        buttonType="small"
        colorType="skyblue"
      >
        카테고리 선택
      </Button>
      {isShowModal ? (
        <Modal
          isShow={isShowModal}
          setIsShow={setIsShowModal}
          width={936}
          height={495}
          closed={cancel}
        >
          <div>
            <CategorySection>
              <Title>선호 카테고리 선택</Title>
              <CategoryContainer>
                {CATEGORY.map((category) => (
                  <CategoryItem
                    name={category}
                    onChange={handleCategoryClick}
                    on={favoriteCategories.includes(category)}
                    key={category}
                  />
                ))}
              </CategoryContainer>
              {favoriteCategories.length < 1 ? (
                <ErrorText style={{ height: "14px" }}>
                  1개 이상 선택해 주세요
                </ErrorText>
              ) : (
                <ErrorText style={{ height: "14px" }} />
              )}
            </CategorySection>
            <ButtonBox>
              <Button
                onClick={submitCategories}
                width="166"
                buttonType="large"
                colorType="main-color"
              >
                선택 완료
              </Button>
              <Button
                width="166"
                buttonType="large"
                colorType="gray"
                onClick={cancel}
              >
                선택 취소
              </Button>
            </ButtonBox>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  width: 780px;
  margin: auto;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 26px;
  margin-bottom: 11px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 50px;
`;

const Title = styled.h3`
  margin-bottom: 40px;
  color: ${color.$gray800};
  text-align: center;
  ${text.$headline5}
`;

export default SelectCategoryModal;
