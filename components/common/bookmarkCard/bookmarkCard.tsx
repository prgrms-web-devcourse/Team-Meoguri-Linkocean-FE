import { Bookmark } from "@/types/model";
import styled from "@emotion/styled";

export interface BookmarkProps {
  data: Bookmark;
}

const BookmarkCard = ({ data }: BookmarkProps) => {
  console.log(data);
  return (
    <Card>
      <Top />
      <MetaImage
        src={data.imageUrl || "/image/default-card-meta-image.jpg"}
        // src="/image/default-card-meta-image.jpg"
        // alt={data.title}
      />
      {data.title}
      <Contents />
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px;
  height: 260px;
  background-color: #fff;
  border-radius: 8px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
`;

const Top = styled.div``;

const MetaImage = styled.img``;

const Contents = styled.div``;

export default BookmarkCard;
