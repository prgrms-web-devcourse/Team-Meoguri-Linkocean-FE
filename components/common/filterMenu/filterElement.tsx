import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import Checkbox from "@/components/common/checkbox";

interface FilterElementProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  count?: number;
  type: "tag" | "category";
  disabled: boolean;
  checked?: boolean;
}
interface WrapperProps {
  isSelected: boolean; // 백그라운드 색 변경 변수
}

const FilterElement = ({
  title,
  count,
  type,
  isSelected,
  disabled,
  checked,
  ...props
}: FilterElementProps & WrapperProps) => {
  if (type === "tag")
    return (
      <label htmlFor={title}>
        <Wrapper title={title} isSelected={isSelected} {...props}>
          # {title} ({count})
          <Checkbox id={title} disabled={disabled} checked={checked} />
        </Wrapper>
      </label>
    );
  return (
    <Wrapper isSelected={isSelected} onClick={props.onClick}>
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${text.$body1}
  color:${color.$gray600};
  margin: 6px 0px;
  border-radius: 8px;
  cursor: pointer;
  padding: 2px 10px;
  cursor: pointer;
  ${(props) =>
    props.isSelected
      ? `background-color: ${color.$hoverSkyBlue}11;border-radius:8px;
      `
      : `background-color: white; 
      &:hover {
        background-color: ${color.$hoverSkyBlue}11;
      }`}
`;

export default FilterElement;
