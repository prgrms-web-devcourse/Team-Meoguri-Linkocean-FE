import styled from "@emotion/styled";
import Image from "next/image";
import { color } from "@/styles/theme";
import { useState, useEffect } from "react";

const Top = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const moveToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  };

  return show ? (
    <Wrapper onClick={moveToTop}>
      <Icon src="/icon/arrow.svg" alt="top" width={50} height={50} />
    </Wrapper>
  ) : null;
};

const Icon = styled(Image)`
  transform: rotate(90deg);
  filter: brightness(0) invert(1);
`;

const Wrapper = styled.button`
  position: fixed;
  bottom: 20px;
  right: 50px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${color.$gray400};
  cursor: pointer;
`;

export default Top;
