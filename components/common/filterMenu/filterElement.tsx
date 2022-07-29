import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import Checkbox from "@/components/common/checkbox";

interface FilterElementProps {
  selected: boolean;
  children: React.ReactNode;
  count: number;
}

const FilterElement = ({ children, selected, count }: FilterElementProps) => {
  return (
    <Wrapper selected={selected} count={count}>
      # {children}({count})
      <StyledCheckbox />
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
  ${(props) =>
    props.selected
      ? `background-color: ${color.$hoverSkyBlue}11;
      `
      : "background-color: white"}
`;

const StyledCheckbox = styled(Checkbox)``;
export default FilterElement;
