import MyFilterMenu, {
  MyFilterMenuProps,
} from "@/components/common/filterMenu/myFilterMenu";
import { useState, Dispatch, SetStateAction } from "react";

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

export const Default = ({
  tagList,
  categoryList,
}: // setSelectedCategory,
// setSelectedTag,
MyFilterMenuProps) => {
  const [arr1, setArr] = useState<string[]>();
  const [category, setCategory] = useState<string>();
  const getTags = (arr: string[]) => {
    setArr(arr);
    console.log(arr1);
  };
  const getCategory = (element: string) => {
    setCategory(element);
  };

  return (
    <div>
      {arr1?.map((e) => (
        <div>{e}</div>
      ))}
      {category}
      <MyFilterMenu
        tagList={tagList}
        categoryList={categoryList}
        getTags={getTags}
        getData={getCategory}
        // setSelectedCategory={setSelectedCategory}
        // setSelectedTag={setSelectedTag}
      />
    </div>
  );
};
