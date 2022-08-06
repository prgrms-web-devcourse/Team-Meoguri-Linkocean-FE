import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { HTMLAttributes } from "react";

const Radio = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledRadio type="radio" {...props} />;
};

const StyledRadio = styled.input`
  accent-color: ${theme.color.$mainColor};
  width: 22px;
  height: 22px;
`;

export default Radio;
