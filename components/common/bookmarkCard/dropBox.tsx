import useToggle from "@/hooks/useToggle";
import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";

export interface DropBoxProps {
  children: JSX.Element;
}

const DropBox = ({ children }: DropBoxProps) => {
  const [checked, toggle] = useToggle(false);
  const share = () => alert("공유하기");

  const edit = () => alert("수정하기");

  const deletePost = () => alert("삭제하기");

  return (
    <Box>
      <button type="button" onClick={toggle}>
        {children}
      </button>
      <List checked={checked}>
        <li>
          <button type="button" onClick={share}>
            공유하기
          </button>
        </li>
        <li>
          <button type="button" onClick={edit}>
            수정하기
          </button>
        </li>
        <li>
          <button type="button" onClick={deletePost}>
            삭제하기
          </button>
        </li>
      </List>
    </Box>
  );
};

const Box = styled.div`
  button {
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
`;
const List = styled.ul`
  position: absolute;
  top: 35px;
  right: 1px;
  width: 88px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid ${color.$gray100};
  visibility: ${(props: { checked: boolean }) =>
    props.checked ? "visible" : "hidden"};
  &::after {
    position: absolute;
    top: -7px;
    right: 11px;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: 7px solid ${color.$gray100};
    content: "";
  }

  li > button {
    height: 26px;
    transition: background-color 0.3s;
    width: 100%;
    ${text.$caption}
    &:not(:last-child) {
      border-bottom: 1px solid ${color.$gray100};
    }
    &:hover {
      background-color: ${color.$gray50};
    }
  }
`;

export default DropBox;
