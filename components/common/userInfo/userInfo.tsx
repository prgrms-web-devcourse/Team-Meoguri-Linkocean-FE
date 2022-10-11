import { ProfileDetail } from "@/types/model";
import styled from "@emotion/styled";
import { text, color } from "@/styles/theme";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import FollowAPI from "@/utils/apis/follow";
import { useProfileState } from "@/hooks/useProfile";
import Button from "../button";
import ProfileImage from "../profileImage";
import CategoryTag from "./categoryTag";

export interface UserInfoProps {
  data?: ProfileDetail & { isFollow?: boolean };
  handleClick?: (profileId: number) => void;
}

const defaultUserData: ProfileDetail = {} as ProfileDetail;

const UserInfo = ({ data, handleClick }: UserInfoProps) => {
  const [userData, setUserData] = useState<ProfileDetail>(defaultUserData);
  const loginUser = useProfileState();
  const {
    username,
    imageUrl,
    bio,
    followeeCount,
    followerCount,
    profileId,
    favoriteCategories,
  } = userData;

  useEffect(() => {
    if (data) {
      setUserData(data);
    } else {
      setUserData(loginUser);
    }
  }, [data, loginUser]);

  const handleFollow = useCallback(async () => {
    try {
      await FollowAPI.createFollow(profileId);
      if (handleClick) {
        handleClick(profileId);
      }
      alert("팔로우 완료");
    } catch (error) {
      console.error(error);
    }
  }, [profileId, handleClick]);

  const handleUnfollow = useCallback(async () => {
    try {
      await FollowAPI.deleteFollow(profileId);
      if (handleClick) {
        handleClick(profileId);
      }
      alert("팔로우 취소");
    } catch (error) {
      console.error(error);
    }
  }, [profileId, handleClick]);

  return (
    <Card>
      <UserImg size="lg" src={imageUrl} />
      <InnerWrapper>
        <InnerTop>
          <div>
            <UserName>{username}</UserName>
            <FollowWrapper>
              <Link
                href={
                  userData.profileId === loginUser.profileId
                    ? "/my/follow"
                    : `/profile/${profileId}/follow`
                }
                passHref
              >
                <FollowInfo>팔로워 {followerCount}</FollowInfo>
              </Link>
              <StyledDiv />
              <Link
                href={
                  userData.profileId === loginUser.profileId
                    ? "/my/follow"
                    : `/profile/${profileId}/follow`
                }
                passHref
              >
                <FollowInfo>팔로잉 {followeeCount}</FollowInfo>
              </Link>
            </FollowWrapper>
          </div>
          {userData.profileId === loginUser.profileId && (
            <Link href="/my/edit" passHref>
              <Button buttonType="large" colorType="skyblue" width="127">
                프로필 수정
              </Button>
            </Link>
          )}
          {userData.profileId !== loginUser.profileId &&
            (userData.isFollow ? (
              <Button
                buttonType="line"
                colorType="skyblue"
                width="127"
                onClick={handleUnfollow}
              >
                팔로우 취소
              </Button>
            ) : (
              <Button
                buttonType="large"
                colorType="skyblue"
                width="127"
                onClick={handleFollow}
              >
                팔로우 +
              </Button>
            ))}
        </InnerTop>
        <InnerBottom>
          <Categories>
            <p>선호 카테고리</p>
            {favoriteCategories?.map((category) => (
              <CategoryTag name={category} />
            ))}
          </Categories>
          <pre>
            <Bio>{bio}</Bio>
          </pre>
        </InnerBottom>
      </InnerWrapper>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  gap: 5%;
  cursor: default;
`;

const InnerWrapper = styled.div`
  align-items: center;
  width: 100%;
`;

const InnerTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InnerBottom = styled.div`
  margin-top: 10px;
  div > div {
    margin-right: 9px;
    margin-bottom: 7px;
  }
`;

const UserImg = styled(ProfileImage)`
  margin: 0px 15px 0px 0px;
`;

const UserName = styled.div`
  ${text.$headline5}
  margin: auto 0;
  margin-bottom: 5px;
`;

const FollowWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-top: 5px;
`;

const FollowInfo = styled.div`
  ${text.$caption};
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const StyledDiv = styled.div`
  width: 10px;
`;

const Categories = styled.div`
  margin-bottom: 25px;
  p {
    margin-top: 20px;
    margin-bottom: 6px;
  }
`;

const Bio = styled.div`
  margin-bottom: 10px;
  overflow-y: auto;
  word-break: break-all;
  white-space: pre-line;
  ${text.$body1};

  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: ${color.$gray600};
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;

export default UserInfo;
