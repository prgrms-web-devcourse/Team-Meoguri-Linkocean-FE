import Textarea, { TextareaProps } from "@/components/common/textarea";
import { useRef, useState } from "react";

export default {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    width: { control: "text", defaultValue: "470px" },
    height: { control: "text", defaultValue: "155px" },
  },
};

export const Default = (args: TextareaProps) => <Textarea {...args} />;

export const StyleCustom = (args: TextareaProps) => (
  <Textarea
    placeholder="placeholder"
    style={{ width: "300px", padding: "20px", fontSize: "30px" }}
    {...args}
  />
);
StyleCustom.parameters = {
  controls: { exclude: ["width", "height"] },
};

export const WithState = (args: TextareaProps) => {
  const [bio, setBio] = useState("I'm groot");

  return (
    <>
      <div>bio: {bio}</div>
      <Textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        {...args}
      />
    </>
  );
};

export const WithRef = (args: TextareaProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <button type="button" onClick={() => inputRef.current?.focus()}>
        textarea focus!
      </button>
      <Textarea ref={inputRef} {...args} />
    </>
  );
};
