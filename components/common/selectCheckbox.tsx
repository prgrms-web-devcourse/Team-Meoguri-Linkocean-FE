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
      <Button {...props} toggle={selectState} onClick={toggle}>
        태그 선택
        <span>{checkedList.length}</span>
      </Button>
      {selectState ? (
        <ListBox>
          {tags.map(({ tag, count }) => (
            <List key={tag} onClick={clickList} data-tag={tag}>
              <span>
                # {tag} ({count > 99 ? "99+" : count})
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
  background-color: ${({ toggle }: { toggle: boolean }) =>
    toggle ? color.$skyBlue : "#fff"};
  color: ${({ toggle }: { toggle: boolean }) =>
    toggle ? "#fff" : color.$gray600};
  height: 44px;
  padding: 0 11px;
  border-radius: 8px;
  ${text.$subtitle1}
  font-weight: normal;
  cursor: pointer;
  :hover {
    background-color: ${color.$skyBlue};
    color: #fff;
    span {
      color: ${color.$skyBlue};
    }
  }
  span {
    display: inline-block;
    min-width: 26px;
    padding: 3px 6px;
    border-radius: 26px;
    background-color: #fff;
    color: ${({ toggle }: { toggle: boolean }) =>
      toggle ? color.$skyBlue : color.$gray600};
    margin-left: 8px;
    box-sizing: border-box;
  }
`;

const ListBox = styled.ul`
  position: absolute;
  left: 2px;
  width: 250px;
  max-height: 280px;
  margin-top: 9px;
  padding: 10px 0;
  overflow-y: auto;
  border: 1px solid ${color.$gray100};
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgb(0 0 0 / 15%);
  background-color: #fff;
  overflow: overlay;
  z-index: 10;
  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: ${color.$mainColor};
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;

const List = styled.li`
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 0 15px;
  margin: 5px 0;
  cursor: pointer;
  :hover {
    background-color: #88bedf20;
  }
  span {
    color: ${color.$gray600};
  }
`;

export default SelectCheckbox;
