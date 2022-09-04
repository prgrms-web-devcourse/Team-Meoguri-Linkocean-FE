import styled from "@emotion/styled";
import React from "react";
import Header from "../header";
import Article from "./article";
import Aside, { PageLayoutProps } from "./aside";

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
    display: flex;
    margin: auto;
    min-height: calc(100vh - 62px);
    min-width: 1130px;
  }
  box-sizing: border-box;
`;

PageLayout.Article = Article;
PageLayout.Aside = Aside;

export default PageLayout;
