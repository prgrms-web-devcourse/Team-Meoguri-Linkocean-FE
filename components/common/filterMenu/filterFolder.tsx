/* eslint-disable no-restricted-syntax */
import { color } from "@/styles/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterElement from "./filterElement";

interface FilterFolderProps extends React.HTMLAttributes<HTMLDivElement> {
  tagList?: { name: string; count: number }[];
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

  const router = useRouter();

  useEffect(() => {
    const $checkboxCollection = Array.from(
      document.getElementsByTagName("input")
    );
    if ($checkboxCollection !== undefined) {
      setCheckbox($checkboxCollection);
    }
  }, []);

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
    <Wrapper isOpen={isOpen} {...props} getCategory={getCategory}>
      {tagList
        ? tagList.map((element, index) => (
            <FilterElement
              count={element.count}
              title={element.name}
              key={element.name}
              type="tag"
              isSelected={false}
              disabled={disabled}
              checked={defaultCheck(element.name)}
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
