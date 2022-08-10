import { color } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import FilterBorder from "./filterBorder";
import FilterFolder from "./filterFolder";
import FilterHeader from "./filterHeader";

export interface MyFilterMenuProps {
  tagList?: { tag: string; count: number }[];
  categoryList?: string[];
  isFavorite?: boolean;
  getTagsData: (arr: string[]) => void;
  getCategoryData: (arr: string) => void;
}

const MyFilterMenu = ({
  tagList,
  categoryList,
  isFavorite,
  getTagsData,
  getCategoryData,
}: MyFilterMenuProps) => {
  const [favoriteSelected, setFavoriteSelected] = useState(isFavorite);
  const [isTagListOpen, setIsTagListOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [checkbox, setCheckbox] = useState<HTMLInputElement[]>();
  const router = useRouter();
  const filterMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const url = router.asPath;
    if (url.includes("favorite")) {
      setFavoriteSelected(true);
    }
    if (url.includes("tag")) {
      setIsTagListOpen(true);
    }
    if (url.includes("category")) {
      setIsCategoryListOpen(true);
    }
  }, [router.asPath]);
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

  useEffect(() => {
    if (!filterMenuRef.current) {
      return;
    }

    const $checkboxCollection = Array.from(
      filterMenuRef.current.getElementsByTagName("input")
    );

    if ($checkboxCollection !== undefined) {
      setCheckbox($checkboxCollection);
    }
  }, [tagList]);

  const handleClick = () => {
    const checkedArr: string[] = [];
    if (checkbox) {
      checkbox.forEach((element) => {
        if (element.checked) {
          checkedArr.push(element.id);
        }
      });
    }
    setSelectedTag(checkedArr);
    getTagsData(checkedArr);
  };

  const getCategory = (element: string) => {
    setSelectedCategory(element);
    getCategoryData(element);
  };

  return (
    <div ref={filterMenuRef}>
      <FilterBorder>
        <Link href="/create">
          <FilterHeader
            src="/icon/add.svg"
            alt="add"
            style={{ width: "15px", height: "15px", marginLeft: "10px" }}
            arrow={false}
          >
            북마크 추가
          </FilterHeader>
        </Link>
        <Seperator />
        <Link href="/my/favorite">
          <FilterHeader
            src="/icon/full-star.svg"
            alt="star"
            arrow={false}
            onClick={selectLike}
            isOpen={favoriteSelected}
          >
            즐겨찾기 목록
          </FilterHeader>
        </Link>
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
          categoryList={categoryList ? ["전체", ...categoryList] : ["전체"]}
          isOpen={isCategoryListOpen}
          onClick={() => handleClick()}
        />
      </FilterBorder>
    </div>
  );
};

const Seperator = styled.div`
  border-bottom: 2px solid ${color.$skyBlue};
  margin: 10px 0px;
`;

export default MyFilterMenu;
