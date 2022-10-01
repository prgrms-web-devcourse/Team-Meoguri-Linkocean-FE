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
