import styled from "@emotion/styled";

interface ButtonProps {
  size: "small" | "large" | "line";
  color: "main-color" | "sky-blue" | "aqua" | "gray";
  width?: number;
  height?: number;
  text?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ size, color, width, height, text, onClick }: ButtonProps) => {
  const a = 1;
  return (
    <StyledButton type="button" onClick={onClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button``;

export default Button;
