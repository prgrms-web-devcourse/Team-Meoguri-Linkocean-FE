import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import Checkbox from "@/components/common/checkbox";

interface FilterElementProps {
  title: string;
  count?: number;
  type: "tag" | "category";
}

const FilterElement = ({ title, count, type }: FilterElementProps) => {
  return (
    <Wrapper count={count} type={type} title={title}>
      {type === "tag" && count !== undefined
        ? `# ${title}(${count})`
        : `${title}`}
      {type === "tag" ? <Checkbox /> : null}
    </Wrapper>
  );
};

const Wrapper = styled.div<FilterElementProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${text.$body1}
  color:${color.$gray600};
  margin: 6px 0px 6px 5px;
  border-radius: 8px;
`;

export default FilterElement;
