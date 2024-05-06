import { PrismaClient } from "@prisma/client";
import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, Outlet, redirect, useLoaderData } from "@remix-run/react";
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

const prisma = new PrismaClient();

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
          <Sider>
            <Form method="post">
              name: <Input name="name" />
              email: <Input name="email" />
              <Button htmlType="submit" type="primary">
                New
              </Button>
            </Form>
          </Sider>
          <Layout>
            <Header>header</Header>
            <Content
              style={{
                height: "calc(100vh - (48px + 48px))",
                overflowY: "auto",
              }}
              className="p-4"
            >
              <Divider />
              <DatePicker />
              <Cascader />
              <ColorPicker />

              {users.map((user) => {
                return (
                  <div key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.id}</Link>: {user.name}{" "}
                    -- {user.email}
                  </div>
                );
              })}

              <Divider />

              <Outlet />
            </Content>
            <Footer className="h-[48px]">footer</Footer>
          </Layout>
          <Sider collapsible>right sidebar</Sider>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export const action: ActionFunction = async ({ params, request }) => {
  // console.debug("action:", params, request);
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  try {
    const r = await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
      },
    });
    return redirect(`/users/${r.id}`);
  } catch (err) {
    console.error(err);
    return redirect("/users");
  }
};
