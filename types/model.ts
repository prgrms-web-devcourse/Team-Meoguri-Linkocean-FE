import { Category, OpenType } from "./type";

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
  favorite: boolean;
  imageUrl?: string;
  id: number;
  title: string;
  tags?: string[];
  category?: Category;
  url: string;
  updatedAt: string;
  openType: OpenType;
  likeCount: number;
}

export interface BookmarkDetail {
  id: number;
  url: string;
  title: string;
  imageUrl?: string;
  category?: Category;
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
  username: string;
  title: string;
  url: string;
}
