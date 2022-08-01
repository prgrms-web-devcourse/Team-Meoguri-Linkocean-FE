import CategoryItem, {
  CategoryItemProps,
} from "@/components/common/categoryItem";
import { CATEGORY } from "@/types/type";

import { useState } from "react";

export default {
  title: "Components/CategoryItem",
  component: CategoryItem,
  argTypes: {
    name: {
      control: {
        type: "select",
        options: CATEGORY,
        defaultValue: "자기계발",
      },
    },
  },
};

export const Default = (args: CategoryItemProps) => <CategoryItem {...args} />;
Default.args = {
  name: "자기계발",
};

export const WithState = (args: CategoryItemProps) => {
  const [on, setOn] = useState(false);

  return (
    <div>
      <CategoryItem
        name="IT"
        on={on}
        onChange={(e) => {
          setOn(!on);
          alert(e.target.name);
        }}
      />
      <CategoryItem
        name="자기계발"
        on={on}
        onChange={(e) => {
          setOn(!on);
          alert(e.target.name);
        }}
      />
      <CategoryItem
        name="예술"
        on={on}
        onChange={(e) => {
          setOn(!on);
          alert(e.target.name);
        }}
      />
    </div>
  );
};
WithState.parameters = {
  controls: { exclude: "name" },
};
