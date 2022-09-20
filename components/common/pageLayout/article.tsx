import { media } from "@/styles/theme";
import styled from "@emotion/styled";
import { PageLayoutProps } from "./aside";

const Article = ({ children }: PageLayoutProps) => {
  return <ArticleBox>{children}</ArticleBox>;
};

const ArticleBox = styled.article`
  background-color: white;
  padding: 80px 50px;
  box-sizing: border-box;
  ${media.laptop} {
    padding: 40px 30px;
  }
  ${media.tablet} {
    padding: 40px 20px;
  }
`;

export default Article;
