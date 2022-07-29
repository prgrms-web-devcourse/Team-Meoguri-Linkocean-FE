import { color } from "@/styles/theme";
import styled from "@emotion/styled";

const FilterBoarder = ({ children }: { children: React.ReactNode }) => {
  return (
    <OutterWrapper>
      <StyledImage src="/image/crab.png" width={98} height={63} alt="crab" />
      <Wrapper>{children}</Wrapper>
    </OutterWrapper>
  );
};

const OutterWrapper = styled.div`
  border: 2px solid ${color.$skyBlue};
  width: 278px;
  border-radius: 8px;
  display: flex;
  position: relative;
  background-color: white;
  margin-top: 20px;
  padding: 12px 15px;
  max-height: 450px;
  overflow: auto;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const StyledImage = styled.img`
  position: absolute;
  top: -35px;
  left: 220px;
  z-index: -1;
`;
export default FilterBoarder;
