import CategoryItem, {
  CategoryItemProps,
} from "@/components/common/categoryItem";

import { useState } from "react";

export default {
  title: "Components/CategoryItem",
  component: CategoryItem,
  argTypes: {
    name: {
      control: {
        type: "select",
        options: [
          "self_development",
          "humanities",
          "politics",
          "social",
          "art",
          "science",
          "technology",
          "it",
          "home",
          "health",
          "travel",
          "cooking",
        ],
        defaultValue: "self_development",
      },
    },
  },
};

export const Default = (args: CategoryItemProps) => <CategoryItem {...args} />;
Default.args = {
  name: "self_development",
};

export const WithState = (args: CategoryItemProps) => {
  const [on, setOn] = useState(false);

  return (
    <div>
      <CategoryItem
        name="it"
        on={on}
        onChange={(e) => {
          setOn(!on);
          alert(e.target.name);
        }}
      />
      <CategoryItem
        name="self_development"
        on={on}
        onChange={(e) => {
          setOn(!on);
          alert(e.target.name);
        }}
      />
      <CategoryItem
        name="art"
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
