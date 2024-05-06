/*
 * not nest inside. https://remix.run/docs/en/main/start/tutorial#updating-data
 */
import { PrismaClient } from "@prisma/client";
import {
  redirect,
  type ActionFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button, Input } from "antd";
import { useState } from "react";
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
  console.debug("action:", params, request);
  const formData = await request.formData();
  const userId = formData.get("userId");
  const name = formData.get("name");
  const email = formData.get("email");
  try {
    const r = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name: name as string,
        email: email as string,
      },
    });
    console.log(r);
    return redirect(`/users/${r.id}`);
  } catch (err) {
    console.error(err);
    return redirect("/users");
  }
};

export default function Index() {
  const theUser = useLoaderData<typeof loader>();
  const [state, setState] = useState<{ name: string; email: string }>({
    name: theUser?.name ?? "",
    email: theUser?.email ?? "",
  });
  if (!theUser) {
    return <></>;
  }
  return (
    <>
      <h1>detail</h1>
      <Form method="post">
        <Input type="hidden" name="userId" value={theUser.id} />
        name:{" "}
        <Input
          name="name"
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
        />
        email:{" "}
        <Input
          name="email"
          value={state.email}
          onChange={(e) => {
            setState((s) => ({ ...s, email: e.target.value }));
          }}
        />
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </Form>
    </>
  );
}
