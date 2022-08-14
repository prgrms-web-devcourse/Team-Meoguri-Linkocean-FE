import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

const INITIAL_OPTION = { value: "", text: "" };

interface SelectContextProps {
  style: { width: string };
  state: {
    open: boolean;
    selectedOption: typeof INITIAL_OPTION;
  };
  actions: {
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleChange: (newValue: typeof INITIAL_OPTION) => void;
  };
}

const SelectContext = createContext<SelectContextProps>(
  {} as SelectContextProps
);
export const useSelect = () => useContext(SelectContext);

export interface SelectProviderProps {
  open?: boolean;
  selectedOption?: typeof INITIAL_OPTION;
  width?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

const SelectProvider = ({
  width = "120px",
  children,
  onChange,
  ...props
}: SelectProviderProps) => {
  const [open, setOpen] = useState(props.open ?? false);
  const [selectedOption, setSelectedOption] = useState(
    props.selectedOption ?? INITIAL_OPTION
  );

  useEffect(() => {
    if (props.selectedOption) {
      setSelectedOption(props.selectedOption);
    }
  }, [props.selectedOption]);

  const handleChange = (newValue: typeof INITIAL_OPTION) => {
    setSelectedOption(newValue);

    if (onChange) {
      onChange(newValue.value);
    }
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    style: { width },
    state: { open, selectedOption },
    actions: { setOpen, handleChange },
  };

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

export default SelectProvider;
