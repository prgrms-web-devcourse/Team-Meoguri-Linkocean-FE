import Tooltip404, { TooltipProps } from "@/components/common/notFoundTooltip";

export default {
  title: "components/notFoundTooltip",
  component: Tooltip404,
  argTypes: {
    index: {
      control: {
        type: "select",
        options: [
          "joy",
          "nadia",
          "hyoni",
          "hani",
          "crush",
          "haha",
          "groot",
          "jacob",
        ],
        defaultValue: "joy",
      },
    },
  },
};

export const Default = (args: TooltipProps) => <Tooltip404 {...args} />;
Default.args = {
  index: "joy",
};
