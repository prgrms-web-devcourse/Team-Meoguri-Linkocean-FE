import {
  BookmarkDetail,
  BookmarkList,
  Notification,
  ProfileDetail,
} from "./model";

export {
  getBookMarkDetail,
  getBookMarkListEmpty,
  getBookMarkList,
  getProfile,
  getNotifications,
};

const getBookMarkDetail: BookmarkDetail = {
  id: 123,
  title: "네이버 웹툰",
  url: "https://comic.naver.com/index",
  imageUrl:
    "http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg",
  category: "IT",
  memo: "해당 링크는 네이버 카툰 사이트 링크 입니다. 많이 이용해주세요~~",
  openType: "all",
  isFavorite: false,
  updatedAt: "2022-01-01",
  tags: ["Spring", "React"],
  reactionCount: {
    like: 12,
    hate: 10,
  },
  reaction: {
    like: true,
    hate: false,
  },
  profile: {
    profileId: 1,
    username: "crush",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvyT-fcCPkfYWQQ1UwkNyRPevaYT1hpA8dRMYk1zFvar4t5KDrDHji_e74bM_cV-MreDM&usqp=CAU",
    isFollow: true,
  },
};

const getBookMarkListEmpty: BookmarkList = {
  totalCount: 0,
  bookmarks: [],
};

const getBookMarkList: BookmarkList = {
  totalCount: 122,
  bookmarks: [
    {
      id: 1,
      title: "네이버 웹툰",
      url: "https://comic.naver.com/index",
      openType: "all",
      updatedAt: "2022-01-01",
      imageUrl:
        "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_g",
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
    {
      id: 8,
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
  ],
};

const getProfile: ProfileDetail = {
  profileId: 1,
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvyT-fcCPkfYWQQ1UwkNyRPevaYT1hpA8dRMYk1zFvar4t5KDrDHji_e74bM_cV-MreDM&usqp=CAU",
  favoriteCategories: ["인문", "정치", "사회"],
  username: "user",
  bio: "hi i'm user",
  followerCount: 3,
  followeeCount: 2,
  isFollow: true,
  tags: [
    {
      name: "JAVA",
      count: 5,
    },
    {
      name: "JAVASCRIPT",
      count: 5,
    },
  ],
  categories: ["인문", "정치", "사회"],
};

const getNotifications: { notifications: Notification[] } = {
  notifications: [
    {
      type: "SHARE",
      info: {
        bookmark: {
          id: 1,
          title: "네이버",
          link: "https://www.naver.com",
        },
        sender: {
          id: 1,
          username: "haha",
        },
      },
    },
    {
      type: "FEED",
      info: {
        bookmark: {
          id: 2,
          title: "구글",
          link: "https://www.google.com",
        },
        sender: {
          id: 2,
          username: "jacob",
        },
      },
    },
    {
      type: "FEED",
      info: {
        bookmark: {
          id: 2,
          title: "패스트캠퍼스",
          link: "https://fastcampus.co.kr/",
        },
        sender: {
          id: 2,
          username: "jacob",
        },
      },
    },
    {
      type: "OLD",
      info: {
        bookmark: {
          id: 3,
          title: "프로그래머스",
          link: "https://school.programmers.co.kr/my-courses/learning",
        },
      },
    },
  ],
};
