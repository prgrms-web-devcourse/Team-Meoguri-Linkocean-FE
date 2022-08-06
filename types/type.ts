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

export type OpenType = "private" | "all" | "partial";

export type NotificationType = "SHARE" | "FEED" | "OLD";

export type TagType = {
  name: string;
  count: number;
};

export type Reaction = "like" | "hate";
