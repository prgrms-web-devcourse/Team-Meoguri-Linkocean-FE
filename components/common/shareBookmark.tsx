import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "./button";
import Label from "./label";
import Modal from "./modal";
import ProfileImage from "./profileImage";
import Radio from "./radio";

interface ShareBookmarkProps {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

const ShareBookmark = ({ isShow, setIsShow }: ShareBookmarkProps) => {
  const [userList, setUserList] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
  ]);

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
          {userList.map((id) => (
            <UserList>
              <Label
                style={{
                  margin: "0 10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ProfileImage size={50} />
                <p style={{ flexGrow: 1, marginLeft: "8px" }}>나디아</p>
                <Radio name="user" id={id} />
              </Label>
            </UserList>
          ))}
        </UserBox>
        <Button
          style={{ width: "100%", borderRadius: 0 }}
          buttonType="large"
          colorType="skyblue"
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
