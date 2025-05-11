import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { exec } from "child_process";
import { promisify } from "util";
import { mongodb, ObjectId } from "~/utils/db.server";

const execPromise = promisify(exec);

export async function loader({ params }: LoaderArgs) {
  const snippetId = params.snippetId;

  let db = await mongodb.db("sample_mflix");
  let collection = await db.collection("snippets");
  let snippet = await collection.findOne({ _id: new ObjectId(snippetId) });

  return json({ snippet });
}

export async function action({ request }: LoaderArgs) {
  const formData = await request.formData();
  const codeSnippet = formData.get("codeSnippet") as string;

  let output, error;

  if (codeSnippet) {
    try {
      const { stdout, stderr } = await execPromise(
        `node -e "${codeSnippet.replace(/"/g, '\\"')}"`,
        { timeout: 5000 } // Add a timeout (e.g., 5 seconds)
      );
      output = stdout;
      error = stderr;
    } catch (e) {
      error = (e as any).message;
    }
  }

  return json({ output, error });
}

export default function Index() {
  const { snippet } = useLoaderData();

  const fetcher = useFetcher<typeof action>(); // Use useFetcher here
  const executionResult = fetcher.data;
  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  const handleExecuteCode = () => {
    if (snippet?.codeSnippet) {
      const formData = new FormData();
      formData.append("codeSnippet", snippet.codeSnippet);

      fetcher.submit(formData, { method: "post" });
    }
  };

  return (
    <div>
      <h1>Snippet: {snippet.snippetName}</h1>
      <div>
        <h4>Snippet:</h4>
        <pre
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            padding: "10px",
            border: "1px solid #008000",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {snippet.codeSnippet}
        </pre>
      </div>
      <button
        onClick={handleExecuteCode}
        disabled={isLoading}
        style={{
          padding: "10px 15px",
          backgroundColor: isLoading ? "#cccccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
          marginTop: "10px",
        }}
      >
        {isLoading ? "Executing..." : "Run Snippet"}
      </button>

      {executionResult && (
        <div style={{ marginTop: "20px" }}>
          <h3>Execution Result:</h3>
          {executionResult.output !== null &&
            executionResult.output !== undefined && (
              <div>
                <h4>Output (stdout):</h4>
                <pre
                  style={{
                    backgroundColor: "#e6ffe6",
                    padding: "10px",
                    border: "1px solid #008000",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                  }}
                >
                  {executionResult.output}
                </pre>
              </div>
            )}
          {executionResult.error && (
            <div>
              <h4>Error (stderr or execution error):</h4>
              <pre
                style={{
                  backgroundColor: "#ffe6e6",
                  padding: "10px",
                  border: "1px solid #cc0000",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {executionResult.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
