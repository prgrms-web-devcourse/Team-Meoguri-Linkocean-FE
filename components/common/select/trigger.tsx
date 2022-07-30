import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { useSelect } from "./selectStore";

const Trigger = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const {
    style: { width },
    state: { open, selectedOption },
    actions: { setOpen },
  } = useSelect();

  return (
    <StyledButton
      type="button"
      open={open}
      style={{ width }}
      onClick={() => setOpen(() => !open)}
      {...props}
    >
      {selectedOption.text !== "" ? selectedOption.text : children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ open: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  border: 1px solid ${theme.color.$gray600};
  border-radius: ${(props) => (props.open ? "8px 8px 0 0" : "8px")};
  padding: 10px 15px;
  color: ${theme.color.$gray600};
  background-color: #fff;
  ${theme.text.$body1};
  text-align: start;
  cursor: pointer;

  &::after {
    content: "";
    display: inline-block;
    width: 14px;
    height: 8px;
    background: url("/icon/select-arrow.svg") center;
    transform: ${(props) => (props.open ? " rotate(180deg)" : null)};
  }
`;

export default Trigger;
