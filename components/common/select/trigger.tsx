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
  height: 44px;
  border: 1px solid ${theme.color.$gray600};
  border-radius: ${(props) => (props.open ? "8px 8px 0 0" : "8px")};
  padding: 10px 15px;
  color: ${theme.color.$gray600};
  ${theme.text.$body1};
  text-align: start;
  background: url("/icon/select-arrow.svg") no-repeat center right 15px;
  cursor: pointer;
`;

export default Trigger;
