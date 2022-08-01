import PageLayout from "@/components/common/pageLayout";

export default {
  title: "components/PageLayout",
  component: PageLayout,
  argTypes: {},
};
export const Default = () => (
  <PageLayout>
    <PageLayout.Aside>
      <div>abc</div>
    </PageLayout.Aside>
    <PageLayout.Article>
      <div>내용</div>
    </PageLayout.Article>
  </PageLayout>
);
