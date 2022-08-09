import { useEffect, useState } from "react";
import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";

export interface ReactionProps {
  like: number;
  hate: number;
  isLike?: boolean;
  isHate?: boolean;
}
interface LikeProps {
  isLikeClicked?: boolean;
}

interface HateProps {
  isHateClicked?: boolean;
}

const Reaction = ({ like, hate, isLike, isHate }: ReactionProps) => {
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
      // Like 카운트 내려갈 때
      setSelectLike(false);
      setLikeCount(likeCount - 1);
    } else {
      // Like 카운트 올라갈 때
      setSelectLike(true);
      setLikeCount(likeCount + 1);
    }
    if (selectHate) {
      // Hate 빼주고, Like 올리기
      setSelectHate(false);
      setHateCount(hateCount - 1);
      setSelectLike(true);
      setLikeCount(likeCount + 1);
    }
  };

  const clickHate = () => {
    if (selectHate) {
      // Hate 카운트 내려갈 때
      setSelectHate(false);
      setHateCount(hateCount - 1);
    } else {
      // Hate 카운트 올라갈 때
      setSelectHate(true);
      setHateCount(hateCount + 1);
    }
    if (selectLike) {
      // Like 카운트 빼주고, Hate 올리기
      setSelectHate(true);
      setHateCount(hateCount + 1);
      setSelectLike(false);
      setLikeCount(likeCount - 1);
    }
  };

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
