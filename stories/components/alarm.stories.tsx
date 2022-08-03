import Alarm, { AlarmProps } from "@/components/common/alarm";

export default {
  title: "components/Alarm",
  component: Alarm,
};

export const Share = (args: AlarmProps) => {
  return <Alarm {...args} />;
};
Share.argTypes = {
  data: {
    defaultValue: {
      type: "SHARE",
      info: {
        bookmark: {
          id: 1,
          title: "네이버",
          link: "https://www.naver.com",
        },
        sender: {
          id: 1,
          username: "haha",
        },
      },
    },
    control: "object",
  },
};

export const Feed = (args: AlarmProps) => {
  return <Alarm {...args} />;
};
Feed.argTypes = {
  data: {
    defaultValue: {
      type: "FEED",
      info: {
        bookmark: {
          id: 2,
          title: "구글",
          link: "https://www.google.com",
        },
        sender: {
          id: 2,
          username: "jacob",
        },
      },
    },
    control: "object",
  },
};

export const Old = (args: AlarmProps) => {
  return <Alarm {...args} />;
};
Old.argTypes = {
  data: {
    defaultValue: {
      type: "OLD",
      info: {
        bookmark: {
          id: 3,
          title: "프로그래머스",
          link: "https://school.programmers.co.kr/my-courses/learning",
        },
      },
    },
    control: "object",
  },
};
