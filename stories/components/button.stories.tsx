import Button, { ButtonProps } from "@/components/common/button";

export default {
  title: "Component/Button",
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
    buttonText: {
      defaultValue: "button",
      control: { type: "text" },
    },
    width: {
      defaultValue: 30,
      control: { type: "number" },
    },
  },
};

export const Default = (args: ButtonProps) => {
  return <Button {...args} />;
};
