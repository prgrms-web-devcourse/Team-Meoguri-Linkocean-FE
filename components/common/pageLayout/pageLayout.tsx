import styled from "@emotion/styled";
import Header from "../header";
import Article from "./article";
import Aside, { PageLayoutProps } from "./aside";

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Layout>
      <Header />
      <main>{children}</main>
    </Layout>
  );
};

const Layout = styled.div`
  min-height: 100vh;
  main {
    display: flex;
    min-height: calc(100vh - 62px);
  }
  box-sizing: border-box;
`;

PageLayout.Article = Article;
PageLayout.Aside = Aside;

export default PageLayout;
