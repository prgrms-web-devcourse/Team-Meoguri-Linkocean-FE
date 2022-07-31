import { useState } from "react";
import FilterBorder from "./filterBorder";
import FilterHeader from "./filterHeader";
import FilterElement from "./filterElement";

interface FeedFilterMenuProps {
  getCategoryData: (arr: string) => void;
}

const FeedFilterMenu = ({ getCategoryData }: FeedFilterMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  //   const [selectedElement, setSelectedElement] = useState<string>("");
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
  const handleCategoryClick = (element: string) => {
    setSelectedCategory(element);
    getCategoryData(element);
  };

  //   const getCategory = (element: string) => {
  //     setSelectedCategory(element);
  //     getCategoryData(element);
  //   };
  return (
    <FilterBorder>
      <FilterHeader src="/icon/folder.svg" alt="category" arrow={false}>
        카테고리
      </FilterHeader>
      {categoryList
        ? categoryList.map((element) =>
            element === selectedCategory ? (
              <FilterElement
                title={element}
                key={element}
                type="category"
                disabled={false}
                onClick={() => handleCategoryClick(element)}
                isSelected
              />
            ) : (
              <FilterElement
                title={element}
                key={element}
                type="category"
                disabled={false}
                onClick={() => handleCategoryClick(element)}
                isSelected={false}
              />
            )
          )
        : null}
    </FilterBorder>
  );
};

export default FeedFilterMenu;
