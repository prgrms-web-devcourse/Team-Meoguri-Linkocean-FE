import { ProfileDetail } from "@/types/model";
import styled from "@emotion/styled";
import { text, color } from "@/styles/theme";
import Button from "./button";
import ProfileImage from "./profileImage";

export interface UserInfoProps {
  data: ProfileDetail;
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
            <FollowInfo>팔로워 {data.followerCount}</FollowInfo>
            <StyledDiv />
            <FollowInfo>팔로잉 {data.followeeCount}</FollowInfo>
          </FollowWrapper>
        </GridWrapper>
      </Top>
      <Bio>{data.bio}</Bio>
      {/* src={data.imageUrl || "/image/default-card-meta-image.jpg"}
      src="/image/default-card-meta-image.jpg"
      alt={data.title} */}
      <Button buttonType="large" colorType="gray" width="277" />
    </Card>
  );
};

// isfollowing?{isfollowing===true ? following : follow +} : 프로필 편집

const Card = styled.div`
  width: 277px;
  height: 245px;
  border: 1px solid;
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
`;

const StyledDiv = styled.div`
  width: 10px;
`;

const Bio = styled.div`
  max-height: 105px;
  width: 261px;
  margin: 10px;
  overflow-y: scroll;

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
