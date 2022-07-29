import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "small" | "large" | "line";
  colorType: "main-color" | "skyblue" | "aqua" | "gray";
  width?: string;
  height?: string;
}
const handleButton = (colorType: string, buttonType: string) => {
  let buttonColor = "";
  let hoverColor = "";
  let textColor = "";
  switch (colorType) {
    case "main-color": {
      buttonColor = color.$mainColor;
      hoverColor = color.$hoverMaincolor;
      textColor = "white";
      break;
    }
    case "skyblue": {
      buttonColor = color.$skyBlue;
      hoverColor = color.$hoverSkyBlue;
      textColor = "white";
      break;
    }
    case "aqua": {
      buttonColor = color.$aqua;
      hoverColor = color.$hoverAqua;
      textColor = "black";
      break;
    }
    case "gray": {
      buttonColor = color.$gray100;
      hoverColor = color.$gray200;
      textColor = "black";
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
        color:${textColor};
        &:hover{
          background-color:${hoverColor};
        }
      `;
    case "large":
      return `
        width:250px;
        height:45px;
        background-color:${buttonColor};
        color:${textColor};
        &:hover{
          background-color:${hoverColor};
        }
      `;
    case "line":
      return `
        width:250px;
        height:45px;
        background-color:white;
        border:1px solid ${buttonColor};
        color:${buttonColor};
        &:hover{
          border:2px solid ${buttonColor}
        }
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
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      buttonType={buttonType}
      colorType={colorType}
      width={width}
      height={height}
      {...props}
    >
      {children}
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
  cursor: pointer;
`;

export default Button;
