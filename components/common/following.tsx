import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
import ProfileImage from "@/components/common/profileImage";
import Button from "@/components/common/button";

const Following = () => (
  <Card>
    <ProfileImg size="md" />
    <UserName>Groot</UserName>
    <FollowingBtn
      buttonType="small"
      colorType="skyblue"
      width="128"
      height="42"
    >
      follow +
    </FollowingBtn>
  </Card>
);

export default Following;

const Card = styled.div`
  height: 121px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0px 0px 6px ${color.$gray400};
  display: flex;
  /* justify-content: space-between; */
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
