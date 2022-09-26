import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { useSelect } from "./selectStore";

const Trigger = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const {
    style: { width, version2 },
    state: { open, selectedOption },
    actions: { setOpen },
  } = useSelect();

  return (
    <StyledButton
      type="button"
      open={open}
      style={{ width }}
      onClick={() => setOpen(() => !open)}
      version2={version2}
      {...props}
    >
      {selectedOption.text !== "" ? selectedOption.text : children}
    </StyledButton>
  );
};

const version2Filter =
  "brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(338%) hue-rotate(243deg) brightness(118%) contrast(92%)";

const StyledButton = styled.button<{ open: boolean; version2: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  border: ${({ version2 }) =>
    version2 ? 0 : `1px solid ${theme.color.$gray600}`};
  border-radius: ${({ open, version2 }) =>
    open && !version2 ? "8px 8px 0 0" : "8px"};
  padding: 10px 15px;
  color: ${({ open, version2 }) =>
    open && version2 ? theme.color.$gray50 : theme.color.$gray600};
  background-color: ${({ open, version2 }) =>
    open && version2 ? theme.color.$skyBlue : "#fff"};
  ${theme.text.$body1};
  text-align: start;
  cursor: pointer;

  &:hover {
    ${({ version2 }) =>
      version2
        ? `
      color: ${theme.color.$gray50};
      background-color: ${theme.color.$skyBlue};
    `
        : null}
  }

  &:hover::after {
    ${({ version2 }) =>
      version2
        ? `
      filter: ${version2Filter};
    `
        : null}
  }

  &::after {
    content: "";
    display: inline-block;
    width: 14px;
    height: 8px;
    background: url("/icon/select-arrow.svg") center;
    transform: ${(props) => (props.open ? " rotate(180deg)" : null)};
    filter: ${({ open, version2 }) =>
      open && version2 ? version2Filter : null};
  }
`;

export default Trigger;
