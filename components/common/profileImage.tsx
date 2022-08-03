import styled from "@emotion/styled";

type ImgSize = "lg" | "md" | "sm" | number;

export interface ProfileImageProps {
  src?: string;
  size?: ImgSize;
}

const ProfileImage = ({ src, size = "md", ...props }: ProfileImageProps) => (
  <ProfileImg
    src={src || "/image/default-profile-image.png"}
    size={size}
    {...props}
  />
);

const profileSize = (size?: ImgSize) => {
  switch (size) {
    case "lg":
      return 150;
    case "md":
      return 70;
    case "sm":
      return 40;
    default:
      return size;
  }
};

const ProfileImg = styled.img<ProfileImageProps>`
  object-fit: cover;
  width: ${(props) => profileSize(props.size)}px;
  height: ${(props) => profileSize(props.size)}px;
  border-radius: 50%;
  display: inline-block;
  background-color: #fff;
`;

export default ProfileImage;
