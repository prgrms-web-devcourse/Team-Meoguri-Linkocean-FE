export const CATEGORY = [
  "자기계발",
  "인문",
  "정치",
  "사회",
  "예술",
  "과학",
  "기술",
  "IT",
  "가정",
  "건강",
  "여행",
  "요리",
] as const;

export const FilterType = {
  favorite: "즐겨찾기",
  tag: "태그",
  category: "카테고리 ",
} as const;
export type FilterKeyType = keyof typeof FilterType;

export const SortType = {
  upload: "최신 순",
  like: "좋아요 순",
} as const;
export type SortKeyType = keyof typeof SortType;

export interface BaseQueryType {
  searchTitle: string;
  order: SortKeyType;
  page: number;
  size: number;
}
export interface FavoriteQueryType extends BaseQueryType {
  favorite: boolean;
}
export interface CategoryQueryType extends BaseQueryType {
  category: typeof CATEGORY[number] | "전체";
}
export interface TagQueryType extends BaseQueryType {
  tags: string[];
}

export type QueryType = FavoriteQueryType | CategoryQueryType | TagQueryType;

export type OpenType = "private" | "all" | "partial";

export type NotificationType = "SHARE" | "FEED" | "OLD";

export type TagType = {
  tag: string;
  count: number;
};

export type Reaction = "like" | "hate";

export type RobotsType =
  | "noindex, nofollow"
  | "index, follow"
  | "noindex, follow"
  | "index, nofollow";

export type FollowTabType = "follower" | "followee";
