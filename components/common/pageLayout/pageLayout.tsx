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
  overflow: hidden;
  main {
    display: flex;
    min-height: 100vh;
  }
`;

PageLayout.Article = Article;
PageLayout.Aside = Aside;

export default PageLayout;
