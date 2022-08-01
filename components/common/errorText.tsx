import styled from "@emotion/styled";
import * as theme from "@/styles/theme";

const ErrorText = styled.span`
  display: inline-block;
  white-space: pre-wrap;
  ${theme.text.$caption};
  color: ${theme.color.$warning};
`;

export default ErrorText;
