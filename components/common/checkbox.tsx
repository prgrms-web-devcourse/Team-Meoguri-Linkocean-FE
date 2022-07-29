import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import useToggle from "@/hooks/useToggle";
import { ChangeEventHandler } from "react";

type HandleChange = ChangeEventHandler<HTMLInputElement>;
export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  on?: boolean;
  onChange?: HandleChange;
}

const Checkbox = ({ on = false, onChange, ...props }: CheckboxProps) => {
  const [checked, toggle] = useToggle(on);

  const handleChange: HandleChange = (e) => {
    toggle();

    if (!onChange) {
      return;
    }

    onChange(e);
  };

  return (
    <Container>
      <StyledInput
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <Check />
    </Container>
  );
};

const Container = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const Check = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid ${theme.color.$hoverMaincolor};
  border-radius: 3px;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  display: none;

  &:checked + div {
    background: #fff url("/icon/checked.svg") no-repeat center center;
  }

  &:disabled + div {
    border-color: ${theme.color.$gray600};
  }
`;

export default Checkbox;
