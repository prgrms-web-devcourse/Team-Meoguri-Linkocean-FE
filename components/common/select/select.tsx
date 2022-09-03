import styled from "@emotion/styled";
import Option from "./option";
import OptionList from "./optionList";
import SelectProvider, { SelectProviderProps } from "./selectStore";
import Trigger from "./trigger";

const Select = ({
  width,
  open,
  selectedOption,
  children,
  onChange,
  version2,
}: Partial<SelectProviderProps>) => {
  return (
    <SelectProvider
      width={width}
      open={open}
      selectedOption={selectedOption}
      onChange={onChange}
      version2={version2}
    >
      <Container>{children}</Container>
    </SelectProvider>
  );
};

const Container = styled.div`
  position: relative;
`;

Select.Trigger = Trigger;
Select.OptionList = OptionList;
Select.Option = Option;

export default Select;
