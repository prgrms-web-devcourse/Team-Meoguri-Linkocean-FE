import Tooltip404, { TooltipProps } from "@/components/common/404tooltip";

export default {
  title: "components/Tooltip404",
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
