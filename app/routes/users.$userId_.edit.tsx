/*
 * not nest inside. https://remix.run/docs/en/main/start/tutorial#updating-data
 */
import { Button, Input } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
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

//
// curl -v -H"content-type: application/x-www-form-urlencoded;charset=UTF-8" -d 'name=abcd1234&email=1234@test.test' localhost:5173/users/40/edit
//
export const action = async ({ params, request }: ActionFunctionArgs) => {
  // console.debug("action:", params);
  const userId = params.userId;
  const formData = await request.formData();
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
    // console.log(r);
    return redirect(`/users/${r.id}`);
  } catch (err) {
    console.error(err);
    return redirect("/users");
  }
};

export default function Index() {
  // const users = useRouteLoaderData("routes/users");
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
      <h1 className="text-2xl font-bold">detail</h1>
      <Form method="post">
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
        <Button type="submit">Save</Button>
      </Form>
    </>
  );
}
