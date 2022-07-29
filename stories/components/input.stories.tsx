import Input, { InputProps } from "@/components/common/input";
import { useRef, useState } from "react";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    searchIcon: { control: "boolean", defaultValue: false },
  },
};

export const Default = (args: InputProps) => <Input {...args} />;

export const StyleCustom = (args: InputProps) => (
  <Input
    placeholder="placeholder"
    style={{ width: "300px", padding: "20px", fontSize: "30px" }}
    {...args}
  />
);
StyleCustom.parameters = {
  controls: {
    exclude: "searchIcon",
  },
};

export const WithState = (args: InputProps) => {
  const [password, setPassword] = useState("");

  return (
    <>
      <div>비밀번호: {password}</div>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        {...args}
      />
    </>
  );
};
WithState.parameters = {
  controls: {
    exclude: "searchIcon",
  },
};

export const WithRef = (args: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button type="button" onClick={() => inputRef.current?.focus()}>
        input focus!
      </button>
      <Input ref={inputRef} {...args} />
    </>
  );
};
WithRef.parameters = {
  controls: {
    exclude: "searchIcon",
  },
};
