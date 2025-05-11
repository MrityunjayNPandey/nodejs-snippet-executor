import { Link } from "@remix-run/react";
import { Snippets } from "~/utils/types.server";

const Snippet = ({ snippet }: { snippet: Snippets }) => {
  return (
    <div key={snippet._id as any}>
      <Link to={`/snippets/${snippet._id}`}>{snippet.snippetName}</Link>
    </div>
  );
};

export default Snippet;
