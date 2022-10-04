import { color, text } from "@/styles/theme";
import { CATEGORY } from "@/types/type";
import { CATEGORY_MAP } from "@/utils/constants";
import styled from "@emotion/styled";
import React from "react";

export interface CategoryTagProps {
  name: typeof CATEGORY[number];
}

const CategoryTag = ({ name }: CategoryTagProps) => {
  return (
    <Tag>
      <img
        src={`/icon/category/${CATEGORY_MAP[name].fileName}-selected.svg`}
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

export default CategoryTag;
