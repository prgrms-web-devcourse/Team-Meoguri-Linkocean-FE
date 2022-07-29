import Checkbox, { CheckboxProps } from "@/components/common/checkbox";
import { useState } from "react";

export default {
  title: "components/Checkbox",
  component: Checkbox,
};

export const Default = (args: CheckboxProps) => <Checkbox {...args} />;

export const WithState = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <div>checked: {checked.toString()}</div>
      <Checkbox on={checked} onChange={() => setChecked(!checked)} {...args} />
    </div>
  );
};
