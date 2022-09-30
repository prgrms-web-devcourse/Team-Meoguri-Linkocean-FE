import styled from "@emotion/styled";
import * as theme from "@/styles/theme";

const TagButton = styled.button`
  position: relative;
  border: 0;
  border-radius: 30px;
  padding: 5px 28px 5px 9px;
  ${theme.text.$body2};
  color: ${theme.color.$gray50};
  background-color: ${theme.color.$skyBlue};
  cursor: pointer;

  :before,
  :after {
    position: absolute;
    top: 9px;
    right: 15px;
    width: 1.5px;
    height: 12px;
    border-radius: 2px;
    background-color: ${theme.color.$gray50};
    content: "";
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

export default TagButton;
