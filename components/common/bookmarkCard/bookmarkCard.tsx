import { color, text } from "@/styles/theme";
import { Bookmark } from "@/types/model";
import styled from "@emotion/styled";
import DropBox from "./dropBox";
import Star from "./star";

export interface BookmarkProps {
  data: Bookmark;
}

const OPEN_TYPE = {
  all: "전체공개",
  partial: "일부공개",
  private: "비공개",
};

const BookmarkCard = ({ data }: BookmarkProps) => {
  const {
    category,
    url,
    id,
    updatedAt,
    tags,
    isFavorite,
    imageUrl,
    title,
    openType,
    likeCount,
    isWriter,
  } = data;

  const urlClick = (e: React.MouseEvent<HTMLElement>) => {
    window.open(url);
    e.stopPropagation();
  };

  const clickCard = () => {
    alert(`${id} 클릭`);
  };

  return (
    <Card onClick={clickCard}>
      <Top>
        <div>
          <Category>{category}</Category>
          <CreateDate>{updatedAt}</CreateDate>
        </div>
        <div>
          <Star favorite={isFavorite} />
          <DropBox isWriter={isWriter}>
            <More />
          </DropBox>
        </div>
      </Top>
      <MetaImage
        src={imageUrl || "/image/default-card-meta-image.jpg"}
        alt={title}
      />
      <Contents>
        <div>
          <Title>{title}</Title>
          <p>
            {tags?.map((tag) => (
              <Tag>{`#${tag} `}</Tag>
            ))}
          </p>
        </div>
        <div>
          <Url onClick={urlClick} href={url} target="_blank">
            {url}
          </Url>
          <CardBottom>
            <span>{OPEN_TYPE[openType]}</span>
            <Like>
              <i /> {likeCount}
            </Like>
          </CardBottom>
        </div>
      </Contents>
    </Card>
  );
};

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 190px;
  height: 260px;
  border-radius: 8px;
  background-color: #fff;
  margin-right: calc((100% - (190px * 4)) / 3);
  margin-bottom: 29px;
  &:nth-child(4) {
    margin-right: 0px;
  }
  &:nth-child(8) {
    margin-right: 0px;
  }
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
  background-image: url("/image/default-card-meta-image.jpg");
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
  ${text.$overline}
`;

const Title = styled.p`
  ${text.$subtitle1}
  width: 160px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Tag = styled.span`
  color: ${color.$gray800};
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
  i {
    width: 15px;
    height: 15px;
    margin-right: 3px;
    background-image: url("/icon/like.svg");
    background-position: center;
  }
`;

export default BookmarkCard;
