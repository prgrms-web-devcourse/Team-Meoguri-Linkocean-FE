import styled from "@emotion/styled";
import { Category } from "@/types/type";
import * as theme from "@/styles/theme";
import useToggle from "@/hooks/useToggle";
import { ChangeEventHandler } from "react";
import { CheckboxProps } from "./checkbox";

type HandleChange = ChangeEventHandler<HTMLInputElement>;
export interface CategoryItemProps extends CheckboxProps {
  name: Category;
}

const CategoryItem = ({ name, on, onChange, ...props }: CategoryItemProps) => {
  const [checked, toggle] = useToggle(on);
  const { text, color } = CategoryMap[name];
  const imgSrc = `/icon/category/${getKebabCase(name)}${
    checked ? "-selected" : ""
  }.svg`;

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
        {text}
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

const CategoryMap = {
  self_development: { text: "자기계발", color: "#7DCD97" },
  humanities: { text: "인문", color: "#60A8D4" },
  politics: { text: "정치", color: "#FFC0CB" },
  social: { text: "사회", color: "#EDD05C" },
  art: { text: "예술", color: "#E78565" },
  science: { text: "과학", color: "#7B61FF" },
  technology: { text: "기술", color: "#3E4CA2" },
  it: { text: "IT", color: "#3E7B57" },
  home: { text: "가정", color: "#DC6363" },
  health: { text: "건강", color: "#516CF6" },
  travel: { text: "여행", color: "#82DD4A" },
  cooking: { text: "요리", color: "#966353" },
} as const;

const getKebabCase = (snakeCase: string) => snakeCase.replace(/_/g, "-");
