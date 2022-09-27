import SelectCheckbox from "@/components/common/selectCheckbox";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

export default {
  title: "components/SelectCheckbox",
  component: SelectCheckbox,
  argTypes: {},
} as ComponentMeta<typeof SelectCheckbox>;

const tags = [
  {
    tag: "태그 입니다",
    count: 12,
  },
  {
    tag: "라이브러리",
    count: 11,
  },
  {
    tag: "공부",
    count: 1,
  },
  {
    tag: "IT",
    count: 148,
  },
  {
    tag: "즐겨찾기",
    count: 12,
  },
  {
    tag: "즐겨찾기1",
    count: 12,
  },
  {
    tag: "즐겨찾기2",
    count: 12,
  },
  {
    tag: "즐겨찾기3",
    count: 12,
  },
];

export const Default: ComponentStory<typeof SelectCheckbox> = () => {
  const [checkedList, setCheckedList] = useState(["공부", "즐겨찾기"]);

  return (
    <>
      <SelectCheckbox
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        tags={tags}
      />
      <p>{checkedList.join(",")}</p>
    </>
  );
};
