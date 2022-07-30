import MyFilterMenu, {
  MyFilterMenuProps,
} from "@/components/common/filterMenu/myFilterMenu";
import { useState } from "react";

export default {
  title: "Components/FilterMenu",
  component: MyFilterMenu,
  argTypes: {
    tagList: {
      defaultValue: [
        {
          name: "JAVA",
          count: 5,
        },
        {
          name: "JAVASCRIPT",
          count: 5,
        },
        {
          name: "PYTHON",
          count: 5,
        },
        {
          name: "C++",
          count: 5,
        },
        {
          name: "C",
          count: 5,
        },
        {
          name: "C#",
          count: 5,
        },
        {
          name: "RUBY",
          count: 5,
        },
        {
          name: "GOLANG",
          count: 5,
        },
      ],
    },
    categoryList: {
      defaultValue: [
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
    },
  },
};

export const Default = ({ tagList, categoryList }: MyFilterMenuProps) => {
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>();
  const getTags = (elements: string[]) => {
    setTags(elements);
  };
  const getCategory = (element: string) => {
    setCategory(element);
  };

  return (
    <div>
      {tags?.map((element) => (
        <div key={element}>{element}</div>
      ))}
      {category}
      <MyFilterMenu
        tagList={tagList}
        categoryList={categoryList}
        getTags={getTags}
        getData={getCategory}
      />
    </div>
  );
};
