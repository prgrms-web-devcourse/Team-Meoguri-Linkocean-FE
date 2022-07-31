import Alarm, { AlarmProps } from "@/components/common/alarm";

export default {
  title: "components/Alarm",
  component: Alarm,
  argTypes: {
    data: {
      control: "object",
      defaultValue: {
        bookmarkId: 1,
        username: "writer2",
        title: "구글 사이트",
        url: "http://www.google.com",
      },
    },
  },
};

export const Default = (args: AlarmProps) => {
  return <Alarm {...args} />;
};
