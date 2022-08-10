import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import ProfileImage from "@/components/common/profileImage";
import Button from "@/components/common/button";
import { useCallback, useState } from "react";
import FollowAPI from "@/utils/apis/follow";

export interface FollowingProps {
  isMine?: boolean;
  profileId: number;
  profileImg?: string;
  userName: string;
  following: boolean;
  handleClick?: (profileId: number) => void;
}

const Following = ({
  isMine,
  profileId,
  profileImg,
  userName,
  following,
  handleClick,
  ...props
}: FollowingProps) => {
  const [state, setState] = useState(following);

  const handleFollow = useCallback(async () => {
    try {
      await FollowAPI.createFollow(profileId);
      setState(true);
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
      setState(false);
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
      <ProfileImg
        size="md"
        src={profileImg || "/image/default-profile-image.png"}
      />
      <UserName>{userName}</UserName>
      {isMine && following ? (
        <FollowingBtn
          colorType="skyblue"
          width="128"
          height="42"
          buttonType={following ? "line" : "small"}
          onClick={handleUnfollow}
          {...props}
        >
          팔로우 취소
        </FollowingBtn>
      ) : (
        <FollowingBtn
          colorType="skyblue"
          width="128"
          height="42"
          buttonType={following ? "line" : "small"}
          onClick={handleFollow}
          {...props}
        >
          팔로우 +
        </FollowingBtn>
      )}
    </Card>
  );
};

export default Following;

const Card = styled.div`
  height: 121px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0px 0px 6px ${color.$gray400};
  display: flex;
`;

const ProfileImg = styled(ProfileImage)`
  margin: auto 23px;
`;

const UserName = styled.div`
  margin: auto;
  margin-left: 0;
  ${text.$headline5};
`;

const FollowingBtn = styled(Button)`
  margin: auto 23px;
  margin-left: 0;
`;
