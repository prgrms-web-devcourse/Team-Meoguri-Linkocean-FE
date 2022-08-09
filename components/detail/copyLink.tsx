import { color, text } from "@/styles/theme";
import styled from "@emotion/styled";
import React, { useRef, useState } from "react";

const CopyLink = ({ copyUrl }: { copyUrl: string }) => {
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const copyLink = () => {
    if (copyUrlRef.current) {
      copyUrlRef.current.select();
      document.execCommand("copy");
    }
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 500);
  };

  return (
    <Wrapper>
      <TextArea ref={copyUrlRef}>{copyUrl}</TextArea>
      <ToolTip showTooltip={showTooltip}>복사 완료</ToolTip>
      <CopyButton>
        <Icon onClick={copyLink} />
      </CopyButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin-left: 7px;
`;

const TextArea = styled.textarea`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

const ToolTip = styled.div`
  position: absolute;
  text-align: center;
  width: 62px;
  height: 24px;
  border: 1px solid ${color.$gray600};
  border-radius: 8px;
  top: -33px;
  right: 50%;
  transform: translateX(48%);
  ${text.$caption}
  line-height: 24px;
  font-weight: bold;
  visibility: ${(prop: { showTooltip: boolean }) =>
    prop.showTooltip ? "visible" : "hidden"};
  ::before {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-top: 4px solid ${color.$gray600};
    border-right: 4px solid ${color.$gray600};
    border-left: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-radius: 2px;
    bottom: -4px;
    left: 28px;
    transform: rotate(135deg);
    content: "";
  }
`;

const CopyButton = styled.div``;

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
