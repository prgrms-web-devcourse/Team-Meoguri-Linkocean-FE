import { color } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";
import FilterBoarder from "./filterBoarder";
import FilterElement from "./filterElement";
import FilterHeader from "./filterHeader";

export interface MyFilterMenuProps {
  href: string;
}

const MyFilterMenu = ({ href }: MyFilterMenuProps) => {
  const handleClick = () => {
    alert("click");
  };

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
      <FilterHeader src="/icon/full-star.svg" alt="star" arrow>
        즐겨찾기 목록
      </FilterHeader>
      <FilterHeader src="/icon/label.svg" alt="tag" arrow>
        태그 목록
      </FilterHeader>
      <FilterHeader src="/icon/folder.svg" alt="category" arrow>
        카테고리
      </FilterHeader>
      <FilterElement count={23} selected={false}>
        라이브러리
      </FilterElement>
      <FilterElement count={23} selected={false}>
        참고블로그
      </FilterElement>
      <FilterElement count={23} selected={false}>
        프로그래머스
      </FilterElement>
      <FilterElement count={23} selected={false}>
        라이브러리
      </FilterElement>
      <FilterElement count={23} selected={false}>
        참고블로그
      </FilterElement>
      <FilterElement count={23} selected={false}>
        프로그래머스
      </FilterElement>
      <FilterElement count={23} selected={false}>
        라이브러리
      </FilterElement>
      <FilterElement count={23} selected={false}>
        참고블로그
      </FilterElement>
      <FilterElement count={23} selected={false}>
        프로그래머스
      </FilterElement>
      <FilterElement count={23} selected={false}>
        라이브러리
      </FilterElement>
      <FilterElement count={23} selected={false}>
        참고블로그
      </FilterElement>
      <FilterElement count={23} selected={false}>
        프로그래머스
      </FilterElement>
      <FilterElement count={23} selected={false}>
        라이브러리
      </FilterElement>
      <FilterElement count={23} selected={false}>
        참고블로그
      </FilterElement>
      <FilterElement count={23} selected={false}>
        프로그래머스
      </FilterElement>
    </FilterBoarder>
  );
};

const Seperator = styled.div`
  border-bottom: 2px solid ${color.$skyBlue};
  margin: 20px 0px;
`;

export default MyFilterMenu;
