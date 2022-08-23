import Reaction, { ReactionProps } from "@/components/common/reaction";

export default {
  title: "Components/Reaction",
  component: Reaction,
  argTypes: {
    id: {
      defaultValue: 1,
      control: "number",
    },
    like: {
      defaultValue: 1,
      control: "number",
    },
    hate: {
      defaultValue: 1,
      control: "number",
    },
    isLike: {
      defaultValue: false,
      control: "boolean",
    },
    isHate: {
      defaultValue: false,
      control: "boolean",
    },
  },
};

export const Default = ({ ...args }: ReactionProps) => {
  return (
    <Reaction
      id={args.id}
      like={args.like}
      hate={args.hate}
      isLike={args.isLike}
      isHate={args.isHate}
    />
  );
};
