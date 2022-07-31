import UserInfo, { UserInfoProps } from "@/components/common/userInfo";

export default {
  title: "components/UserInfo",
  component: UserInfo,
};

export const Default = (args: UserInfoProps) => <UserInfo {...args} />;
Default.argTypes = {
  data: {
    type: "text",
    defaultValue: {
      profileId: 1,
      // imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
      categories: ["it", "technology"],
      username: "joy",
      bio: "안녕하세요! 행복한 조이입니당.",
      followerCount: 12,
      followeeCount: 10,
    },
  },
};

export const ScrolledBio = (args: UserInfoProps) => <UserInfo {...args} />;
ScrolledBio.argTypes = {
  data: {
    type: "text",
    defaultValue: {
      profileId: 1,
      // imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
      categories: ["it", "technology"],
      username: "joy",
      bio: "안녕하세요! 행복한 조이입니당 룰루랄라 줄바꿈은 &nbsp이거 하면 될 줄 알았는데 여기서 쓰는게 아니네요...? 줄바꿈 어떻게 해야 하는 거죠??? 아는 분 알려주세요 plz..... 글을 더 써야 높이를 확인하는데 쓸 말이 없네요. 오늘의 TMI는 어제 잠들기 전부터 딜라이트 콜드브루 라떼가 너무 먹고싶어서 카페 오자마자 잘 마시고 있습니당 후후",
      followerCount: 12,
      followeeCount: 10,
    },
  },
};

export const isFollowUndefined = (args: UserInfoProps) => (
  <UserInfo {...args} />
);
isFollowUndefined.argTypes = {
  data: {
    type: "text",
    defaultValue: {
      profileId: 1,
      // imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
      categories: ["it", "technology"],
      username: "joy",
      bio: "안녕하세요! 행복한 조이입니당.",
      followerCount: 12,
      followeeCount: 10,
    },
  },
};

export const isFollowTrue = (args: UserInfoProps) => <UserInfo {...args} />;
isFollowTrue.argTypes = {
  data: {
    type: "text",
    defaultValue: {
      profileId: 1,
      // imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
      categories: ["it", "technology"],
      username: "joy",
      bio: "안녕하세요! 행복한 조이입니당.",
      followerCount: 12,
      followeeCount: 10,
      isFollow: true,
    },
  },
};

export const isFollowFalse = (args: UserInfoProps) => <UserInfo {...args} />;
isFollowFalse.argTypes = {
  data: {
    type: "text",
    defaultValue: {
      profileId: 1,
      // imageUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
      categories: ["it", "technology"],
      username: "joy",
      bio: "안녕하세요! 행복한 조이입니당.",
      followerCount: 12,
      followeeCount: 10,
      isFollow: false,
    },
  },
};
