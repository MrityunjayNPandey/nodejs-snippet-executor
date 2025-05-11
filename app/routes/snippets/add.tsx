import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { mongodb } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const snippet = {
    codeSnippet: formData.get("code_snippet"),
    snippetName: formData.get("snippet_name"),
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  const db = await mongodb.db("sample_mflix");
  const collection = await db.collection("snippets");
  await collection.insertOne(snippet);
  return redirect(`/snippets`);
}

export default function Index() {
  return (
    <div>
      <h2>Add a snippet</h2>
      <Form method="POST" action="/snippets/add">
        <div style={{ padding: 2 }}>
          <input
            type="text"
            name="snippet_name"
            placeholder="enter your code snippet name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div style={{ padding: 2 }}>
          <textarea
            name="code_snippet"
            placeholder="enter your code snippet"
            rows={10}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
