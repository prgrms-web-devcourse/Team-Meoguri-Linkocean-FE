import styled from "@emotion/styled";
import React, { useRef } from "react";

const CopyLink = ({ copyUrl }: { copyUrl: string }) => {
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);

  const copyLink = () => {
    if (copyUrlRef.current) {
      copyUrlRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <Wrapper>
      <TextArea ref={copyUrlRef}>{copyUrl}</TextArea>
      <CopyButton>
        <Icon onClick={copyLink} />
      </CopyButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const TextArea = styled.textarea`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

const CopyButton = styled.div`
  position: relative;
  margin-left: 7px;
`;

const Icon = styled.button`
  width: 16px;
  height: 16px;
  border: none;
  background-position: center;
  background-size: 16px 16px;
  background-image: url("/icon/copy.svg");
  background-color: transparent;
  transition: opacity 0.3s;
  opacity: 0.8;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

export default CopyLink;
