import { Link } from "@remix-run/react";
import { Snippets } from "~/utils/types.server";

const Snippet = ({ snippet }: { snippet: Snippets }) => {
  return (
    <div key={snippet._id as any} style={{ padding: "1rem" }}>
      <li>
        <Link to={`/snippets/${snippet._id}`}>{snippet.snippetName}</Link>
      </li>
    </div>
  );
};

export default Snippet;
