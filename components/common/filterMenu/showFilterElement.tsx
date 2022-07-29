import styled from "@emotion/styled";

const showFilterElement = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div``;
export default showFilterElement;
