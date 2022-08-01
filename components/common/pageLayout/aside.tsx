import { color } from "@/styles/theme";
import styled from "@emotion/styled";

export interface PageLayoutProps {
  children: React.ReactNode;
}

const Aside = ({ children }: PageLayoutProps) => {
  return <AsideBox>{children}</AsideBox>;
};

const AsideBox = styled.aside`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 96px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${color.$gray400};
  padding-top: 100px;
  background-color: #f4f9fc;
`;

export default Aside;
