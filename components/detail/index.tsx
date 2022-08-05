import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { BookmarkDetail } from "@/types/model";
import BackButton from "../common/backButton";
import Star from "../common/star";
import Button from "../common/button";
import ProfileImage from "../common/profileImage";

const DetailPage = ({
  data,
  isWriter,
}: {
  data: BookmarkDetail;
  isWriter: boolean;
}) => {
  const { title, url, imageUrl, profile, tags, isFavorite, updatedAt, memo } =
    data;

  return (
    <Page>
      <FlexBetween>
        <BackButton />
        {isWriter ? (
          <FlexBetween style={{ width: "190px" }}>
            <Button buttonType="small" width="90" colorType="main-color">
              수정하기
            </Button>
            <Button buttonType="small" width="90" colorType="gray">
              삭제하기
            </Button>
          </FlexBetween>
        ) : (
          <UserFollow>
            <ProfileImage src={profile.imageUrl} size="sm" />
            <span>{profile.username}</span>
            {profile.isFollow ? (
              <Button
                style={{ height: "33px", width: "128px" }}
                buttonType="small"
                colorType="gray"
              >
                팔로우 취소
              </Button>
            ) : (
              <Button
                style={{ height: "33px", width: "128px" }}
                buttonType="small"
                colorType="main-color"
              >
                팔로우+
              </Button>
            )}
          </UserFollow>
        )}
      </FlexBetween>
      <Content>
        <BookMarkInfo>
          <Image
            src={imageUrl || "/image/default-card-meta-image.jpg"}
            width={325}
            height={176}
          />
          <Info>
            <div>
              <Title>
                <h3>{title}</h3>
                <Star favorite={isFavorite} size={30} />
              </Title>
              <Tags>{tags?.map((tag) => `#${tag} `)}</Tags>
            </div>
            <FlexBetween>
              <Link href={url} target="_blank">
                {url}
              </Link>
              <Date>{updatedAt}</Date>
            </FlexBetween>
          </Info>
        </BookMarkInfo>
        <Description>{memo}</Description>
      </Content>
    </Page>
  );
};

const Page = styled.div`
  width: 835px;
  margin: auto;
  cursor: default;
`;
const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserFollow = styled.div`
  display: flex;
  align-items: center;
  span {
    ${text.$subtitle1}
    margin: 0 70px 0 14px;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;
const Content = styled.div`
  margin-top: 35px;
`;
const BookMarkInfo = styled.div`
  display: flex;
  gap: 35px;
  margin-bottom: 60px;
  img {
    border-radius: 8px;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  ${text.$headline4}
  margin-bottom: 12px;
  h3 {
    margin-right: 10px;
  }
`;
const Tags = styled.p`
  ${text.$subtitle1}
  color: ${color.$gray800};
`;

const Link = styled.a`
  ${text.$body1}
  color: ${color.$gray600};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Date = styled.span`
  ${text.$caption}
  color: ${color.$gray400};
`;
const Description = styled.p`
  ${text.$body1}
`;

export default DetailPage;
