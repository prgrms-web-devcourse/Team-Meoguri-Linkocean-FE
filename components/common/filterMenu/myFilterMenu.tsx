import { color } from "@/styles/theme";
import styled from "@emotion/styled";
import { useState } from "react";
import FilterBorder from "./filterBorder";
import FilterFolder from "./filterFolder";
import FilterHeader from "./filterHeader";

export interface MyFilterMenuProps {
  tagList?: { name: string; count: number }[];
  categoryList?: string[];
  getTagsData: (arr: string[]) => void;
  getCatagoryData: (arr: string) => void;
}

const MyFilterMenu = ({
  tagList,
  categoryList,
  getTagsData,
  getCatagoryData,
}: MyFilterMenuProps) => {
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  const [isTagListOpen, setIsTagListOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const selectLike = () => {
    setFavoriteSelected(true);
    setIsCategoryListOpen(false);
    setIsTagListOpen(false);
  };
  const openTagFolder = () => {
    setIsTagListOpen(!isTagListOpen);
    setIsCategoryListOpen(false);
    setFavoriteSelected(false);
  };
  const openCategoryFolder = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
    setIsTagListOpen(false);
    setFavoriteSelected(false);
  };
  const checkbox = Array.from(document.getElementsByTagName("input"));

  const handleClick = () => {
    const checkedArr: string[] = [];
    checkbox.forEach((element) => {
      if (element.checked) {
        checkedArr.push(element.id);
      }
    });
    setSelectedTag(checkedArr);
    getTagsData(checkedArr);
  };

  const getCategory = (element: string) => {
    setSelectedCategory(element);
    getCatagoryData(element);
  };
  return (
    <FilterBorder>
      <FilterHeader
        src="/icon/add.svg"
        alt="add"
        style={{ width: "15px", height: "15px", marginLeft: "10px" }}
        arrow={false}
      >
        북마크 추가
      </FilterHeader>
      <Seperator />
      <FilterHeader
        src="/icon/full-star.svg"
        alt="star"
        arrow={false}
        onClick={selectLike}
        isOpen={favoriteSelected}
      >
        즐겨찾기 목록
      </FilterHeader>
      <FilterHeader
        src="/icon/label.svg"
        alt="tag"
        arrow
        isOpen={isTagListOpen}
        onClick={openTagFolder}
      >
        태그 목록
      </FilterHeader>
      <FilterFolder
        getCategory={getCategory}
        tagList={tagList}
        isOpen={isTagListOpen}
        onChange={() => handleClick()}
      />
      <FilterHeader
        src="/icon/folder.svg"
        alt="category"
        arrow
        isOpen={isCategoryListOpen}
        onClick={openCategoryFolder}
      >
        카테고리
      </FilterHeader>
      <FilterFolder
        getCategory={getCategory}
        categoryList={categoryList}
        isOpen={isCategoryListOpen}
        onClick={() => handleClick()}
      />
    </FilterBorder>
  );
};

const Seperator = styled.div`
  border-bottom: 2px solid ${color.$skyBlue};
  margin: 10px 0px;
`;

export default MyFilterMenu;
