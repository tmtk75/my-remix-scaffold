/*
 *
 */
import { redirect, type ActionFunction } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
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
  } catch (err) {
    console.error(err);
    return redirect("/antd-sample");
  }
  return redirect("/antd-sample");
};

export default function Index() {
  return <></>;
}
