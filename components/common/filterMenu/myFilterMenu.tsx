import { color } from "@/styles/theme";
import styled from "@emotion/styled";
import FilterBoarder from "./filterBoarder";
import FilterFolder from "./filterFolder";
import FilterHeader from "./filterHeader";

export interface MyFilterMenuProps {
  tagList?: { name: string; count: number }[];
  categoryList?: string[];
}

const dummy = [
  {
    name: "JAVA",
    count: 5,
  },
  {
    name: "JAVASCRIPT",
    count: 5,
  },
];
const dummycategory = ["IT", "Security", "JPA"];

const MyFilterMenu = ({ tagList, categoryList }: MyFilterMenuProps) => {
  const openFolder = () => {
    // 화살표바꾸기, bg 색바꾸기, 보여주기
  };

  const selectElement = () => {
    // bg 색 바꾸기,
  };

  const select;

  return (
    <FilterBoarder>
      <FilterHeader
        src="/icon/add.svg"
        alt="add"
        style={{ width: "15px", height: "15px", marginLeft: "10px" }}
        arrow={false}
      >
        북마크 추가
      </FilterHeader>
      <Seperator />
      <FilterHeader src="/icon/full-star.svg" alt="star" arrow={false}>
        즐겨찾기 목록
      </FilterHeader>
      <FilterHeader src="/icon/label.svg" alt="tag" arrow>
        태그 목록
      </FilterHeader>
      <FilterFolder tagList={tagList} />
      <FilterHeader src="/icon/folder.svg" alt="category" arrow>
        카테고리
      </FilterHeader>
      <FilterFolder categoryList={categoryList} />
    </FilterBoarder>
  );
};

const Seperator = styled.div`
  border-bottom: 2px solid ${color.$skyBlue};
  margin: 20px 0px;
`;

export default MyFilterMenu;
