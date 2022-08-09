import { CATEGORY, NotificationType, OpenType, TagType } from "./type";

export interface Profile {
  profileId: number;
  imageUrl?: string;
  username: string;
  isFollow: boolean;
}

export interface ProfileList {
  profiles: Profile[];
}

export interface ProfileDetail {
  profileId: number;
  imageUrl?: string;
  favoriteCategories: string[];
  categories?: string[];
  username: string;
  bio?: string;
  followerCount: number;
  followeeCount: number;
  isFollow?: boolean;
  tags?: TagType[];
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
  isFavorite: boolean;
  profile: Profile;
  updatedAt: string;
  tags?: string[];
  reactionCount: {
    LIKE: number;
    HATE: number;
  };
  reaction: {
    LIKE: true;
    HATE: false;
  };
}

export interface BookmarkList {
  totalCount: number;
  bookmarks: Bookmark[];
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
