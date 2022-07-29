import ProfileImage, {
  ProfileImageProps,
} from "@/components/common/profileImage";

export default {
  title: "components/profileImage",
  component: ProfileImage,
  argTypes: {
    src: {
      control: "text",
      defaultValue: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
    },
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
    },
  },
};
export const Default = (args: ProfileImageProps) => {
  return <ProfileImage {...args} />;
};
