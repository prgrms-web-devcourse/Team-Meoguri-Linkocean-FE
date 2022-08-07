import { ProfileDetail } from "@/types/model";
import styled from "@emotion/styled";
import { text, color } from "@/styles/theme";
import Link from "next/link";
import Button from "./button";
import ProfileImage from "./profileImage";

export interface UserInfoProps {
  data: ProfileDetail & { isFollow?: boolean };
}

const UserInfo = ({ data }: UserInfoProps) => {
  return (
    <Card>
      <Top>
        <UserImg
          size="md"
          src={data.imageUrl || "/image/default-profile-image.png"}
        />
        <GridWrapper>
          <UserName>{data.username}</UserName>
          <FollowWrapper>
            <Link href="/my/follow" passHref>
              <FollowInfo>팔로워 {data.followerCount}</FollowInfo>
            </Link>
            <StyledDiv />
            <Link href="/my/follow" passHref>
              <FollowInfo>팔로잉 {data.followeeCount}</FollowInfo>
            </Link>
          </FollowWrapper>
        </GridWrapper>
      </Top>
      <Bio>{data.bio}</Bio>
      {!Object.prototype.hasOwnProperty.call(data, "isFollow") && (
        <Button buttonType="large" colorType="skyblue" width="277">
          프로필 수정
        </Button>
      )}
      {Object.prototype.hasOwnProperty.call(data, "isFollow") &&
        (data.isFollow ? (
          <Button buttonType="line" colorType="skyblue" width="277">
            팔로우 취소
          </Button>
        ) : (
          <Button buttonType="large" colorType="skyblue" width="277">
            팔로우 +
          </Button>
        ))}
    </Card>
  );
};

const Card = styled.div`
  width: 277px;
`;

const GridWrapper = styled.div`
  display: grid;
  align-items: center;
`;

const Top = styled.div`
  display: flex;
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
`;

const StyledDiv = styled.div`
  width: 10px;
`;

const Bio = styled.div`
  max-height: 105px;
  width: 261px;
  margin: 10px;
  padding: 10px 0;
  overflow-y: auto;
  word-wrap: break-word;

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
