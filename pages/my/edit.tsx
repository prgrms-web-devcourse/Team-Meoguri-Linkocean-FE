import PageLayout from "@/components/common/pageLayout";
import EditPage from "@/components/myEdit/editPage";
import React from "react";

const Edit = () => {
  return (
    <PageLayout>
      <PageLayout.Article>
        <EditPage />
      </PageLayout.Article>
    </PageLayout>
  );
};

export default Edit;
