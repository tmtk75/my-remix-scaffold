import {
  Button,
  ChakraProvider,
  Divider,
  Input,
  List,
  ListItem,
  extendTheme,
  withDefaultColorScheme,
  withDefaultSize,
  withDefaultVariant,
} from "@chakra-ui/react";
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
import stylesheet from "~/chakra.scss?url";

const prisma = new PrismaClient();

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const users = await prisma.user.findMany();
  return users;
};

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

const theme = extendTheme(
  // https://v2.chakra-ui.com/docs/styled-system/theme
  withDefaultColorScheme({ colorScheme: "teal" }),

  withDefaultSize({ size: "sm" }),

  withDefaultVariant({ variant: "outline" })
);

export default function Index() {
  const users = useLoaderData<typeof loader>();
  return (
    <ChakraProvider theme={theme}>
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
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                to={`/users/${user.id}`}
              >
                <ListItem key={user.id} className="flex flex-row justify-between">
                  <span className="mr-4">{user.id}</span>
                  <span className="mr-4">{user.name}</span>
                  <span>{user.email}</span>
                </ListItem>
              </NavLink>
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
