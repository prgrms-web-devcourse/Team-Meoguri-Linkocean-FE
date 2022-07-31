import styled from "@emotion/styled";
import Image from "next/image";
import { color } from "@/styles/theme";

const Top = () => {
  return (
    <Wrapper>
      <Icon src="/icon/arrow.svg" alt="top" width={50} height={50} />
    </Wrapper>
  );
};

const Icon = styled(Image)`
  transform: rotate(90deg);
  filter: brightness(0) invert(1);
`;

const Wrapper = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${color.$gray400};
  cursor: pointer;
`;

export default Top;
