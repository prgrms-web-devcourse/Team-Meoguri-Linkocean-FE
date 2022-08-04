import React, { KeyboardEvent, useRef } from "react";
import styled from "@emotion/styled";

export interface CreateProps {
  tag: string[];
  setTag: (item: string[]) => void;
}

const Tag = ({ tag, setTag }: CreateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(tag);

  // 태그 제거
  const removeTag = (num: number) => {
    const item = tag.slice(0);
    item.splice(num, 1);
    setTag(item);
    console.log(item);
  };

  // 태그 추가
  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const item = tag.slice();
      console.log(item);

      item.push(inputRef?.current?.value as string);
      setTag(item);

      const current = inputRef.current as HTMLInputElement;
      current.value = "";
      console.log(item);
    }
  };
  return (
    <TagBox>
      {/* tags */}
      {tag.map((item, num) => {
        const key = `${num}-${item}`;
        return (
          <TagBtn key={key}>
            <span>{item}</span>
            <button type="button" onClick={() => removeTag(num)}>
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
