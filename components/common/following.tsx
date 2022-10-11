import styled from "@emotion/styled";
import ProfileImage from "@/components/common/profileImage";
import Button from "@/components/common/button";
import { useCallback, useState } from "react";
import FollowAPI from "@/utils/apis/follow";
import Link from "next/link";
import { ProfileDetail } from "@/types/model";

export interface FollowingProps {
  isMine?: boolean;
  profileId: number;
  profileImg?: string;
  userName: string;
  following: boolean;
  data?: ProfileDetail & { isFollow?: boolean };
  handleClick?: (profileId: number) => void;
}

const Following = ({
  isMine,
  profileId,
  profileImg,
  userName,
  following,
  handleClick,
  data,
  ...props
}: FollowingProps) => {
  const [state, setState] = useState(following);

  const handleFollow = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      try {
        await FollowAPI.createFollow(profileId);
        setState(true);
        if (handleClick) {
          handleClick(profileId);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [profileId, handleClick]
  );

  const handleUnfollow = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      try {
        await FollowAPI.deleteFollow(profileId);
        setState(false);
        if (handleClick) {
          handleClick(profileId);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [profileId, handleClick]
  );

  return (
    <Link
      href={isMine ? "/my/favorite" : `/profile/${profileId}/favorite`}
      passHref
    >
      <Card>
        <ProfileImg
          size="md"
          src={profileImg || "/image/default-profile-image.png"}
        />

        <UserName>{userName}</UserName>
        {following
          ? !isMine && (
              <FollowingBtn
                colorType="skyblue"
                width="120"
                height="42"
                buttonType={following ? "line" : "small"}
                onClick={handleUnfollow}
                {...props}
              >
                팔로우 취소
              </FollowingBtn>
            )
          : !isMine && (
              <FollowingBtn
                colorType="skyblue"
                width="120"
                height="42"
                buttonType={following ? "line" : "small"}
                onClick={handleFollow}
                {...props}
              >
                팔로우 +
              </FollowingBtn>
            )}
      </Card>
    </Link>
  );
};

export default Following;

const Card = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 121px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  @media (min-width: 1210px) {
    width: 360px;
  }
`;

const ProfileImg = styled(ProfileImage)`
  margin: auto 23px;
`;

const UserName = styled.div`
  margin: auto;
  margin-left: 0;
  font-weight: 700;
  font-size: 20px;
  @media (max-width: 1209px) {
    font-size: 24px;
  }
`;

const FollowingBtn = styled(Button)`
  margin: auto 23px;
  margin-left: 0;
`;
