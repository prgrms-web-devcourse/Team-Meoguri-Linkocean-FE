import Following, { FollowingProps } from "@/components/common/following";

export default {
  title: "components/Following",
  component: Following,
  argTypes: {
    userName: { control: { type: "text" }, defaultValue: "username" },
    following: { control: "boolean", defaultValue: false },
  },
};

export const Default = (args: FollowingProps) => <Following {...args} />;
