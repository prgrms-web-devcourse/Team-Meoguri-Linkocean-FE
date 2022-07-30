import Following, { FollowingProps } from "@/components/common/following";

export default {
  title: "components/Following",
  component: Following,
  argTypes: {
    following: { control: "boolean", defaultValue: false },
  },
};

export const Default = (args: FollowingProps) => <Following {...args} />;
