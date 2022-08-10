import { useProfileState } from "@/hooks/useProfile";
import { color, text } from "@/styles/theme";
import { Profile } from "@/types/model";
import notificationAPI from "@/utils/apis/notification";
import profileAPI from "@/utils/apis/profile";
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "./button";
import Label from "./label";
import Modal from "./modal";
import ProfileImage from "./profileImage";
import Radio from "./radio";

interface ShareBookmarkProps {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  bookmarkId: number;
}

const ShareBookmark = ({
  isShow,
  setIsShow,
  bookmarkId,
}: ShareBookmarkProps) => {
  const [userList, setUserList] = useState<Profile[]>([]);
  const [selectUser, setSelectUser] = useState<number>();
  const { profileId } = useProfileState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await profileAPI.getFollow(profileId, "follower", "");
        setUserList(data.profiles);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [profileId]);

  const clickShare = async () => {
    try {
      if (!selectUser) return;
      await notificationAPI.shareNotification({
        targetId: selectUser,
        bookmarkId,
      });
      setIsShow(false);
      alert("북마크가 공유 되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal width={400} height={700} isShow={isShow} setIsShow={setIsShow}>
      <Wrapper>
        <SearchBox>
          <button type="button" onClick={() => setIsShow(false)}>
            close
          </button>
          <h3>머구리에게 공유하기</h3>
          <input type="text" />
        </SearchBox>
        <UserBox>
          {userList?.map((user) => (
            <UserList key={user.profileId}>
              <Label
                style={{
                  margin: "0 10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ProfileImage size={50} src={user.imageUrl} />
                <p style={{ flexGrow: 1, marginLeft: "8px" }}>
                  {user.username}
                </p>
                <Radio
                  name="user"
                  id={user.profileId.toString()}
                  checked={selectUser === user.profileId}
                  onClick={() => setSelectUser(user.profileId)}
                />
              </Label>
            </UserList>
          ))}
        </UserBox>
        <Button
          style={{ width: "100%", borderRadius: 0 }}
          buttonType="large"
          colorType="skyblue"
          onClick={clickShare}
        >
          공유하기
        </Button>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const SearchBox = styled.div`
  height: 120px;
  background-color: ${color.$skyBlue};
  button {
    background-color: transparent;
    border: none;
    position: absolute;
    top: 0;
    right: 10px;
    color: transparent;
    transform: translateY(10px);
    width: 30px;
    height: 30px;
    background-image: url("/icon/close_white.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
    content: "";
  }
  h3 {
    color: #fff;
    ${text.$headline5}
    width: 90%;
    margin: 24px auto 4px;
    cursor: default;
    ::after {
      display: inline-block;
      transform: translateY(8px);
      margin-left: 6px;
      width: 30px;
      height: 30px;
      background-image: url("/image/smile.png");
      background-position: center;
      background-size: cover;
      content: "";
    }
  }
  input {
    display: block;
    width: 90%;
    height: 40px;
    background-color: ${color.$skyBlue};
    border: none;
    margin: auto;
    padding-left: 40px;
    border-bottom: 1px solid #fff;
    background-image: url("/icon/search_white.svg");
    background-size: 20px 18px;
    background-repeat: no-repeat;
    background-position: 8px 12px;
    outline: none;
    box-sizing: border-box;
    color: #fff;
    ${text.$body1}
  }
`;

const UserBox = styled.ul`
  flex-grow: 1;
  max-height: 535px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${color.$mainColor};
    border-radius: 5px;
  }
`;
const UserList = styled.li`
  padding: 10px 0;
  :not(:last-of-type) {
    border-bottom: 1px solid ${color.$gray400};
  }
`;

export default ShareBookmark;
