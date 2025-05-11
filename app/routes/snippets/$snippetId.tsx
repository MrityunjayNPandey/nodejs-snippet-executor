import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mongodb, ObjectId } from "~/utils/db.server";

export async function loader({ params }: LoaderArgs) {
  const snippetId = params.snippetId;

  let db = await mongodb.db("sample_mflix");
  let collection = await db.collection("snippets");
  let snippet = await collection.findOne({ _id: new ObjectId(snippetId) });

  return json(snippet);
}

export default function Index() {
  const snippet = useLoaderData();
  return (
    <div>
      <h1>Snippet: {snippet.snippetName}</h1>
      <p>{snippet.codeSnippet}</p>
    </div>
  );
}
