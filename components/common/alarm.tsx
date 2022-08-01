import { color, text } from "@/styles/theme";
import { Notification } from "@/types/model";
import styled from "@emotion/styled";
import React from "react";

export interface AlarmProps {
  data: Notification;
}

const Alarm = ({ data }: AlarmProps) => {
  const { bookmarkId, username, title, url } = data;

  const handleClick = () => {
    alert(`${bookmarkId}클릭`);
  };

  const urlClick = (e: React.MouseEvent<HTMLElement>) => {
    window.open(url);
    e.stopPropagation();
  };

  return (
    <AlarmBox onClick={handleClick}>
      <Guide>
        <b>{username}</b> 님이 북마크를 추가했습니다.
      </Guide>
      <UrlData>
        <Title>{title}</Title>
        <Url onClick={urlClick} href={url} target="_blank">
          {url}
        </Url>
      </UrlData>
    </AlarmBox>
  );
};

const AlarmBox = styled.div`
  position: relative;
  width: 100%;
  border: 2px solid ${color.$skyBlue};
  border-radius: 8px;
  padding: 20px 26px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    outline: 4px solid rgba(136, 190, 223, 0.5);
  }
  &::before {
    position: absolute;
    display: block;
    top: 50%;
    right: 43px;
    width: 40px;
    height: 24px;
    transform: translateY(-50%);
    background-image: url("/icon/label.svg");
    background-position: center;
    background-size: cover;
    content: "";
  }
`;

const Guide = styled.p`
  ${text.$body1}
  b {
    font-weight: bold;
  }
`;

const UrlData = styled.p`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  &::after {
    flex-grow: 1;
    width: 2px;
    height: 17px;
    background-color: #312f2f;
    margin: 0 10px;
    content: "";
  }
  ${text.$body1}
`;

const Url = styled.a`
  ${text.$body2}
  color: ${color.$gray600};
  text-decoration: none;
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    text-decoration: underline;
  }
`;

export default Alarm;
