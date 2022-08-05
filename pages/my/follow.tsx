import PageLayout from "@/components/common/pageLayout";
import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import Head from "next/head";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import { getProfile } from "@/types/dummyData";
import FollowRadio from "@/components/follow/followRadio";
import Following from "@/components/common/following";

const Follow = () => {
  return (
    <>
      <Head>
        <title>LinkOcean | 팔로워</title>
      </Head>

      <PageLayout>
        <PageLayout.Aside>
          <UserInfo data={DUMMY_USER_INFO} />
          <MyFilterMenu
            tagList={getProfile.tags}
            categoryList={getProfile.categories}
            getCategoryData={() => {}}
            getTagsData={() => {}}
          />
        </PageLayout.Aside>
        <PageLayout.Article>
          <Layout>
            <Form action="" onChange={(e) => {}}>
              <FollowRadio
                name="follow"
                id="follower"
                text={`팔로워 (${DUMMY_USER_INFO.followerCount})`}
                checked
              />
              <FollowRadio
                name="follow"
                id="followee"
                text={`팔로잉 (${DUMMY_USER_INFO.followeeCount})`}
              />
            </Form>
            <FollowCardContainer>
              {DUMMY_FOLLOWE.profiles.map(
                ({ profileId, imageUrl, isFollow, username }) => (
                  <Following
                    profileImg={imageUrl}
                    userName={username}
                    following={isFollow}
                    key={profileId}
                  />
                )
              )}
            </FollowCardContainer>
          </Layout>
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 835px;
  margin: 0 auto;
`;

const Form = styled.form`
  margin-bottom: 37px;
  text-align: center;
`;

const FollowCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 31px;
  width: 835px;
`;

export default Follow;

const { isFollow, ...DUMMY_USER_INFO } = getProfile;

const DUMMY_FOLLOWE = {
  profiles: [
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },

    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },

    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
    {
      profileId: 1,
      imageUrl: "image_url1",
      username: "hyoni",
      isFollow: true,
    },
    {
      profileId: 2,
      imageUrl: "image_url2",
      username: "nadia",
      isFollow: true,
    },
  ],
};
