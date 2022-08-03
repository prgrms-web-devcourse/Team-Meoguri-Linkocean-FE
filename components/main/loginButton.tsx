import styled from "@emotion/styled";
import * as theme from "@/styles/theme";

const LoginButton = styled.button`
  position: relative;
  width: 250px;
  height: 45px;
  border: 0;
  border-radius: 4px;
  padding: 0;
  ${theme.text.$subtitle1}

  cursor: pointer;
  box-sizing: border-box;

  &:disabled {
    cursor: not-allowed;
  }

  span {
    position: absolute;
    top: 0;
    left: 8px;
  }
`;

export default LoginButton;
