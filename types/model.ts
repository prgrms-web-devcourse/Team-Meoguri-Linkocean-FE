import { CATEGORY, NotificationType, OpenType, TagType } from "./type";

export interface Profile {
  profileId: number;
  imageUrl?: string;
  username: string;
  isFollow: boolean;
}

export interface ProfileList {
  profiles: Profile[];
  hasNext: boolean;
}

export interface ProfileDetail {
  profileId: number;
  imageUrl?: string;
  favoriteCategories: typeof CATEGORY[number][];
  categories: typeof CATEGORY[number][];
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
  category: typeof CATEGORY[number] | "no-category";
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
  category: typeof CATEGORY[number] | "no-category";
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
    LIKE: boolean;
    HATE: boolean;
  };
}

export interface BookmarkList {
  totalCount: number;
  bookmarks: (Bookmark & { profile?: Profile })[];
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
