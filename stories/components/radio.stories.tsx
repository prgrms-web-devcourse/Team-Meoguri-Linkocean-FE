import Radio from "@/components/common/radio";
import { ComponentStory } from "@storybook/react";

export default {
  title: "Components/Radio",
  component: Radio,
};

export const Default: ComponentStory<typeof Radio> = (args) => (
  <Radio {...args} />
);
