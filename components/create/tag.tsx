import React, { KeyboardEvent, useRef, useState } from "react";
import styled from "@emotion/styled";
import { color, text } from "@/styles/theme";
// import ErrorText from "@/components/common/errorText";

export interface CreateProps {
  tag: string[];
  setTag: (item: string[]) => void;
  width?: string;
  height?: string;
}

const Tag = ({ tag, setTag, ...props }: CreateProps) => {
  const [isEmphasis, setIsEmphasis] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const TAG_LIMIT = 5;

  // 태그 제거
  const removeTag = (num: number) => {
    const item = tag.slice(0);
    item.splice(num, 1);
    setTag(item);
  };

  // 태그 추가
  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (tag.length >= TAG_LIMIT) {
      setIsEmphasis(true);
      return;
    }

    // if (e.key === "Spacebar") {
    //   return;
    // }
    if (e.key === "Enter") {
      const item = tag.slice();
      item.push(inputRef?.current?.value as string);
      setTag(item);
      const current = inputRef.current as HTMLInputElement;
      current.value = "";
    }
  };
  return (
    <>
      <TagBox {...props}>
        {/* tags */}
        {tag.map((item, num) => {
          const key = `${num}-${item}`;
          return (
            <TagBtn key={key} {...props}>
              <span>{item}</span>
              <button type="button" onClick={() => removeTag(num)} {...props}>
                {" "}
              </button>
            </TagBtn>
          );
        })}
        {/* input */}
        <Input
          ref={inputRef}
          onKeyPress={addTag}
          placeholder="태그를 입력하세요"
          type="text"
          onBlur={() => isEmphasis && setIsEmphasis(false)}
          {...props}
        />
      </TagBox>
      {isEmphasis ? (
        <BoldText>💬 태그는 최대 5개까지 입력 가능합니다.</BoldText>
      ) : (
        <Text>💬 태그는 최대 5개까지 입력 가능합니다.</Text>
      )}
    </>
  );
};

export default Tag;

// TagBox위치
const TagBox = styled.div`
  display: flex;
  /* width: 80%; */
  height: 40px;
  /* margin: 150px auto; */
  border: 1px solid ${color.$gray600};
  border-radius: 8px;
  padding: 10px;
  :focus-within {
    border: 1px solid ${color.$mainColor};
  }
`;

// 태그
const TagBtn = styled.div`
  display: flex;
  background-color: #fff;
  border: 2px solid ${color.$mainColor};
  padding: 9px 15px;
  margin-right: 10px;
  border-radius: 20px;
  font-weight: bold;
  white-space: nowrap;
  > button {
    position: relative;
    width: 10px;
    padding: 0;
    margin-left: 5px;
    border: none;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;

    &:hover::after,
    &:hover::before {
      background-color: ${color.$hoverMaincolor};
    }

    :before,
    :after {
      position: absolute;
      top: 3px;
      left: 9px;
      width: 2px;
      height: 12px;
      border-radius: 2px;
      background-color: ${color.$mainColor};
      content: "";
    }
    :before {
      transform: rotate(45deg);
    }
    :after {
      transform: rotate(-45deg);
    }
  }

  > span {
    color: ${color.$mainColor};
    ${text.$subtitle1}
  }
`;

// input
const Input = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 10px;
  margin: 0 0 0 10px;
  padding: 0;
  font-size: 20px;
  box-sizing: border-box;
  :focus {
    outline: none;
  }
`;

const Text = styled.span`
  padding: 10px;
  ${text.$caption}
  color: ${color.$gray600}
`;

const BoldText = styled.span`
  padding: 10px;
  ${text.$caption}
  color: ${color.$warning}
`;
