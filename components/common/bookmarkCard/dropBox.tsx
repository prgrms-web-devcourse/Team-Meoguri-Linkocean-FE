import useToggle from "@/hooks/useToggle";
import { color, text } from "@/styles/theme";
import bookmarkAPI from "@/utils/apis/bookmark";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

export interface DropBoxProps {
  children: JSX.Element;
  isWriter: boolean;
  id: number;
  deleteBookmark: (id: number) => void;
}

const DropBox = ({
  children,
  isWriter = true,
  id,
  deleteBookmark,
}: DropBoxProps) => {
  const [checked, toggle] = useToggle(false);
  const router = useRouter();

  const share = (e: React.MouseEvent<HTMLElement>) => {
    alert("공유하기");
    e.stopPropagation();
  };

  const edit = (e: React.MouseEvent<HTMLElement>) => {
    router.push(`/edit/${id}`);
    e.stopPropagation();
  };

  const deletePost = async (
    callback: (id: number) => void,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    const isDelete = window.confirm("북마크를 지우시겠습니까?");
    if (isDelete) {
      try {
        await bookmarkAPI.deleteBookmark(id);
        alert("북마크가 제거되었습니다.");
        callback(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openBox = (e: React.MouseEvent<HTMLElement>) => {
    toggle();
    e.stopPropagation();
  };

  return (
    <Box>
      <button type="button" onClick={openBox}>
        {children}
      </button>
      <List checked={checked}>
        <li>
          <button type="button" onClick={share}>
            공유하기
          </button>
        </li>
        {isWriter ? (
          <>
            <li>
              <button type="button" onClick={edit}>
                수정하기
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={(e) => deletePost(deleteBookmark, e)}
              >
                삭제하기
              </button>
            </li>
          </>
        ) : null}
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
  li:not(:last-of-type) button {
    border-bottom: 1px solid ${color.$gray100};
  }
  li:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }
  li:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
  }
  li > button {
    height: 26px;
    transition: background-color 0.3s;
    width: 100%;
    ${text.$caption}
    &:hover {
      background-color: ${color.$gray50};
    }
  }
`;

export default DropBox;
