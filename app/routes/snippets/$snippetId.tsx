import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { exec } from "child_process";
import { promisify } from "util";
import { mongodb, ObjectId } from "~/utils/db.server";

const execPromise = promisify(exec);

export async function loader({ params }: LoaderArgs) {
  const snippetId = params.snippetId;

  let db = await mongodb.db("sample_mflix");
  let collection = await db.collection("snippets");
  let snippet = await collection.findOne({ _id: new ObjectId(snippetId) });

  let output, error;

  if (snippet) {
    try {
      const { stdout, stderr } = await execPromise(
        `node -e "${snippet.codeSnippet.replace(/"/g, '\\"')}"`,
        { timeout: 5000 } // Add a timeout (e.g., 5 seconds)
      );
      output = stdout;
      error = stderr;
    } catch (e) {
      error = (e as any).message;
    }
  }

  return json({ snippet, output, error });
}

export default function Index() {
  const { snippet, output, error } = useLoaderData();
  return (
    <div>
      <h1>Snippet: {snippet.snippetName}</h1>
      <p>{snippet.codeSnippet}</p>
      <p>{output}</p>
      <p>{error}</p>
    </div>
  );
}
