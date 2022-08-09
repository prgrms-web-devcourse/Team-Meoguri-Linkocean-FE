/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import Pagination from "@/components/common/pagination";
import React, { useCallback, useEffect, useState } from "react";
import { color, text } from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import BookmarkCard from "@/components/common/bookmarkCard";
import { useRouter } from "next/router";
import { getBookMarkList, getProfile } from "@/types/dummyData";
import { BookmarkList, ProfileDetail } from "@/types/model";
import bookmarkAPI from "@/utils/apis/bookmark";
import profileAPI from "@/utils/apis/profile";
import MyBookmark from "@/components/myBookmark/myBookmark";
import { TagType } from "@/types/type";

const dummyTag = [
  {
    tag: "spring",
    count: 2,
  },
  {
    tag: "react",
    count: 2,
  },
  {
    tag: "linkocean",
    count: 2,
  },
];

const Tag = () => {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>("");
  const [userData, setUserData] = useState<ProfileDetail>({
    profileId: 0,
    favoriteCategories: [],
    username: "",
    followerCount: 0,
    followeeCount: 0,
  });
  const getUserData = useCallback(async () => {
    const profileData = await profileAPI.getMyProfile();
    setUserData(profileData.data);
  }, []);

  // useEffect(() => {
  //   const tagsString = tags === undefined ? "" : tags.join(",");
  //   const tagParamsObj = { tag: tagsString };
  //   const searchParams = new URLSearchParams(tagParamsObj);
  //   if (tags !== undefined) {
  //     router.push(`?${searchParams.toString()}`);
  //   }
  // }, [tags]);

  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tag: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj);
    console.log(searchParams.toString());
    if (tags) {
      router.push(`?${searchParams.toString()}`);
    }
  }, [tags]);

  useEffect(() => {
    const categoryParamsObj = { category };
    const searchParams = new URLSearchParams(categoryParamsObj).toString();
    if (category.length !== 0) {
      router.push(`category/?${searchParams}`);
    }
  }, [category]);

  useEffect(() => {
    getUserData();
  }, []);

  const AsideMemo = React.useMemo(
    () => (
      <PageLayout.Aside>
        <UserInfo data={userData} />
        <MyFilterMenu
          categoryList={userData.categories}
          tagList={userData.tags}
          // tagList={dummyTag}
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
        <MyBookmark PageTitle="태그 목록" />
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Tag;
