import MyFilterMenu, {
  MyFilterMenuProps,
} from "@/components/common/filterMenu/myFilterMenu";

export default {
  title: "Components/filterMenu",
  component: MyFilterMenu,
  argTypes: {
    category: {
      defaultValue: ["1", "2", "3"],
    },
  },
};

export const Default = (args: MyFilterMenuProps) => {
  return <MyFilterMenu {...args} />;
};
