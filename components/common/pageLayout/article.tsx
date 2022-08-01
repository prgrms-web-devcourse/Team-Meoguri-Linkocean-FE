import styled from "@emotion/styled";
import { PageLayoutProps } from "./aside";

const Article = ({ children }: PageLayoutProps) => {
  return <ArticleBox>{children}</ArticleBox>;
};

const ArticleBox = styled.article`
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

export default Article;
