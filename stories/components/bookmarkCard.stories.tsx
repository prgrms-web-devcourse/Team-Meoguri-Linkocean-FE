import BookmarkCard from "@/components/common/bookmarkCard";
import { Bookmark } from "@/types/model";

export default {
  title: "components/bookmarkCard",
  component: BookmarkCard,
};

export const Default = () => (
  <>
    {cardData.map((data) => {
      return <BookmarkCard key={data.id} data={data} />;
    })}
  </>
);

const cardData: Bookmark[] = [
  {
    id: 1,
    title: "네이버 웹툰",
    url: "https://comic.naver.com/index",
    openType: "all",
    updatedAt: "2022-01-01",
    imageUrl:
      "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
    likeCount: 122,
    isFavorite: false,
    isWriter: true,
    tags: ["Spring", "네이버", "자주사용하는"],
  },
  {
    id: 2,
    title: "emotion",
    url: "https://emotion.sh/docs/best-practices",
    openType: "all",
    category: "IT",
    updatedAt: "2022-12-02",
    imageUrl:
      "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    likeCount: 222,
    isFavorite: false,
    isWriter: true,
    tags: ["style", "React", "라이브러리"],
  },
  {
    id: 3,
    title: "네이버 웹툰",
    url: "https://comic.naver.com/index",
    openType: "all",
    category: "건강",
    updatedAt: "2022-02-04",
    imageUrl:
      "http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg",
    likeCount: 34,
    isFavorite: false,
    isWriter: true,
    tags: ["Spring", "React"],
  },
  {
    id: 4,
    title: "카페추천",
    url: "https://comic.naver.com/index",
    openType: "all",
    category: "가정",
    updatedAt: "2022-02-31",
    imageUrl:
      "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    likeCount: 83,
    isFavorite: false,
    isWriter: true,
    tags: ["Spring", "React"],
  },
  {
    id: 5,
    title: "음원 사이트",
    url: "https://comic.naver.com/index",
    openType: "all",
    category: "IT",
    updatedAt: "2022-07-22",
    imageUrl: "https://byline.network/wp-content/uploads/2018/05/cat.png",
    likeCount: 64,
    isFavorite: false,
    isWriter: true,
    tags: ["Spring", "React"],
  },
  {
    id: 6,
    title: "멜론",
    url: "https://comic.naver.com/index",
    openType: "all",
    category: "IT",
    updatedAt: "2022-08-23",
    imageUrl:
      "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    likeCount: 134,
    isFavorite: false,
    isWriter: true,
    tags: ["Spring", "React"],
  },
  {
    id: 7,
    title: "고양이",
    url: "https://byline.network/2018/05/21-20/",
    openType: "all",
    category: "요리",
    updatedAt: "2022-06-26",
    imageUrl:
      "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    likeCount: 23432,
    isFavorite: false,
    isWriter: true,
    tags: ["Spring", "React"],
  },
];
