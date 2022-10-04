import CategoryTag from "@/components/common/userInfo/categoryTag";
import { CATEGORY } from "@/types/type";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "components/CategoryTag",
  component: CategoryTag,
  argTypes: {},
} as ComponentMeta<typeof CategoryTag>;
export const Default: ComponentStory<typeof CategoryTag> = () => {
  return (
    <div>
      {CATEGORY.map((name) => (
        <CategoryTag name={name} />
      ))}
    </div>
  );
};
