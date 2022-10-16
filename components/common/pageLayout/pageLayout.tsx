import styled from "@emotion/styled";
import React from "react";
import Header from "../header";
import Article, { PageLayoutProps } from "./article";

const PageLayout = ({ children }: PageLayoutProps) => {
  const HeaderMemo = React.useMemo(() => <Header />, []);
  return (
    <Layout>
      {HeaderMemo}
      <main>{children}</main>
    </Layout>
  );
};

const Layout = styled.div`
  min-height: 100vh;
  main {
    min-height: calc(100vh - 62px);
  }
  box-sizing: border-box;
`;

PageLayout.Article = Article;

export default PageLayout;
