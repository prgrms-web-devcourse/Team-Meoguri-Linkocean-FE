import React, { KeyboardEvent, useRef } from "react";
import styled from "@emotion/styled";
import { color } from "@/styles/theme";

export interface CreateProps {
  tag: string[];
  setTag: (item: string[]) => void;
  width?: string;
  height?: string;
}

const Tag = ({ tag, setTag, ...props }: CreateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 태그 제거
  const removeTag = (num: number) => {
    const item = tag.slice(0);
    item.splice(num, 1);
    setTag(item);
  };

  // 태그 추가
  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const item = tag.slice();
      item.push(inputRef?.current?.value as string);
      setTag(item);
      const current = inputRef.current as HTMLInputElement;
      current.value = "";
    }
  };
  return (
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
        {...props}
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
  border-radius: 8px;
  padding: 10px;
  :focus-within {
    border: 1px solid ${color.$mainColor};
  }
`;

// 태그
const TagBtn = styled.div`
  display: flex;
  background-color: ${color.$skyBlue};
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
