import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";

interface FilterHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  children: string;
  arrow: boolean;
}
interface ArrowProps {
  isOpen?: boolean;
  isFavorite?: boolean;
}

const FilterHeader = ({
  src,
  alt,
  style,
  children,
  arrow,
  isOpen, // Arrow 방향
  isFavorite,
  ...props
}: FilterHeaderProps & ArrowProps) => {
  return (
    <StyledDiv isOpen={isOpen} isFavorite={isFavorite} {...props}>
      <StyledImage src={src} alt={alt} style={style} />
      {children}
      {arrow ? (
        <StyledArrow src="/icon/caret.svg" alt="tag" isOpen={isOpen} />
      ) : null}
    </StyledDiv>
  );
};

const StyledDiv = styled.div<ArrowProps>`
  margin-top: 6px;
  ${text.$subtitle1}
  display:flex;
  align-items: center;
  line-height: 0px;
  padding: 5px 0px;
  padding-right: 10px;
  cursor: pointer;
  ${(props) =>
    props.isOpen || props.isFavorite
      ? `background-color: ${color.$hoverSkyBlue}11;
         border-radius:8px;
      `
      : "background-color: white"}
`;

const StyledImage = styled.img`
  margin: 0px 5px;
  width: 24px;
  height: 24px;
`;

const StyledArrow = styled.img<ArrowProps>`
  width: 22px;
  height: 16px;
  display: block;
  margin-left: auto;
  ${(prop) =>
    prop.isOpen ? `transform:rotate(180deg); ` : `transform:rotate(0deg)`}
`;

export default FilterHeader;
