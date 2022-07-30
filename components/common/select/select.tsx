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
}: Partial<SelectProviderProps>) => {
  return (
    <SelectProvider
      width={width}
      open={open}
      selectedOption={selectedOption}
      onChange={onChange}
    >
      {children}
    </SelectProvider>
  );
};

Select.Trigger = Trigger;
Select.OptionList = OptionList;
Select.Option = Option;

export default Select;
