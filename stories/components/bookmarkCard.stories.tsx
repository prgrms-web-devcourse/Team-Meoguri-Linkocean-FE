import BookmarkCard from "@/components/common/bookmarkCard";
import { BookmarkProps } from "@/components/common/bookmarkCard/bookmarkCard";

export default {
  title: "component/bookmarkCard",
  component: BookmarkCard,
  argTypes: {
    data: {
      type: "text",
      defaultValue: {
        favorite: false,
        // imageUrl: "imageUrl2",
        id: 2,
        title: "다음 웹툰",
        tags: ["Spring", "React"],
        category: "IT",
        url: "https://comic.daum.com/index",
        updatedAt: "2022-01-01",
        openType: "public",
        likeCount: 12,
      },
    },
  },
};

export const Default = (args: BookmarkProps) => <BookmarkCard {...args} />;
