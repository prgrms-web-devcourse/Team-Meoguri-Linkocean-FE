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
        url: "https://emotion.sh/docs/best-practices",
        updatedAt: "2022-01-01",
        openType: "public",
        likeCount: 12,
      },
    },
  },
};

export const Default = (args: BookmarkProps) => (
  <div>
    <div style={{ display: "flex" }}>
      <BookmarkCard {...args} />
      <BookmarkCard {...args} />
      <BookmarkCard {...args} />
      <BookmarkCard {...args} />
    </div>
    <div style={{ display: "flex" }}>
      <BookmarkCard {...args} />
      <BookmarkCard {...args} />
      <BookmarkCard {...args} />
      <BookmarkCard {...args} />
    </div>
  </div>
);