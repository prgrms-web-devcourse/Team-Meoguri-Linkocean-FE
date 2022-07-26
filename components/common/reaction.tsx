import { useCallback, useEffect, useState } from "react";
import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import reactionAPI from "@/utils/apis/reactions";
import { Reaction as ReactionType } from "@/types/type";

export interface ReactionProps {
  like: number;
  hate: number;
  isLike?: boolean;
  isHate?: boolean;
  id: number;
}
interface LikeProps {
  isLikeClicked?: boolean;
}

interface HateProps {
  isHateClicked?: boolean;
}

const Reaction = ({ like, hate, isLike, isHate, id }: ReactionProps) => {
  const [selectLike, setSelectLike] = useState(isLike);
  const [selectHate, setSelectHate] = useState(isHate);
  const [likeCount, setLikeCount] = useState(like);
  const [hateCount, setHateCount] = useState(hate);
  useEffect(() => {
    setLikeCount(like);
    setHateCount(hate);
  }, [like, hate]);

  const clickLike = () => {
    if (selectLike) {
      setSelectLike(false);
      setLikeCount(likeCount - 1);
    } else if (selectHate) {
      setSelectHate(false);
      setHateCount(hateCount - 1);
      setSelectLike(true);
      setLikeCount(likeCount + 1);
    } else {
      setSelectLike(true);
      setLikeCount(likeCount + 1);
    }
    createReaction("like");
  };

  const clickHate = () => {
    if (selectHate) {
      setSelectHate(false);
      setHateCount(hateCount - 1);
    } else if (selectLike) {
      setSelectHate(true);
      setHateCount(hateCount + 1);
      setSelectLike(false);
      setLikeCount(likeCount - 1);
    } else {
      setSelectHate(true);
      setHateCount(hateCount + 1);
    }
    createReaction("hate");
  };

  const createReaction = useCallback(
    async (reactionType: ReactionType) => {
      await reactionAPI.createReaction(id, reactionType);
    },
    [id]
  );

  return (
    <Wrapper>
      <Like onClick={() => clickLike()} isLikeClicked={selectLike}>
        <Container>
          <StyledDiv>좋아요!</StyledDiv>
          <StyledDiv>
            {likeCount >= 1000
              ? `${Math.floor(likeCount / 1000)}k`
              : `${likeCount}`}
          </StyledDiv>
        </Container>
        <StyledImg src="/image/dolphin.png" alt="like" />
      </Like>
      <Hate onClick={() => clickHate()} isHateClicked={selectHate}>
        <StyledImg src="/image/starfish.png" alt="hate" />
        <Container>
          <StyledDiv>싫어요!</StyledDiv>
          <StyledDiv>
            {hateCount >= 1000
              ? `${Math.floor(hateCount / 1000)}k`
              : `${hateCount}`}
          </StyledDiv>
        </Container>
      </Hate>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 291px;
  gap: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Like = styled.div<LikeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 5px solid ${color.$aqua};
  border-radius: 8px 50px 50px 8px;
  width: 140px;
  height: 81px;
  cursor: pointer;
  box-sizing: border-box;
  ${(props) =>
    props.isLikeClicked
      ? `background-color: ${color.$aqua};`
      : `background-color:white;`}
`;
const Hate = styled.div<HateProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 5px solid #ffec3f;
  border-radius: 50px 8px 8px 50px;
  background-color: #ffec3f;
  width: 140px;
  height: 81px;
  cursor: pointer;
  box-sizing: border-box;
  ${(props) =>
    props.isHateClicked
      ? `background-color: #ffec3f;`
      : `background-color:white;`}
`;

const StyledImg = styled.img`
  padding: 5px;
  width: 65px;
  height: 65px;
  background-color: white;
  border-radius: 100%;
  box-sizing: border-box;
`;

const StyledDiv = styled.div`
  ${text.$subtitle2}
  display:flex;
  justify-content: center;
  margin: 0px 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Reaction;
