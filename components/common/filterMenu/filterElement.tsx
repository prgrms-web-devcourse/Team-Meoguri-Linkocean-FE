import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import Checkbox from "@/components/common/checkbox";

interface FilterElementProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  count?: number;
  type: "tag" | "category";
  disabled: boolean;
}
interface WrapperProps {
  isSelected: boolean;
}

const FilterElement = ({
  title,
  count,
  type,
  isSelected,
  disabled,
  ...props
}: FilterElementProps & WrapperProps) => {
  return (
    <label htmlFor={title}>
      <Wrapper
        count={count}
        type={type}
        title={title}
        isSelected={isSelected}
        disabled={disabled}
        {...props}
      >
        {type === "tag" && count !== undefined
          ? `# ${title} (${count})`
          : `${title}`}
        {type === "tag" ? <Checkbox id={title} disabled={disabled} /> : null}
      </Wrapper>
    </label>
  );
};

const Wrapper = styled.div<WrapperProps & FilterElementProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${text.$body1}
  color:${color.$gray600};
  margin: 6px 0px;
  border-radius: 8px;
  cursor: pointer;
  padding: 5px;
  padding-left: 10px;
  cursor: pointer;
  ${(props) =>
    props.isSelected
      ? `background-color: ${color.$hoverSkyBlue}11;border-radius:8px;
      `
      : "background-color: white"}
`;

export default FilterElement;
