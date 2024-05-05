import { Button, Layout } from "antd";
import "antd/dist/reset.css";

export default function ButtonUsage() {
  const { Content, Footer, Header, Sider } = Layout;
  return (
    <>
      <Layout>
        <Header>
          <Button type="primary">Primary Button</Button>
        </Header>
        <Layout>
          <Sider>left sidebar</Sider>
          <Content className="h-[240px]">main content</Content>
          <Sider>right sidebar</Sider>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </>
  );
}
