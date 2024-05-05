import {
  Button,
  Cascader,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Layout,
} from "antd";
import "antd/dist/reset.css";

export default function ButtonUsage() {
  const { Content, Footer, Header, Sider } = Layout;
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // colorPrimary: "#f5222d",
            // colorInfo: "#f5222d",
            fontSize: 14,
            sizeStep: 4,
            sizeUnit: 2,
          },
          components: {
            Layout: {
              headerHeight: 48,
              footerPadding: "16px 24px",
            },
          },
        }}
      >
        <Layout>
          <Header>
            <Button type="primary">Primary Button</Button>
          </Header>
          <Layout>
            <Sider>left sidebar</Sider>
            <Content
              style={{
                height: "calc(100vh - (48px + 48px))",
                overflowY: "auto",
              }}
            >
              <DatePicker />
              <Cascader />
              <ColorPicker />
            </Content>
            <Sider>right sidebar</Sider>
          </Layout>
          <Footer className="h-[48px]">footer</Footer>
        </Layout>
      </ConfigProvider>
    </>
  );
}
