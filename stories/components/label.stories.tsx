import Label from "@/components/common/label";
import { HTMLAttributes } from "react";

export default {
  title: "components/Label",
  component: Label,
  argTypes: {
    label: { control: { type: "text" }, defaultValue: "Label" },
  },
};

export const Default = ({ label }: { label: string }) => <Label>{label}</Label>;

export const HTMLFor = (args: HTMLAttributes<HTMLLabelElement>) => {
  return (
    <>
      <Label htmlFor="meoguri" {...args}>
        머구리 화이팅
      </Label>
      <input type="checkbox" id="meoguri" />
    </>
  );
};
HTMLFor.parameters = {
  controls: { exclude: "label" },
};
