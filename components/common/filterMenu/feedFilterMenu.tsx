import { useState } from "react";
import FilterBorder from "./filterBorder";
import FilterHeader from "./filterHeader";
import FilterFolder from "./filterFolder";
import FilterElement from "./filterElement";

interface FeedFilterMenuProps {
  getData: (arr: string) => void;
}

const FeedFilterMenu = ({ getData }: FeedFilterMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const categoryList = [
    "자기계발",
    "인문",
    "정치",
    "사회",
    "예술",
    "과학",
    "기술",
    "IT",
    "가정",
    "건강",
    "여행",
    "요리",
  ];
  const getCategory = (element: string) => {
    setSelectedCategory(element);
    getData(element);
  };
  return (
    <FilterBorder>
      <FilterHeader src="/icon/folder.svg" alt="category" arrow={false}>
        카테고리
      </FilterHeader>
      {categoryList
        ? categoryList.map((element) => (
            <FilterElement
              title={element}
              type="category"
              disabled={false}
              isSelected
            />
          ))
        : null}
    </FilterBorder>
  );
};

export default FeedFilterMenu;
