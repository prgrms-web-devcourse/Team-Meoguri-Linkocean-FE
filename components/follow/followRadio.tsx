import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";
import * as theme from "@/styles/theme";

interface FollowRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const FollowRadio = ({ text, name, id, ...props }: FollowRadioProps) => {
  return (
    <>
      <Radio type="radio" {...props} name={name} id={id} />
      <Label htmlFor={id}>{text}</Label>
    </>
  );
};

const Radio = styled.input`
  position: absolute !important;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  border: 0;
  overflow: hidden;

  &:checked + label {
    font-weight: 700;
    color: #312f2f;
    border-bottom: 2px solid ${theme.color.$skyBlue};
  }
`;

const Label = styled.label`
  display: inline-block;
  width: 235px;
  height: 45px;
  border-bottom: 1px solid ${theme.color.$gray400};
  color: ${theme.color.$gray600};
  background-color: #fff;
  ${theme.text.$body2}
  line-height: 45px;
  text-align: center;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;

export default FollowRadio;
