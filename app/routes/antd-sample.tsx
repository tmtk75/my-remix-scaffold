import type {
  ActionFunction,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Button,
  Cascader,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Divider,
  Input,
  Layout,
} from "antd";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const action: ActionFunction = async ({ params, request }) => {
  console.debug("action:", params, request);
  return {};
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const users = await prisma.user.findMany();
  return users;
};

export default function Index() {
  const users = useLoaderData<typeof loader>();

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
          <Sider>left sider</Sider>
          <Layout>
            <Header>header</Header>
            <Content
              style={{
                height: "calc(100vh - (48px + 48px))",
                overflowY: "auto",
              }}
              className="p-4"
            >
              <Form action="new" method="post">
                name: <Input name="name" />
                email: <Input name="email" />
                <Button htmlType="submit" type="primary">
                  New
                </Button>
              </Form>

              <Divider />
              <DatePicker />
              <Cascader />
              <ColorPicker />

              {users.map((user) => {
                return <div key={user.id}>{user.id}: {user.name} -- {user.email}</div>;
              })}
            </Content>
            <Footer className="h-[48px]">footer</Footer>
          </Layout>
          <Sider collapsible>right sidebar</Sider>
        </Layout>
      </ConfigProvider>
    </>
  );
}
