import MyFilterMenu from "@/components/common/filterMenu/myFilterMenu";
import Following from "@/components/common/following";
import PageLayout from "@/components/common/pageLayout";
import UserInfo from "@/components/common/userInfo";
import { getProfile } from "@/types/dummyData";
import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import * as theme from "@/styles/theme";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import {
  DUMMY_FOLLOWE,
  DUMMY_USER_INFO,
  FollowCardContainer,
  Layout,
} from "./my/follow";

const PAGE_SIZE = 8;

type Filtering = {
  username: string;
  page: number;
  size: number;
};

const INITIAL_FILTERING: Filtering = {
  username: "",
  page: 1,
  size: PAGE_SIZE,
};

const Meoguri = () => {
  const router = useRouter();

  const [state, setState] = useState(() => ({
    ...INITIAL_FILTERING,
    username: router.query.name ? (router.query.name as string) : "",
  }));
  const [profiles, setProfiles] = useState(DUMMY_FOLLOWE.profiles);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedUsername = state.username.trim();
    const nextPath = trimmedUsername === "" ? "" : `?name=${trimmedUsername}`;
    router.push(`/meoguri${nextPath}`);
  };

  useEffect(() => {
    setState({ ...state, username: router.query.name as string });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.name]);

  return (
    <>
      <Head>
        <title>LinkOcean | 머구리 찾기</title>
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
            <Title>머구리 찾기</Title>

            <Test>router {router.query.name}</Test>
            <Test>상태 {JSON.stringify(state, null, " ")}</Test>
            <Test>{`API queryString: ${new URLSearchParams(
              Object.entries(state).map(([key, value]) => [
                key,
                value === undefined ? "" : value.toString(),
              ])
            ).toString()}`}</Test>

            <Form onSubmit={handleSubmit}>
              <Input
                searchIcon
                name="name"
                width="400px"
                value={state.username}
                onChange={handleChange}
              />
              <Button
                colorType="main-color"
                buttonType="small"
                type="submit"
                width="67"
              >
                검색
              </Button>
            </Form>

            <FollowCardContainer>
              {profiles.map(({ profileId, imageUrl, isFollow, username }) => (
                <Following
                  profileImg={imageUrl}
                  userName={username}
                  following={isFollow}
                  key={profileId}
                />
              ))}
            </FollowCardContainer>
          </Layout>
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

const Title = styled.h2`
  margin: 10px 0 29px 4px;
  color: ${theme.color.$gray800};
  ${theme.text.$headline5};
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 37px;
`;

const Test = styled.div``;

export default Meoguri;
