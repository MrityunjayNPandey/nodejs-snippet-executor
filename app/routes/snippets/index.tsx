import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Snippet from "~/components/Snippet";
import { mongodb } from "~/utils/db.server";

export async function loader({ request }: LoaderArgs) {
  let db = await mongodb.db("sample_mflix");
  let collection = await db.collection("snippets");
  let snippets = await collection.find({}).toArray();

  return json({ snippets });
}

export default function Snippets() {
  let { snippets } = useLoaderData();
  return (
    <div>
      <h1>Snippets : </h1>
      <div style={{ padding: "1rem" }}>
        {snippets.map((snippet: any) => {
          return <Snippet snippet={snippet} />;
        })}
      </div>
    </div>
  );
}
