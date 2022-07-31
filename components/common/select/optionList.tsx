import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { useSelect } from "./selectStore";

interface OptionListProps extends React.HTMLAttributes<HTMLUListElement> {
  maxHeight?: string;
}

const OptionList = ({ maxHeight, ...props }: OptionListProps) => {
  const {
    style: { width },
    state: { open },
  } = useSelect();

  return open ? <StyledList style={{ width, maxHeight }} {...props} /> : null;
};

export default OptionList;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  border: 1px solid ${theme.color.$gray600};
  border-top: 0;
  border-radius: 0 0 8px 8px;
  padding: 8px 0;
  background-color: #fff;
  box-sizing: border-box;
  overflow-y: overlay;

  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: ${theme.color.$mainColor};
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;
