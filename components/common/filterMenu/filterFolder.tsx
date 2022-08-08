/* eslint-disable no-restricted-syntax */
import { color } from "@/styles/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import FilterElement from "./filterElement";

interface FilterFolderProps extends React.HTMLAttributes<HTMLDivElement> {
  tagList?: { tag: string; count: number }[];
  categoryList?: string[];
  getCategory: (arr: string) => void;
}
interface WrapperProps {
  isOpen: boolean;
}
const FilterFolder = ({
  tagList,
  categoryList,
  getCategory,
  isOpen,
  ...props
}: FilterFolderProps & WrapperProps) => {
  const [disabled, setDisabled] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string>("");
  const [checkbox, setCheckbox] = useState<HTMLInputElement[]>();
  const filterFolderRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!filterFolderRef.current) {
      return;
    }

    const $checkboxCollection = Array.from(
      filterFolderRef.current.getElementsByTagName("input")
    );

    if ($checkboxCollection !== undefined) {
      setCheckbox($checkboxCollection);
    }
  }, [tagList]);

  const handleTagClick = (index: number) => {
    let checkedCount = 0;
    if (checkbox) {
      checkbox.forEach((element) => {
        if (element.checked) {
          checkedCount += 1;
        }
      });
    }
    if (checkedCount >= 3) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    if (checkbox) {
      if (checkbox[index].checked === true) {
        setDisabled(false);
      }
    }
  };
  const handleCategoryClick = (element: string) => {
    setSelectedElement(element);
    getCategory(element);
  };

  const defaultCheck = (tag: string) => {
    const tags = router.query.tag;
    if (typeof tags === "string") {
      const tagArr = tags.split(",");
      return tagArr.filter((element) => element === tag).length !== 0;
    }
    return false;
  };

  return (
    <div ref={filterFolderRef}>
      <Wrapper isOpen={isOpen} {...props} getCategory={getCategory}>
        {tagList
          ? tagList.map((element, index) => (
              <FilterElement
                count={element.count}
                title={element.tag}
                key={element.tag}
                type="tag"
                isSelected={false}
                disabled={disabled}
                checked={defaultCheck(element.tag)}
                onClick={() => handleTagClick(index)}
              />
            ))
          : null}
        {categoryList
          ? categoryList.map((element) =>
              element === selectedElement ? (
                <StyledFilterElement
                  id="selected"
                  key={element}
                  title={element}
                  type="category"
                  onClick={() => handleCategoryClick(element)}
                  isSelected={router.query.category === element}
                  disabled={false}
                />
              ) : (
                <StyledFilterElement
                  title={element}
                  key={element}
                  type="category"
                  onClick={() => handleCategoryClick(element)}
                  isSelected={router.query.category === element}
                  disabled={false}
                />
              )
            )
          : null}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div<WrapperProps & FilterFolderProps>`
  max-height: 240px;
  height: fit-content;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${color.$mainColor};
    border-radius: 8px;
    height: 30%;
  }
  ${(props) => (props.isOpen ? "display:block" : "display:none")}
`;

const StyledFilterElement = styled(FilterElement)``;
export default FilterFolder;
