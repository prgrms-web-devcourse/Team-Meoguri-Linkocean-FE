import { useState } from "react";
import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";

export interface ReactionProps {
  like: number;
  hate: number;
}
interface LikeProps {
  isLikeClicked?: boolean;
}

interface HateProps {
  isHateClicked?: boolean;
}

const Reaction = ({ like, hate }: ReactionProps) => {
  const [selectLike, setSelectLike] = useState(false);
  const [selectHate, setSelectHate] = useState(false);

  const clickLike = () => {
    if (selectLike) {
      // Like 카운트 내려갈 때
      setSelectLike(false);
    } else {
      // Like 카운트 올라갈 때
      setSelectLike(true);
    }
    if (selectHate) {
      // Hate 빼주고, Like 올리기
      setSelectHate(false);
      setSelectLike(true);
    }
  };

  const clickHate = () => {
    if (selectHate) {
      // Hate 카운트 내려갈 때
      setSelectHate(false);
    } else {
      // Hate 카운트 올라갈 때
      setSelectHate(true);
    }
    if (selectLike) {
      // Like 카운트 빼주고, Hate 올리기
      setSelectHate(true);
      setSelectLike(false);
    }
  };

  return (
    <Wrapper>
      <Like onClick={() => clickLike()} isLikeClicked={selectLike}>
        <Container>
          <StyledDiv>좋아요!</StyledDiv>
          <StyledDiv>{like}</StyledDiv>
        </Container>
        <StyledImg src="/image/dolphin.png" alt="like" />
      </Like>
      <Hate onClick={() => clickHate()} isHateClicked={selectHate}>
        <StyledImg src="/image/starfish.png" alt="hate" />
        <Container>
          <StyledDiv>싫어요!</StyledDiv>
          <StyledDiv>{hate}</StyledDiv>
        </Container>
      </Hate>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
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
  height: 82px;
  cursor: pointer;
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
  height: 82px;
  cursor: pointer;
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
`;

const StyledDiv = styled.div`
  ${text.$subtitle2}
  display:flex;
  justify-content: center;
  margin: 0px 5px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Reaction;
