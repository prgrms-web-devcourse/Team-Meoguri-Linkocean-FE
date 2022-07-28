import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";

export interface ButtonProps {
  buttonType: "small" | "large" | "line";
  colorType: "main-color" | "skyblue" | "aqua" | "gray";
  width?: string;
  height?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const handleButton = (colorType: string, buttonType: string) => {
  let buttonColor = "";
  switch (colorType) {
    case "main-color": {
      buttonColor = color.$mainColor;
      break;
    }
    case "skyblue": {
      buttonColor = color.$skyBlue;
      break;
    }
    case "aqua": {
      buttonColor = color.$aqua;
      break;
    }
    case "gray": {
      buttonColor = color.$gray100;
      break;
    }
    default:
      return ``;
  }

  switch (buttonType) {
    case "small":
      return `
        width: 62px;
        height: 45px;
        background-color:${buttonColor};
      `;
    case "large":
      return `
        width:250px;
        height:45px;
        background-color:${buttonColor}
      `;
    case "line":
      return `
        width:250px;
        height:45px;
        background-color:white;
        border:1px solid ${buttonColor}
      `;
    default:
      return ``;
  }
};

const Button = ({
  buttonType,
  colorType,
  width,
  height,
  buttonText,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      buttonType={buttonType}
      colorType={colorType}
      onClick={onClick}
      width={width}
      height={height}
    >
      {buttonText}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 8px;
  ${text.$subtitle1}
  ${(props) => handleButton(props.colorType, props.buttonType)};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export default Button;
