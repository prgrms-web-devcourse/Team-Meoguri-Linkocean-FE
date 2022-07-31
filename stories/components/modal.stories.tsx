import Button from "@/components/common/button";
import Modal, { ModalProps } from "@/components/common/modal";
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
  const [isShow, setIsShow] = useState<boolean>(true);
  const { width, height } = args;

  return (
    <div>
      <Button
        onClick={() => setIsShow(true)}
        buttonType="small"
        colorType="skyblue"
      >
        버튼
      </Button>
      <Modal
        isShow={isShow}
        setIsShow={setIsShow}
        width={width}
        height={height}
      >
        <p>abc</p>
      </Modal>
    </div>
  );
};
