import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useEffect } from "react";

export interface ModalProps {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

const body = document.getElementsByTagName("body")[0];
const Modal = ({
  isShow,
  setIsShow,
  width = 300,
  height = 300,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (isShow) {
      body.classList.add("scrollLock");
    } else {
      body.classList.remove("scrollLock");
    }
  }, [isShow]);

  return (
    <Wrapper isShow={isShow}>
      <Background onClick={() => setIsShow(false)} />
      <ModalBox width={width} height={height}>
        {children}
      </ModalBox>
    </Wrapper>
  );
};

const ModalBox = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props: { width: number; height: number }) => props.width}px;
  height: ${(props: { width: number; height: number }) => props.height}px;
  border-radius: 8px;
  background-color: #fff;
  z-index: 20;
`;

const Wrapper = styled.div`
  display: ${(props: { isShow: boolean }) => (props.isShow ? "block" : "none")};
`;

const Background = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
`;

export default Modal;
