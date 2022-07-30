import Select from "@/components/common/select";
import { useState } from "react";

export default {
  title: "Components/Select",
  component: Select,
};

export const Default = () => (
  <Select>
    <Select.Trigger>선택</Select.Trigger>
    <Select.OptionList>
      <Select.Option value="1">1</Select.Option>
      <Select.Option value="2">2</Select.Option>
      <Select.Option value="3">3</Select.Option>
    </Select.OptionList>
  </Select>
);

export const Width = ({ width }: { width: string }) => (
  <Select width={width}>
    <Select.Trigger>선택</Select.Trigger>
    <Select.OptionList>
      <Select.Option value="1">1</Select.Option>
    </Select.OptionList>
  </Select>
);
Width.argTypes = {
  width: { control: { type: "text" }, defaultValue: "400px" },
};

export const Open = () => (
  <Select open>
    <Select.Trigger>선택</Select.Trigger>
    <Select.OptionList>
      <Select.Option value="1">1</Select.Option>
      <Select.Option value="2">2</Select.Option>
      <Select.Option value="3">3</Select.Option>
    </Select.OptionList>
  </Select>
);

const INIT_OPTION = { value: "art", text: "예술" };
export const WithState = () => {
  const [category, setCategory] = useState(INIT_OPTION.value);

  return (
    <>
      <div>초기 선택 카테고리: {INIT_OPTION.value}</div>
      <div>선택된 카테고리: {category}</div>
      <Select selectedOption={INIT_OPTION} onChange={setCategory}>
        <Select.Trigger>선택</Select.Trigger>
        <Select.OptionList>
          <Select.Option value="self_development">자기계발</Select.Option>
          <Select.Option value="art">예술</Select.Option>
          <Select.Option value="health">건강</Select.Option>
        </Select.OptionList>
      </Select>
    </>
  );
};

export const Scroll = ({
  maxHeight,
  width,
}: {
  maxHeight: string;
  width: string;
}) => (
  <Select open width={width}>
    <Select.Trigger>선택</Select.Trigger>
    <Select.OptionList maxHeight={maxHeight}>
      {Array.from({ length: 20 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Select.Option value={i.toString()} key={i}>
          {i}
        </Select.Option>
      ))}
    </Select.OptionList>
  </Select>
);
Scroll.argTypes = {
  maxHeight: { control: { type: "text" }, defaultValue: "100px" },
  width: { control: { type: "text" }, defaultValue: "100px" },
};
