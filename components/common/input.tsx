import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  searchIcon?: boolean;
  endIcon?: boolean;
  width?: string;
  height?: string;
}

const Input = forwardRef(
  (
    {
      searchIcon = false,
      endIcon = false,
      width = "367px",
      height = "45px",
      ...props
    }: InputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    return searchIcon ? (
      <SearchInput endIcon={endIcon} width={width}>
        <img src="/icon/search.svg" alt="" width={24} height={24} />
        <DefaultInput
          placeholder="검색어를 입력해주세요."
          width={width}
          height={height}
          {...props}
          ref={ref}
        />
      </SearchInput>
    ) : (
      <DefaultInput width={width} height={height} {...props} ref={ref} />
    );
  }
);

const DefaultInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${theme.color.$gray600};
  border-radius: 8px;
  padding-left: 17px;
  ${theme.text.$body1}
  background-color: #fff;
  outline: 0;
  box-sizing: border-box;

  &:focus {
    box-shadow: 0px 0px 1px 2px ${theme.color.$skyBlue};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: black !important;
  }
`;

const SearchInput = styled.div<{ width: string; endIcon: boolean }>`
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: ${({ width, endIcon }) =>
      endIcon ? `calc(${width} - 24px - 17px)` : "12px"};
    transform: translateY(-50%);
  }

  input {
    padding-left: ${({ endIcon }) => (endIcon ? "17px" : "48px")};
  }
`;

export default Input;
