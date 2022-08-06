import styled from "@emotion/styled";
import React from "react";
import Header from "@/components/common/header";

const NotFound = () => {
  const HeaderMemo = React.useMemo(() => <Header />, []);

  return (
    <Layout>
      {HeaderMemo}
      <main>not found</main>
    </Layout>
  );
};

export default NotFound;

const Layout = styled.div`
  min-height: 100vh;
  main {
    display: flex;
    min-height: calc(100vh-62px);
  }
  box-sizing: border-box;
`;
