import { PrismaClient } from "@prisma/client";
import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button, Input } from "antd";

const prisma = new PrismaClient();

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const theUser = await prisma.user.findFirst({
    where: {
      id: Number(params.userId),
    },
  });
  return theUser;
};

export const action: ActionFunction = async ({ params, request }) => {
  console.debug("action:");
  return {};
};

export default function Index() {
  const theUser = useLoaderData<typeof loader>();
  if (!theUser) {
    return <></>;
  }
  return (
    <>
      <h1>detail</h1>
      {theUser.name}@{theUser.email}
      <Form action="edit">
        <Button htmlType="submit" type="primary">Edit</Button>
      </Form>
    </>
  );
}
