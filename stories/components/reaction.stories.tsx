import Reaction, { ReactionProps } from "@/components/common/reaction";

export default {
  title: "Components/Reaction",
  component: Reaction,
  argTypes: {
    like: {
      defaultValue: 1,
      control: "number",
    },
    hate: {
      defaultValue: 1,
      control: "number",
    },
  },
};

export const Default = ({ ...args }: ReactionProps) => {
  return <Reaction like={args.like} hate={args.hate} />;
};
