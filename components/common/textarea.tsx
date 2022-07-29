import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { forwardRef } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  height?: string;
}

const Textarea = forwardRef(
  (
    { width = "470px", height = "155px", ...props }: TextareaProps,
    ref?: React.Ref<HTMLTextAreaElement>
  ) => {
    return <StyledTextarea style={{ width, height }} {...props} ref={ref} />;
  }
);

const StyledTextarea = styled.textarea`
  border: 1px solid ${theme.color.$gray600};
  border-radius: 8px;
  padding: 10px 15px;
  ${theme.text.$body1}
  background-color: #fff;
  outline: 0;
  box-sizing: border-box;
  resize: none;

  &:focus {
    box-shadow: 0px 0px 1px 2px ${theme.color.$skyBlue};
  }
`;

export default Textarea;
