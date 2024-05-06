import { PrismaClient } from "@prisma/client";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import { Input, Button, Divider, List, ListItem } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import stylesheet from "~/chakra.scss";

const prisma = new PrismaClient();

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const users = await prisma.user.findMany();
  return users;
};

export default function Index() {
  const users = useLoaderData<typeof loader>();
  return (
    <ChakraProvider>
      <div className="h-[48px]">header</div>
      <div className="flex">
        <div className="p-8 w-[256px]">
          <Form method="post">
            name: <Input name="name" />
            email: <Input name="email" />
            <Button type="submit">New</Button>
          </Form>
          <Divider />
          <Input type="datetime-local" />
        </div>
        <List spacing={2}>
          {users.map((user) => {
            return (
              <ListItem key={user.id}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                  to={`/users/${user.id}`}
                >
                  {user.id}: {user.name} -- {user.email}
                </NavLink>
              </ListItem>
            );
          })}
        </List>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </ChakraProvider>
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
