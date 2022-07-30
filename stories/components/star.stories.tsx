import Star from "@/components/common/bookmarkCard/star";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "components/Star",
  component: Star,
  argTypes: {
    favorit: {
      control: "boolean",
    },
    size: {
      control: "number",
    },
  },
} as ComponentMeta<typeof Star>;
export const Default: ComponentStory<typeof Star> = (args) => {
  return (
    <Star
      onClick={() => {
        alert("클릭");
      }}
      {...args}
    />
  );
};
