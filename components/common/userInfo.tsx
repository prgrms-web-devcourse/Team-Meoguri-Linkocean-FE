import { ProfileDetail } from "@/types/model";
import styled from "@emotion/styled";
import { text } from "@/styles/theme";
import Button from "./button";
import ProfileImage from "./profileImage";

export interface UserInfoProps {
  data: ProfileDetail;
}

const UserInfo = ({ data }: UserInfoProps) => {
  return (
    <Card>
      <Top>
        <UserImg size="md" />
        <GridWrapper>
          <UserName>{data.username}</UserName>
          <FollowWrapper>
            <FollowInfo>팔로워 {data.followerCount}</FollowInfo>
            <FollowInfo>팔로잉 {data.followeeCount}</FollowInfo>
          </FollowWrapper>
        </GridWrapper>
      </Top>
      <Bio>{data.bio}</Bio>
      {/* src={data.imageUrl || "/image/default-card-meta-image.jpg"}
      src="/image/default-card-meta-image.jpg"
      alt={data.title} */}
      <StyledButton buttonType="large" colorType="gray" />
    </Card>
  );
};

// isfollowing?{isfollowing===true ? following : follow +} : 프로필 편집

const Card = styled.div`
  /* display: grid; */
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
  padding: 10px;
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

const Bio = styled.div`
  height: 261px;
  padding: 10px;
`;

const StyledButton = styled(Button)``;

export default UserInfo;
