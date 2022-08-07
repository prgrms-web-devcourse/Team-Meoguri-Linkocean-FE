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
import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import profileAPI from "@/utils/apis/profile";
import { Profile } from "@/types/model";
import {
  DUMMY_FOLLOWE,
  DUMMY_USER_INFO,
  FollowCardContainer,
  Layout,
} from "./my/follow";

// TODO: 본인 제외하기, 무한 스크롤, 유저 컨텍스트 연결

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

  const [state, setState] = useState(INITIAL_FILTERING);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProfiles = useCallback(
    async (username: string) => {
      setIsLoading(true);

      const queryString = `username=${username}&page=${state.page}&size=${state.size}`;

      try {
        const response = await profileAPI.getProfilesByUsername(queryString);
        setProfiles(response.data.profiles);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    },
    [state.page, state.size]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedUsername = state.username.trim();
    const isEmptyString = trimmedUsername === "";
    if (isEmptyString) {
      return;
    }

    router.push(`/meoguri?name=${trimmedUsername}`);
  };

  useEffect(() => {
    if (router.query.name === undefined) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      username: router.query.name as string,
    }));
    getProfiles(router.query.name as string);
  }, [router.query.name, getProfiles]);

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
            <Test>{`API queryString: ${Object.entries(state)
              .map((entry) => entry.join("="))
              .join("&")}
            `}</Test>

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

            {isLoading ? "로딩 중..." : null}
            <MeoguriCardContainer isLoading={isLoading}>
              {!isLoading &&
              router.query.name !== undefined &&
              profiles.length === 0
                ? "검색 결과가 없습니다."
                : profiles.map(({ profileId, imageUrl, isFollow, username }) =>
                    profileId === DUMMY_USER_INFO.profileId ? null : (
                      <Following
                        profileImg={imageUrl}
                        userName={username}
                        following={isFollow}
                        key={profileId}
                      />
                    )
                  )}
            </MeoguriCardContainer>
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

const MeoguriCardContainer = styled(FollowCardContainer)<{
  isLoading: boolean;
}>`
  display: ${(props) => (props.isLoading ? "none" : "flex")};
`;

const Test = styled.div``;

export default Meoguri;
