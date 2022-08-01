import Top from "@/components/common/top";

export default {
  title: "components/Top",
  component: Top,
  argTypes: {},
};

export const Default = () => (
  <>
    <div style={{ height: "10000px" }}>
      <div>top</div>
    </div>
    <Top />
  </>
);
