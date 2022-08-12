import useToggle from "@/hooks/useToggle";
import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import { ProfileImage } from "../common";

interface ImageUploaderProps {
  file: File | string;
  setFile: (file: File | string) => void;
}

const RegExp = /^image\/(gif|jpe?g|png)/i;

const ImageUploader = ({ file, setFile }: ImageUploaderProps) => {
  const [checked, toggle] = useToggle(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!RegExp.test(e.target.files[0].type)) {
      alert("확장자가 .png, .jpg, .jpeg, .gif 인지 확인해 주세요");
      return;
    }
    setFile(e.target.files[0]);
    toggle();
  };

  const openBox = (e: React.MouseEvent<HTMLElement>) => {
    toggle();
    e.stopPropagation();
  };

  const changeDefaultImage = () => {
    setFile("");
    toggle();
  };

  const imageFile = (): string => {
    if (typeof file === "string") {
      return file;
    }
    return URL.createObjectURL(file);
  };

  return (
    <Box>
      <ProfileImage size="lg" src={imageFile()} />
      <DropDownBox>
        <button type="button" onClick={openBox}>
          프로필 사진 바꾸기
        </button>
        <List checked={checked}>
          <li>
            <label htmlFor="profileImage">
              사진 등록
              <input
                type="file"
                accept=".gif, .jpg, .png, .jpeg"
                onChange={handleChange}
                id="profileImage"
              />
            </label>
          </li>
          <li>
            <button type="button" onClick={changeDefaultImage}>
              기본 이미지로 변경
            </button>
          </li>
        </List>
      </DropDownBox>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  button {
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
`;

const DropDownBox = styled.div`
  position: relative;
  > button {
    margin-top: 14px;
    color: ${color.$skyBlue};
    ${text.$subtitle1}
  }
`;

const List = styled.ul`
  position: absolute;
  top: 40px;
  right: -5px;
  width: 125px;
  border-radius: 8px;
  background-color: #fff;
  border: 2px solid ${color.$skyBlue};
  visibility: ${(props: { checked: boolean }) =>
    props.checked ? "visible" : "hidden"};
  &::after {
    position: absolute;
    top: -7px;
    right: 11px;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: 7px solid ${color.$skyBlue};
    content: "";
  }
  li:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }
  li:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
  }
  li > button,
  li > label {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    transition: background-color 0.3s;
    width: 100%;
    color: ${color.$gray600};
    ${text.$body2}
    cursor: pointer;
    &:hover {
      background-color: ${color.$gray50};
    }
  }
`;
export default ImageUploader;
