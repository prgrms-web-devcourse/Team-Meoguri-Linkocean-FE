import styled from "@emotion/styled";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return <Back onClick={() => router.back()} />;
};

const Back = styled.button`
  background-image: url("/icon/back.svg");
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: 14px, 24px;
  cursor: pointer;
`;

export default BackButton;
