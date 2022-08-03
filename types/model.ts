import { CATEGORY, NotificationType, OpenType } from "./type";

export interface Profile {
  profileId: number;
  imageUrl?: string;
  username: string;
  isFollow: boolean;
}

export interface ProfileDetail {
  profileId: number;
  imageUrl?: string;
  categories: string[];
  username: string;
  bio?: string;
  followerCount: number;
  followeeCount: number;
}

export interface Bookmark {
  isFavorite: boolean;
  imageUrl?: string;
  id: number;
  title: string;
  tags?: string[];
  category?: typeof CATEGORY[number];
  url: string;
  updatedAt: string;
  openType: OpenType;
  likeCount: number;
  isWriter: boolean;
}

export interface BookmarkDetail {
  id: number;
  url: string;
  title: string;
  imageUrl?: string;
  category?: typeof CATEGORY[number];
  memo?: string;
  openType: OpenType;
  favorite: boolean;
  profile: Profile;
  updatedAt: string;
  tags?: string[];
  reactionCount: {
    like: number;
    hate: number;
  };
}

export interface Notification {
  type: NotificationType;
  info: {
    bookmark: {
      id: number;
      title: string;
      link: string;
    };
    sender?: {
      id: number;
      username: string;
    };
  };
}
