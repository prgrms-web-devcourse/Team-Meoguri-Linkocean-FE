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
  justify-content: center;
  border-right: 2px solid ${color.$gray400};
  padding-top: 100px;
  background-color: #f4f9fc;
`;

export default Aside;
