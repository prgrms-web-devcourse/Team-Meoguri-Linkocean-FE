import { Meta, PageLayout } from "@/components/common";
import EditPage from "@/components/myEdit/editPage";
import React from "react";

const Edit = () => {
  return (
    <>
      <Meta
        title="프로필 수정"
        description="프로필 수정"
        robots="noindex, nofollow"
        titleWithoutSuffix
      />
      <PageLayout>
        <PageLayout.Article>
          <EditPage />
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Edit;
