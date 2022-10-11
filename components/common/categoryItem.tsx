import styled from "@emotion/styled";
import { CATEGORY } from "@/types/type";
import * as theme from "@/styles/theme";
import useToggle from "@/hooks/useToggle";
import { ChangeEventHandler } from "react";
import { CATEGORY_MAP } from "@/utils/constants";
import { CheckboxProps } from "./checkbox";

type HandleChange = ChangeEventHandler<HTMLInputElement>;
export interface CategoryItemProps extends CheckboxProps {
  name: typeof CATEGORY[number];
}

const CategoryItem = ({ name, on, onChange, ...props }: CategoryItemProps) => {
  const [checked, toggle] = useToggle(on);
  const { color, fileName } = CATEGORY_MAP[name];
  const imgSrc = `/icon/category/${fileName}${checked ? "-selected" : ""}.svg`;

  const handleChange: HandleChange = (e) => {
    toggle();

    if (!onChange) {
      return;
    }

    onChange(e);
  };

  return (
    <Container onClick={() => toggle()}>
      <StyledInput
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        color={color}
        {...props}
      />
      <Check>
        <img src={imgSrc} alt={name} aria-hidden />
        {name}
      </Check>
    </Container>
  );
};

const Container = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const StyledInput = styled.input`
  display: none;

  &:checked + div {
    color: #fff;
    background-color: ${(props) => props.color};
  }
`;

const Check = styled.div`
  display: flex;
  gap: 12px;
  width: 175px;
  height: 52px;
  border-radius: 8px;
  padding: 12px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  ${theme.text.$subtitle1};
  line-height: 28px;
  box-sizing: border-box;
`;

export default CategoryItem;
