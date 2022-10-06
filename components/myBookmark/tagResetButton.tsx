import * as theme from "@/styles/theme";
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";

interface TagResetButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TagResetButton = ({ onClick }: TagResetButtonProps) => {
  return <StyledButton onClick={onClick}>초기화</StyledButton>;
};

const StyledButton = styled.button`
  position: relative;
  border: 0;
  padding: 5px 9px 5px 28px;
  ${theme.text.$body2}
  background-color: transparent;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 9px;
    left: 10px;
    width: 13px;
    height: 13px;
    background: url("/icon/reset.svg") no-repeat center center;
  }
`;

export default TagResetButton;
