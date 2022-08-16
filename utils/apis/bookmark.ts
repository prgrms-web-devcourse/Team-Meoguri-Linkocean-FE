import { CATEGORY, OpenType } from "@/types/type";
import { BookmarkDetail, BookmarkList } from "@/types/model";
import { authInstance } from "./instance";

export type CreateBookmarkPayload = {
  url: string;
} & EditBookmarkPayload;

export type EditBookmarkPayload = {
  title: string;
  memo: string;
  category: typeof CATEGORY[number] | "no-category";
  tags: string[];
  openType: OpenType;
};

const bookmarkAPI = {
  createBookmark: (payload: CreateBookmarkPayload) =>
    authInstance.post<{ id: number }>("/bookmarks", payload),
  editBookmark: (bookmarkId: number, payload: EditBookmarkPayload) =>
    authInstance.put(`/bookmarks/${bookmarkId}`, payload),
  deleteBookmark: (bookmarkId: number) =>
    authInstance.delete(`/bookmarks/${bookmarkId}`),
  getBookmarkDetail: (bookmarkId: number) =>
    authInstance.get<BookmarkDetail>(`/bookmarks/${bookmarkId}`),
  getMyBookmarks: (queryString: string) =>
    authInstance.get(`/bookmarks/me?${queryString}`),
  getOtherBookmarks: (profileId: number, queryString: string) =>
    authInstance.get<BookmarkList>(
      `/bookmarks/others/${profileId}?${queryString}`
    ),
  getFeedBookmarks: (queryString: string) =>
    authInstance.get<BookmarkList>(`/bookmarks/feed?${queryString}`),
  getLinkMetadata: (url: string) =>
    authInstance.post<{ title: string }>(`/linkmetadatas/obtain`, {
      url,
    }),
  getIsDuplicateUrl: (url: string) =>
    authInstance.get<{ isDuplicateUrl: boolean }>(`/bookmarks?url=${url}`),
  createFavorite: (bookmarkId: string) =>
    authInstance.post(`/bookmarks/${bookmarkId}/favorite`),
  deleteFavorite: (bookmarkId: string) =>
    authInstance.post(`/bookmarks/${bookmarkId}/unfavorite`),
};

export default bookmarkAPI;
