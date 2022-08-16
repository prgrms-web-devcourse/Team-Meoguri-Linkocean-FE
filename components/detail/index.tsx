import { color, media, shortenOneLine, text } from "@/styles/theme";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { BookmarkDetail } from "@/types/model";
import { useRouter } from "next/router";
import bookmarkAPI from "@/utils/apis/bookmark";
import followAPI from "@/utils/apis/follow";
import { useProfileDispatch, useProfileState } from "@/hooks/useProfile";
import dateFormat from "@/utils/dateFormat";
import CopyLink from "./copyLink";
import { BackButton, Button, ProfileImage, Reaction, Star } from "../common";

const DetailPage = ({ data, id }: { data: BookmarkDetail; id: number }) => {
  const router = useRouter();
  const {
    title,
    url,
    imageUrl,
    profile,
    tags,
    isFavorite,
    createdAt,
    memo,
    reaction,
    reactionCount,
  } = data;
  const [isFollow, setIsFollow] = useState(profile.isFollow);
  const { username } = useProfileState();
  const dispatch = useProfileDispatch();

  useEffect(() => {
    setIsFollow(profile.isFollow);
  }, [profile.isFollow]);

  const followRequest = async () => {
    try {
      if (isFollow) {
        await followAPI.deleteFollow(profile.profileId);
        dispatch({ type: "UN_FOLLOW" });
      } else {
        await followAPI.createFollow(profile.profileId);
        dispatch({ type: "FOLLOW" });
      }
      setIsFollow(!isFollow);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequest = async () => {
    const deleteConfirm = window.confirm("해당 북마크를 삭제 하시겠습니까?");
    if (deleteConfirm) {
      try {
        await bookmarkAPI.deleteBookmark(id);
        dispatch({
          type: "REMOVE_BOOKMARK",
          tags: tags || [],
        });
        router.back();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = "/image/default-card-meta-image.jpg";
  };

  return (
    <Page>
      <FlexBetween>
        <BackButton />
        {username === profile.username ? (
          <FlexBetween style={{ width: "190px" }}>
            <Button
              onClick={() => router.push(`/edit/${id}`)}
              buttonType="small"
              width="90"
              colorType="main-color"
            >
              수정하기
            </Button>
            <Button
              onClick={deleteRequest}
              buttonType="small"
              width="90"
              colorType="gray"
            >
              삭제하기
            </Button>
          </FlexBetween>
        ) : (
          <UserFollow>
            <FollowLink
              href={`/profile/${profile.profileId}/favorite`}
              style={{ textDecoration: "none" }}
            >
              <ProfileImage src={profile.imageUrl} size="sm" />
              <span>{profile.username}</span>
            </FollowLink>
            {isFollow ? (
              <Button
                style={{ height: "33px", width: "128px" }}
                buttonType="small"
                colorType="gray"
                onClick={followRequest}
              >
                팔로우 취소
              </Button>
            ) : (
              <Button
                style={{ height: "33px", width: "128px" }}
                buttonType="small"
                colorType="main-color"
                onClick={followRequest}
              >
                팔로우 +
              </Button>
            )}
          </UserFollow>
        )}
      </FlexBetween>
      <Content>
        <BookMarkInfo>
          <ImageWrapper>
            <MetaImage
              src={imageUrl || "/image/default-card-meta-image.jpg"}
              onError={handleImgError}
              alt={title}
            />
          </ImageWrapper>
          <Info>
            <div>
              <Title>
                <h3>{title}</h3>
                <Star id={id.toString()} favorite={isFavorite} size={30} />
              </Title>
              <Tags>{tags?.map((tag) => `#${tag} `)}</Tags>
            </div>
            <LinkDataBox>
              <LinkBox>
                <Link href={url} target="_blank">
                  {url}
                </Link>
                <CopyLink copyUrl={url} />
              </LinkBox>
              <Date>{dateFormat(createdAt)}</Date>
            </LinkDataBox>
          </Info>
        </BookMarkInfo>
        <pre>
          <Description>{memo}</Description>
        </pre>
        <Reaction
          id={id}
          isLike={reaction.LIKE}
          isHate={reaction.HATE}
          like={reactionCount.LIKE}
          hate={reactionCount.HATE}
        />
      </Content>
    </Page>
  );
};

const Page = styled.div`
  width: 835px;
  margin: auto;
  cursor: default;
  ${media.desktop} {
    width: auto;
  }
`;
const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LinkDataBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LinkBox = styled.div`
  display: inline-flex;
  width: 300px;
  align-items: center;
  ${media.desktop} {
    max-width: 300px;
    width: 50%;
  }
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
  ${media.laptop} {
    flex-direction: column;
  }
`;

const MetaImage = styled.img`
  border-radius: 8px;
  width: 100%;
  ${media.laptop} {
    width: calc(100vw - 420px);
    height: auto;
    flex-direction: column;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 325px;
  max-height: 200px;
  overflow: hidden;
  border-radius: 8px;
  ${media.laptop} {
    max-width: 100%;
    width: calc(100vw - 420px);
    max-height: 300px;
    flex-direction: column;
  }
`;

const Title = styled.div`
  display: flex;
  ${text.$headline4}
  margin-bottom: 12px;
  h3 {
    margin-right: 10px;
    word-break: break-all;
  }
  button {
    margin-top: 8px;
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
  ${shortenOneLine}
`;
const FollowLink = styled.a`
  display: flex;
  align-items: center;
`;

const Date = styled.span`
  ${text.$caption}
  color: ${color.$gray400};
  width: 70px;
`;
const Description = styled.p`
  ${text.$body1}
  margin-bottom: 100px;
`;

export default DetailPage;
