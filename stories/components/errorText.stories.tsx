import ErrorText from "@/components/common/errorText";
import { HTMLAttributes } from "react";

export default {
  title: "Components/ErrorText",
  component: ErrorText,
  argTypes: {
    children: { control: { type: "text" }, defaultValue: "햄치즈양상추" },
  },
};

export const Default = ({
  children,
  ...args
}: HTMLAttributes<HTMLSpanElement>) => (
  <div style={{ width: "200px" }}>
    <div>빵</div>
    <ErrorText {...args}>{children}</ErrorText>
    <div>빵</div>
  </div>
);

export const Long = (args: HTMLAttributes<HTMLSpanElement>) => (
  <div style={{ width: "200px", border: "1px solid brown" }}>
    <div>빵</div>
    <ErrorText {...args}>
      햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄햄
    </ErrorText>
    <div>빵</div>
  </div>
);
Long.parameters = {
  controls: { exclude: "children" },
};
