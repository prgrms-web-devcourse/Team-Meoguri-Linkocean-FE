import React, { KeyboardEvent, useRef } from "react";
import styled from "@emotion/styled";

export interface CreateProps {
  tags: number[];
  setTags: React.FC;
}

const Tag = ({ tags, setTags }: CreateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 태그 제거
  const removeTag = (num: number) => {
    const item = tags.slice(0);
    item.splice(num, 1);
    setTags(item);
  };

  // 태그 추가
  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const item = tags.slice();
      item.push(parseInt(inputRef?.current?.value as string, 10));
      setTags(item);
      const current = inputRef.current as HTMLInputElement;
      current.value = "";
    }
  };

  return (
    <TagBox>
      {/* tags */}
      {tags.map((item) => {
        return (
          <TagBtn key={item}>
            <span>{item}</span>
            <button type="button" onClick={() => removeTag(item)}>
              {" "}
            </button>
          </TagBtn>
        );
      })}
      {/* input */}
      <Input
        ref={inputRef}
        onKeyPress={addTag}
        placeholder="Press enter to add tags"
        type="text"
      />
    </TagBox>
  );
};

export default Tag;

// TagBox위치
const TagBox = styled.div`
  display: flex;
  width: 80%;
  height: 40px;
  margin: 150px auto;
  border: 1px solid #bbb;
  border-radius: 10px;
  padding: 10px;
  :focus-within {
    border: 1px solid var(--main-color);
  }
`;

// 태그
const TagBtn = styled.div`
  display: flex;
  background-color: var(--main-color);
  color: #fff;
  padding: 10px;
  margin-right: 3px;
  border-radius: 10px;
  font-weight: bold;
  white-space: nowrap;
  > button {
    position: relative;
    width: 20px;
    padding: 0;
    margin-left: 5px;
    border: none;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    :before,
    :after {
      position: absolute;
      top: 6px;
      left: 9px;
      width: 2px;
      height: 10px;
      border-radius: 2px;
      background-color: var(--main-color);
      content: "";
    }
    :before {
      transform: rotate(45deg);
    }
    :after {
      transform: rotate(-45deg);
    }
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
