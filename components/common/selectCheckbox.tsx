import useToggle from "@/hooks/useToggle";
import { color, text } from "@/styles/theme";
import { TagType } from "@/types/type";
import styled from "@emotion/styled";
import React from "react";
import Checkbox from "./checkbox";

const SelectCheckbox = ({
  tags,
  checkedList,
  setCheckedList,
  ...props
}: {
  tags: TagType[];
  checkedList: string[];
  setCheckedList: (tag: string[]) => void;
}) => {
  const [selectState, toggle] = useToggle(false);

  const clickList = (e: React.MouseEvent<HTMLLIElement>) => {
    const tag = e.currentTarget.getAttribute("data-tag");
    if (!tag) return;
    const tagIndex = checkedList.indexOf(tag);
    if (tagIndex === -1) {
      setCheckedList([...checkedList, tag]);
    } else {
      const tagList = [...checkedList];
      tagList.splice(tagIndex, 1);
      setCheckedList(tagList);
    }
    e.preventDefault();
  };

  return (
    <Wrap>
      <Button {...props} onClick={toggle}>
        태그 선택
        <span>{checkedList.length}</span>
      </Button>
      {selectState ? (
        <ListBox>
          {tags.map(({ tag, count }) => (
            <List key={tag} onClick={clickList} data-tag={tag}>
              <span>
                # {tag}({count})
              </span>
              <Checkbox on={checkedList.indexOf(tag) !== -1} />
            </List>
          ))}
        </ListBox>
      ) : null}
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
`;

const Button = styled.button`
  border: none;
  background-color: ${color.$skyBlue};
  color: #fff;
  height: 44px;
  padding: 0 11px;
  border-radius: 8px;
  ${text.$subtitle1}
  cursor: pointer;
  :hover {
    background-color: ${color.$hoverSkyBlue};
    span {
      color: ${color.$hoverSkyBlue};
    }
  }
  span {
    display: inline-block;
    min-width: 26px;
    padding: 3px 6px;
    border-radius: 26px;
    background-color: #fff;
    color: ${color.$skyBlue};
    margin-left: 8px;
    box-sizing: border-box;
  }
`;

const ListBox = styled.ul`
  position: absolute;
  left: 0;

  width: 220px;
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${color.$gray100};
  border-radius: 8px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: ${color.$mainColor};
    background-clip: padding-box;
    border: 4px solid transparent;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
`;

const List = styled.li`
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  height: 37px;
  padding: 0 15px;
  cursor: pointer;
  :hover {
    background-color: ${color.$gray100};
  }
`;

export default SelectCheckbox;
