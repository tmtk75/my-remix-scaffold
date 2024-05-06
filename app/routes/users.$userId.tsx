import { Button } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useParams } from "@remix-run/react";

const prisma = new PrismaClient();

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const theUser = await prisma.user.findFirst({
    where: {
      id: Number(params.userId),
    },
  });
  return theUser;
};

export default function Index() {
  const params = useParams();
  const theUser = useLoaderData<typeof loader>();
  if (!theUser) {
    return <>Missing user. {JSON.stringify(params)}</>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold">detail</h1>
      {theUser.name}@{theUser.email}
      <Form action="edit">
        <Button type="submit">Edit</Button>
      </Form>
    </>
  );
}
