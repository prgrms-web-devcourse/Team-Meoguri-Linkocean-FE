import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { useSelect } from "./selectStore";

interface OptionListProps extends React.HTMLAttributes<HTMLUListElement> {
  maxHeight?: string;
}

const OptionList = ({ maxHeight, ...props }: OptionListProps) => {
  const {
    style: { width, version2 },
    state: { open },
  } = useSelect();

  return open ? (
    <StyledList style={{ width, maxHeight }} version2={version2} {...props} />
  ) : null;
};

export default OptionList;

const StyledList = styled.ul<{ version2: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  ${({ version2 }) =>
    version2
      ? `
          top: calc(100% + 9px);
          left: 2px;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        `
      : null}
  border: ${({ version2 }) =>
    version2 ? 0 : `1px solid ${theme.color.$gray600}`};
  border-top: 0;
  border-radius: ${({ version2 }) => (version2 ? "8px" : "0 0 8px 8px")};
  padding: 8px 0;
  background-color: #fff;
  z-index: 10;
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
