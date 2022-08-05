import Tag from "@/components/create/tag";
import { useState } from "react";

export default {
  title: "Components/Tag",
  component: Tag,
  argTypes: {},
};

export const Default = () => {
  const [tag, setTag] = useState(["태그", "실행돼라!!"]);
  return <Tag tag={tag} setTag={setTag} />;
};
