import type { Document, WithId } from "mongodb";

export interface Snippets extends WithId<Document> {
  snippetName: string;
  codeSnippet: string;
  updatedAt: Date;
  createdAt: Date;
}
