import Button from "@/components/common/button";
import Modal, { ModalProps } from "@/components/common/modal";
import styled from "@emotion/styled";
import { useState } from "react";

export default {
  title: "components/Modal",
  component: Modal,
  argTypes: {
    width: {
      control: "number",
      defaultValue: 300,
    },
    height: {
      control: "number",
      defaultValue: 300,
    },
  },
};

export const Default = (args: ModalProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { width, height } = args;

  return (
    <Page>
      <Button
        style={{ marginTop: "100px" }}
        onClick={() => setIsShow(true)}
        buttonType="small"
        colorType="skyblue"
      >
        버튼
      </Button>
      <Button
        style={{ display: "block" }}
        onClick={() => alert("눌리면 안댐~")}
        buttonType="small"
        colorType="skyblue"
      >
        이벤트발생하면 안댐
      </Button>
      <Modal
        isShow={isShow}
        setIsShow={setIsShow}
        width={width}
        height={height}
      >
        <p>abc</p>
      </Modal>
    </Page>
  );
};

const Page = styled.div`
  height: 10000px;
`;
