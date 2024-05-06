/*
 * not nest inside. https://remix.run/docs/en/main/start/tutorial#updating-data
 */
import { PrismaClient } from "@prisma/client";
import { type ActionFunction, redirect } from "@remix-run/node";
const prisma = new PrismaClient();

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
    return redirect(`/antd-sample/${r.id}`);
  } catch (err) {
    console.error(err);
    return redirect("/antd-sample");
  }
};

export default function Index() {
  return <></>;
}
