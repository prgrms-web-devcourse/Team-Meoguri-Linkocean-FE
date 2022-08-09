/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { color, text } from "@/styles/theme";
import { useRouter } from "next/router";
import bookmarkAPI from "@/utils/apis/bookmark";
import profileAPI from "@/utils/apis/profile";
import { BookmarkList, ProfileDetail } from "@/types/model";
import MyBookmark from "@/components/myBookmark/myBookmark";

const Category = () => {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>();
  const [sort, setSort] = useState<"like" | "update" | "">("");
  const [requestQuery, setRequestQuery] = useState({
    page: 1,
    size: 8,
    order: "update",
    tags: "",
    category: "",
    searchTitle: "",
    favorite: "",
  });

  const [userData, setUserData] = useState<ProfileDetail>({
    profileId: 0,
    favoriteCategories: [],
    username: "",
    followerCount: 0,
    followeeCount: 0,
  });

  const [myBookmarks, setMyBookmarks] = useState<BookmarkList>({
    totalCount: 0,
    bookmarks: [],
  });
  const getQueryString = (obj: object) =>
    Object.entries(obj)
      .map((entry) => entry.join("="))
      .join("&");

  useEffect(() => {
    const pageCategory: string =
      typeof router.query.category === "string" ? router.query.category : "";
    setRequestQuery({ ...requestQuery, category: pageCategory });
    getUserData();
    getMyBookmarks(requestQuery);
  }, [router]);

  // useEffect(() => {
  //   const categoryParamsObj = category ? { category } : { category: "" };
  //   const categorySearchParams = new URLSearchParams(
  //     categoryParamsObj
  //   ).toString();
  //   if (category !== undefined) {
  //     router.push(`category/?${categorySearchParams}`);
  //   }
  //   const tagsString = tags === undefined ? "" : tags.join(",");
  //   const tagParamsObj = { tag: tagsString };
  //   const tagSearchParams = new URLSearchParams(tagParamsObj).toString();
  //   if (tags.length !== 0) {
  //     router.push(`tag/?${tagSearchParams}`);
  //   }
  // }, [category, tags]);
  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tag: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags.length !== 0) {
      router.push(`tag/?${searchParams}`);
    }
  }, [tags]);

  useEffect(() => {
    const categoryParamsObj = category ? { category } : { category: "" };
    const searchParams = new URLSearchParams(categoryParamsObj).toString();
    if (category !== undefined) {
      router.push(`category/?${searchParams}`);
    }
  }, [category]);

  const getMyBookmarks = useCallback(
    async (q: typeof requestQuery) => {
      const queryString = getQueryString(q);
      const response = await bookmarkAPI.getFeedBookmarks(queryString);
      setMyBookmarks(response.data);
    },
    [myBookmarks]
  );

  const getUserData = useCallback(async () => {
    console.log("hello");
    const profileData = await profileAPI.getMyProfile();
    setUserData(profileData.data);
  }, [userData]);

  const AsideMemo = React.useMemo(
    () => (
      <PageLayout.Aside>
        <UserInfo data={userData} />
        <MyFilterMenu
          categoryList={userData.categories}
          tagList={userData.tags}
          getCategoryData={setCategory}
          getTagsData={setTags}
        />
      </PageLayout.Aside>
    ),
    [userData]
  );
  return (
    <PageLayout>
      {AsideMemo}
      <PageLayout.Article>
        <MyBookmark PageTitle="카테고리 목록" />
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Category;
