import { color } from "@/styles/theme";
import styled from "@emotion/styled";

const FilterBoarder = ({ children }: { children: React.ReactNode }) => {
  return (
    <OutterWrapper>
      <Wrapper>{children}</Wrapper>
    </OutterWrapper>
  );
};

const OutterWrapper = styled.div`
  border: 2px solid ${color.$skyBlue};
  box-sizing: border-box;
  width: 278px;
  border-radius: 8px;
  display: flex;
  position: relative;
  background-color: white;
  margin-top: 20px;
  padding: 12px 15px;
  max-height: 560px;
  &:before {
    content: "";
    display: block;
    width: 98px;
    height: 33px;
    background-image: url(/image/crab.png);
    position: absolute;
    top: -35px;
    left: 180px;
    background-size: cover;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

export default FilterBoarder;
