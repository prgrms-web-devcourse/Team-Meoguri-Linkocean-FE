import styled from "@emotion/styled";
import FilterElement from "./filterElement";

interface FilterFolderProps extends React.HTMLAttributes<HTMLDivElement> {
  tagList?: { name: string; count: number }[];
  categoryList?: string[];
}
const FilterFolder = ({
  tagList,
  categoryList,
  ...props
}: FilterFolderProps) => {
  return (
    <Wrapper {...props}>
      {tagList
        ? tagList.map((element) => (
            <FilterElement
              count={element.count}
              title={element.name}
              type="tag"
            />
          ))
        : null}
      {categoryList
        ? categoryList.map((element) => (
            <FilterElement title={element} type="category" />
          ))
        : null}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default FilterFolder;
