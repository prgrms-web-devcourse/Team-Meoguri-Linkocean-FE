import { color, text } from "@/styles/theme";
import { CATEGORY } from "@/types/type";
import styled from "@emotion/styled";
import React from "react";

export interface CategoryTagProps {
  name: typeof CATEGORY[number];
}

const CategoryTag = ({ name }: CategoryTagProps) => {
  return (
    <Tag>
      <img
        src={`/icon/category/${CATEGORY_MAP[name]}-selected.svg`}
        alt={name}
      />
      <span>{name}</span>
    </Tag>
  );
};

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${color.$gray400};
  border-radius: 8px;
  padding: 2px 10px 2px 4px;
  width: 83px;
  box-sizing: border-box;
  img {
    width: 24px;
  }
  span {
    flex-grow: 1;
    text-align: center;
    ${text.$caption}
    font-weight: bold;
  }
`;

const CATEGORY_MAP = {
  자기계발: "self-development",
  인문: "humanities",
  정치: "politics",
  사회: "social",
  예술: "art",
  과학: "science",
  기술: "technology",
  IT: "it",
  가정: "home",
  건강: "health",
  여행: "travel",
  요리: "cooking",
};

export default CategoryTag;
