import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { useSelect } from "./selectStore";

interface OptionProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
}

const Option = ({ value, ...props }: OptionProps) => {
  const {
    state: { open },
    actions: { setOpen, handleChange },
  } = useSelect();

  return (
    <StyledItem
      onClick={() => {
        handleChange({ value, text: props.children as string });
        setOpen(!open);
      }}
      {...props}
    />
  );
};

const StyledItem = styled.li`
  height: 30px;
  padding: 3px 15px;
  color: ${theme.color.$gray600};
  ${theme.text.$body1};
  list-style: none;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: ${theme.color.$skyBlue}20;
  }
`;

export default Option;
