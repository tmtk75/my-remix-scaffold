import { PrismaClient } from "@prisma/client";
import type {
  LoaderFunctionArgs
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
  const theUser = useLoaderData<typeof loader>();
  return (
    <>
      {theUser ? (
        <>
          detail: {theUser.name}@{theUser.id}
        </>
      ) : undefined}
    </>
  );
}
