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
import profileAPI from "@/utils/apis/profile";
import { getBookMarkList, getProfile } from "@/types/dummyData";
import { ProfileDetail } from "@/types/model";
import MyBookmark from "@/components/myBookmark/myBookmark";

const Favorite = () => {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>();
  const [category, setCategory] = useState<string>();
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
  }, [userData]);

  useEffect(() => {
    const tagsString = tags === undefined ? "" : tags.join(",");
    const tagParamsObj = { tag: tagsString };
    const searchParams = new URLSearchParams(tagParamsObj).toString();
    if (tags !== undefined) {
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
          isFavorite
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
        <MyBookmark PageTitle="즐겨찾기 목록" />
      </PageLayout.Article>
    </PageLayout>
  );
};

const Wrapper = styled.div`
  margin: auto;
  width: 835px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const Title = styled.h1`
  ${text.$headline4}
  color:${color.$gray800};
  margin: 9px 0 0 15px;
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentDiv = styled.div`
  padding-top: 2px;
`;

const SelectDiv = styled.div`
  z-index: 1;
`;
const SearchDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 26px;
`;
export default Favorite;
