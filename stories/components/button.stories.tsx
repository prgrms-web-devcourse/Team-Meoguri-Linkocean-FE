import Button, { ButtonProps } from "@/components/common/button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    buttonType: {
      defaultValue: "small",
      options: ["small", "large", "line"],
      control: { type: "radio" },
    },
    colorType: {
      defaultValue: "main-color",
      options: ["main-color", "skyblue", "aqua", "gray"],
      control: { type: "radio" },
    },
    width: {
      control: { type: "text" },
    },
    height: {
      defaultValue: "45",
      control: { type: "text" },
    },
  },
};

export const Default = (args: ButtonProps) => {
  return <Button {...args}>button</Button>;
};
