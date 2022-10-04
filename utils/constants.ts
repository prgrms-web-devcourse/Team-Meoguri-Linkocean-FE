/* eslint-disable import/prefer-default-export */
export const STORAGE_KEY = {
  oauthType: "OAUTH_TYPE",
  token: "LINKOCEAN_TOKEN",
  refreshToken: "LINKOCEAN_REFRESH_TOKEN",
} as const;

export const LINKOCEAN_PATH = {
  login: "/",
  signup: "/signup",
  myFavorite: "/my/favorite",
  myTag: "/my/tag",
  myCategory: "/my/category",
  myFollow: "/my/follow",
  myEdit: "/my/edit",
  myDetail: "/my/detail",
  meoguri: "/meoguri",
  other: "/profile",
  create: "/create",
  notification: "/notification",
  feed: "/feed",
  feedDetail: "/feed/detail",
  notFound: "/404",
} as const;

export const CATEGORY_MAP = {
  자기계발: { color: "#7DCD97", fileName: "self-development" },
  인문: { color: "#60A8D4", fileName: "humanities" },
  정치: { color: "#FFC0CB", fileName: "politics" },
  사회: { color: "#EDD05C", fileName: "social" },
  예술: { color: "#E78565", fileName: "art" },
  과학: { color: "#7B61FF", fileName: "science" },
  기술: { color: "#3E4CA2", fileName: "technology" },
  IT: { color: "#3E7B57", fileName: "it" },
  가정: { color: "#DC6363", fileName: "home" },
  건강: { color: "#516CF6", fileName: "health" },
  여행: { color: "#82DD4A", fileName: "travel" },
  요리: { color: "#966353", fileName: "cooking" },
} as const;
