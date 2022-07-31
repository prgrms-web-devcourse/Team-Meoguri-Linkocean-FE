import Pagination from "@/components/common/pagination";
import { ComponentStory } from "@storybook/react";
import { useState } from "react";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    count: { control: { type: "number" }, defaultValue: 5 },
  },
};

export const Default: ComponentStory<typeof Pagination> = (args) => {
  const [page, setPage] = useState(1);

  return (
    <div>
      <div>{page}</div>
      <Pagination
        {...args}
        onChange={(currentPage: number) => setPage(currentPage)}
      />
    </div>
  );
};

export const Long: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} onChange={() => {}} defaultPage={1000} count={9999} />
);
Long.parameters = {
  controls: { exclude: "count" },
};
