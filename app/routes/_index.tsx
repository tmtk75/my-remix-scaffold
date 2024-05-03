import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { DatePicker, Button } from "antd";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const s3 = new S3Client({
    region: "us-east-1",
    endpoint: "http://localhost:4566",
  });
  const res = await s3.send(new ListBucketsCommand());
  console.log(res.Buckets);

  const users = await prisma.user.findMany();
  console.debug({ users });

  env;
  return users;
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>

      <Button type="primary">OK</Button>
      <DatePicker />
    </div>
  );
}
