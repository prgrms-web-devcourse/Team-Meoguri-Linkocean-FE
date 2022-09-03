import { color } from "@/styles/theme";
import styled from "@emotion/styled";

interface SelectedElementProps {
  content: string;
}

const SelectedElement = ({ content }: SelectedElementProps) => {
  return (
    <Wrapper>
      <TagDiv>
        {content}
        <DeleteDiv />
      </TagDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${color.$skyBlue};
  width: fit-content;
  border-radius: 8px;
  margin: 8px 0px;
  padding: 5px;
  padding-right: 20px;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const DeleteDiv = styled.div`
  position: relative;
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
`;

export default SelectedElement;
