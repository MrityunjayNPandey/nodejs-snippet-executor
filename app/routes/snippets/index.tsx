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

export default function Movies() {
  let { snippets } = useLoaderData();
  console.log("🚀 ~ Movies ~ snippets:", snippets);
  return (
    <div>
      <h1>Snippets</h1>
      <h2>Fetch snippets</h2>
      <p className="mb-2">Snippets</p>
      {snippets.map((snippet: any) => {
        return <Snippet snippet={snippet} />;
      })}
    </div>
  );
}
