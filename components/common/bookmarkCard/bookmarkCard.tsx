import { color, shortenNLine, text } from "@/styles/theme";
import { Bookmark } from "@/types/model";
import dateFormat from "@/utils/dateFormat";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ShareBookmark from "../shareBookmark";
import Star from "../star";
import DropBox from "./dropBox";

export interface BookmarkProps {
  data: Bookmark;
  deleteBookmark: (id: number) => void;
  isMine?: boolean;
}

const OPEN_TYPE = {
  all: "전체공개",
  partial: "일부공개",
  private: "비공개",
};

const BookmarkCard = ({ data, deleteBookmark, isMine }: BookmarkProps) => {
  const {
    category,
    url,
    id,
    createdAt,
    tags,
    isFavorite,
    imageUrl,
    title,
    openType,
    likeCount,
    isWriter,
  } = data;

  const router = useRouter();
  const [isShowShareBookmark, setIsShowShareBookmark] = useState(false);
  const urlClick = (e: React.MouseEvent<HTMLElement>) => {
    window.open(url);
    e.stopPropagation();
  };

  const clickCard = () => {
    const link = router.asPath.split("/")[1];
    if (link === "feed") {
      router.push(`/feed/detail/${id}`);
    } else if (link === "profile") {
      const otherId = router.asPath.split("/")[2];
      router.push(`/profile/${otherId}/detail/${id}`);
    } else {
      router.push(`/my/detail/${id}`);
    }
  };

  const unitConversion = (num: number) => {
    if (num < 1000) {
      return num;
    }
    if (num < 10000 && num >= 1000) {
      return `${(num / 1000).toPrecision(2)}k`;
    }
    if (num > 10000) {
      return `${(num / 10000).toPrecision(2)}M`;
    }
    return num;
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = "/image/default-card-meta-image.jpg";
  };

  useEffect(() => {
    if (typeof window !== "object") return;
    const body = document.getElementsByTagName("body")[0];
    if (isShowShareBookmark) {
      body.classList.add("scrollLock");
    } else {
      body.classList.remove("scrollLock");
    }
  }, [isShowShareBookmark]);

  return (
    <div>
      {isShowShareBookmark ? (
        <ShareBookmark
          bookmarkId={id}
          isShow={isShowShareBookmark}
          setIsShow={setIsShowShareBookmark}
        />
      ) : null}
      <Card onClick={clickCard}>
        <Top>
          <div>
            <Category>{category === "no-category" ? null : category}</Category>
            <CreateDate>{dateFormat(createdAt)}</CreateDate>
          </div>
          <div>
            <Star id={id.toString()} favorite={isFavorite} />
            <DropBox
              setIsShowShareBookmark={setIsShowShareBookmark}
              deleteBookmark={deleteBookmark}
              isWriter={isMine ?? isWriter}
              openType={openType}
              tags={tags}
              id={id}
            >
              <More />
            </DropBox>
          </div>
        </Top>
        <MetaImage
          src={imageUrl || "/image/default-card-meta-image.jpg"}
          alt={title}
          onError={handleImgError}
        />
        <Contents>
          <div>
            <Title>{title}</Title>
            <Tags>
              {tags?.map((tag) => (
                <Tag key={tag}>{`#${tag} `}</Tag>
              ))}
            </Tags>
          </div>
          <div>
            <Url onClick={urlClick} href={url} target="_blank">
              {url}
            </Url>
            <CardBottom>
              <span>{OPEN_TYPE[openType]}</span>
              <Like>
                <i /> {unitConversion(likeCount)}
              </Like>
            </CardBottom>
          </div>
        </Contents>
      </Card>
    </div>
  );
};

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 260px;
  border-radius: 8px;
  background-color: #fff;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
  transition: all 0.5s;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.3));
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 7px 10px 3px;
  div {
    display: flex;
    align-items: center;
  }
`;

const MetaImage = styled.img`
  min-height: 110px;
  object-fit: cover;
  background-position: center;
  background-size: 190px, 110px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 10px;
`;

const More = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 2px;
  border-radius: 50%;
  background-image: url("/icon/more-view.svg");
  background-position: center;
  transition: all 0.3s;
  &:hover {
    background-color: ${color.$gray100};
  }
`;

const Category = styled.span`
  ${text.$subtitle1}
  height: 15px;
`;

const CreateDate = styled.span`
  color: ${color.$gray400};
  margin-left: 5px;
  transform: translateY(3px);
  ${text.$overline}
`;

const Title = styled.p`
  ${text.$subtitle1}
  width: 160px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Tags = styled.p`
  ${shortenNLine(2)}
`;
const Tag = styled.span`
  color: ${color.$gray800};
  width: 200px;
  ${text.$caption}
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${text.$caption}
`;

const Url = styled.a`
  display: inline-block;
  width: 160px;
  color: ${color.$gray400};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${text.$overline};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  color: ${color.$mainColor};
  font-weight: bold;
  transform: translateY(1px);
  i {
    width: 15px;
    height: 15px;
    margin-right: 3px;
    background-image: url("/icon/like.svg");
    background-position: center;
  }
`;

export default BookmarkCard;
