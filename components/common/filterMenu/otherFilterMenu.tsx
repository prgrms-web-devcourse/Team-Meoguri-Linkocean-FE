import { color } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterBorder from "./filterBorder";
import FilterFolder from "./filterFolder";
import FilterHeader from "./filterHeader";

export interface OtherFilterMenuProps {
  tagList?: { name: string; count: number }[];
  categoryList?: string[];
  isFavorite?: boolean;
  getTagsData: (arr: string[]) => void;
  getCategoryData: (arr: string) => void;
}

const OtherFilterMenu = ({
  tagList,
  categoryList,
  isFavorite,
  getTagsData,
  getCategoryData,
}: OtherFilterMenuProps) => {
  const [favoriteSelected, setFavoriteSelected] = useState(isFavorite);
  const [isTagListOpen, setIsTagListOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [checkbox, setCheckbox] = useState<HTMLInputElement[]>();
  const router = useRouter();
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
    const $checkboxCollection = Array.from(
      document.getElementsByTagName("input")
    );
    if ($checkboxCollection !== undefined) {
      setCheckbox($checkboxCollection);
    }
  }, []);

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
  const { profileId } = router.query;

  return (
    <FilterBorder>
      <Link
        href={{
          pathname: "/profile/[id]/favorite",
          query: { id: profileId },
        }}
      >
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
        categoryList={categoryList}
        isOpen={isCategoryListOpen}
        onClick={() => handleClick()}
      />
    </FilterBorder>
  );
};

export default OtherFilterMenu;
