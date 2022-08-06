import { color, text } from "@/styles/theme";
import { Notification } from "@/types/model";
import { NotificationType } from "@/types/type";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";

export interface AlarmProps {
  data: Notification;
}

const Alarm = ({ data }: AlarmProps) => {
  const router = useRouter();
  const { type, info } = data;
  const { bookmark, sender } = info;

  const handleClick = () => {
    switch (type) {
      case "FEED":
        if (!sender) return;
        router.push(`profile/${sender.id}/detail/${bookmark.id}`);
        break;
      case "SHARE":
        if (!sender) return;
        router.push(`profile/${sender.id}/detail/${bookmark.id}`);
        break;
      case "OLD":
        router.push(`my/detail/${bookmark.id}`);
        break;
      default:
        break;
    }
  };

  const urlClick = (e: React.MouseEvent<HTMLElement>) => {
    window.open(bookmark.link);
    e.stopPropagation();
  };

  const comment = () => {
    switch (type) {
      case "FEED":
        return (
          <>
            <b>{sender?.username}</b> 님이 북마크를 추가했습니다.
          </>
        );
      case "SHARE":
        return (
          <>
            <b>{sender?.username}</b> 님이 북마크를 공유했습니다.
          </>
        );
      case "OLD":
        return (
          <>
            <b>10일</b> 동안 사용하지 않은 북마크가 있습니다.
          </>
        );
      default:
        return <>잘못된 알림이 오고 있습니다. 담당자에게 문의 해주세요</>;
    }
  };

  return (
    <AlarmBox onClick={handleClick} type={type}>
      <Guide>{comment()}</Guide>
      <UrlData>
        <Title>{bookmark.title}</Title>
        <Url onClick={urlClick}>{bookmark.link}</Url>
      </UrlData>
    </AlarmBox>
  );
};

const alarmIcon = (type: NotificationType) => {
  switch (type) {
    case "FEED":
      return `
        background-image: url("/icon/label.svg");
        width: 40px;
        height: 24px;
      `;
    case "SHARE":
      return `
        background-image: url("/icon/hide.svg");
        width: 28px;
        height: 13px;`;
    case "OLD":
      return `
        background-image: url("/icon/link.svg");
        width: 26px;
        height: 26px;`;
    default:
      return null;
  }
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
    transform: translateY(-50%);
    ${(props: { type: NotificationType }) => alarmIcon(props.type)};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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
