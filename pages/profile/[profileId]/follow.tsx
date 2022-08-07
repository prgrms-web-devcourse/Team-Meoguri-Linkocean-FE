import PageLayout from "@/components/common/pageLayout";
import styled from "@emotion/styled";
import Head from "next/head";
import UserInfo from "@/components/common/userInfo";
import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import { getProfile } from "@/types/dummyData";
import FollowRadio from "@/components/follow/followRadio";
import Following from "@/components/common/following";
import { useRouter } from "next/router";
import {
  DUMMY_FOLLOWE,
  FollowCardContainer,
  Form,
  Layout,
} from "@/pages/my/follow";

const Follow = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>LinkOcean | 팔로워</title>
      </Head>

      <PageLayout>
        <PageLayout.Aside>
          <UserInfo data={getProfile} />
          <MyFilterMenu
            tagList={getProfile.tags}
            categoryList={getProfile.categories}
            getCategoryData={() => {}}
            getTagsData={() => {}}
          />
        </PageLayout.Aside>
        <PageLayout.Article>
          <Layout>
            <Test>profileId: {router.query.profileId}</Test>
            <Form action="" onChange={(e) => {}}>
              <FollowRadio
                name="follow"
                id="follower"
                text={`팔로워 (${getProfile.followerCount})`}
                checked
                onChange={(e) => {}}
              />
              <FollowRadio
                name="follow"
                id="followee"
                text={`팔로잉 (${getProfile.followeeCount})`}
                onChange={(e) => {}}
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

const Test = styled.div``;

export default Follow;
