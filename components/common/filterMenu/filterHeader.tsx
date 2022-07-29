import { text } from "@/styles/theme";
import styled from "@emotion/styled";

interface FilterHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  children: string;
  arrow: boolean;
}

const FilterHeader = ({
  src,
  alt,
  style,
  children,
  arrow,
  ...props
}: FilterHeaderProps) => {
  return (
    <StyledDiv {...props}>
      <StyledImage src={src} alt={alt} style={style} />
      {children}
      {arrow ? <StyledArrow src="/icon/caret.svg" alt="tag" /> : null}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  margin-top: 15px;
  ${text.$subtitle1}
  display:flex;
  align-items: center;
  line-height: 0px;
  cursor: pointer;
`;

const StyledImage = styled.img`
  margin: 0px 5px;
  width: 24px;
  height: 24px;
`;

const StyledArrow = styled.img`
  flex: flex-end;
  width: 22px;
  height: 16px;
  display: block;
  margin-left: auto;
`;

export default FilterHeader;
