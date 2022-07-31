import UserInfo, { UserInfoProps } from "@/components/common/userInfo";

export default {
  title: "components/UserInfo",
  component: UserInfo,
  argTypes: {
    data: {
      type: "text",
      defaultValue: {
        profileId: 1,
        imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
        categories: ["it", "technology"],
        username: "joy",
        bio: "안녕하세요! 행복한 조이입니당 룰루랄라",
        followerCount: 12,
        followeeCount: 10,
      },
    },
  },
};

export const Default = (args: UserInfoProps) => <UserInfo {...args} />;
