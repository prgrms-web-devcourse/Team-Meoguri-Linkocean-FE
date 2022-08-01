import styled from "@emotion/styled";
import { CATEGORY } from "@/types/type";
import * as theme from "@/styles/theme";
import useToggle from "@/hooks/useToggle";
import { ChangeEventHandler } from "react";
import { CheckboxProps } from "./checkbox";

type HandleChange = ChangeEventHandler<HTMLInputElement>;
export interface CategoryItemProps extends CheckboxProps {
  name: typeof CATEGORY[number];
}

const CategoryItem = ({ name, on, onChange, ...props }: CategoryItemProps) => {
  const [checked, toggle] = useToggle(on);
  const { color, fileName } = CATEGORY_MAP[name];
  const imgSrc = `/icon/category/${fileName}${checked ? "-selected" : ""}.svg`;
  console.log(imgSrc);

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

const CATEGORY_MAP = {
  자기계발: { color: "#7DCD97", fileName: "self-development" },
  인문: { color: "#60A8D4", fileName: "humanities" },
  정치: { color: "#FFC0CB", fileName: "politics" },
  사회: { color: "#EDD05C", fileName: "social" },
  예술: { color: "#E78565", fileName: "art" },
  과학: { color: "#7B61FF", fileName: "science" },
  기술: { color: "#3E4CA2", fileName: "technology" },
  IT: { color: "#3E7B57", fileName: "it" },
  가정: { color: "#DC6363", fileName: "home" },
  건강: { color: "#516CF6", fileName: "health" },
  여행: { color: "#82DD4A", fileName: "travel" },
  요리: { color: "#966353", fileName: "cooking" },
} as const;
