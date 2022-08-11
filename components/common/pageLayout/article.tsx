import styled from "@emotion/styled";
import { PageLayoutProps } from "./aside";

const Article = ({ children }: PageLayoutProps) => {
  return <ArticleBox>{children}</ArticleBox>;
};

const ArticleBox = styled.article`
  background-color: white;
  width: 100%;
  padding: 80px 50px;
`;

export default Article;
