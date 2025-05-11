import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import React from "react";
import stylesheet from "~/tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: stylesheet }];
}

export function meta() {
  const description = "A template for Remix applications using MongoDB";
  const keywords = "remix, react, mongodb, tailwindcss";

  return {
    description,
    keywords,
  };
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

type iDocType = {
  children: React.ReactNode;
  title?: string;
};

export function ErrorBoundry({ error }: any) {
  console.log(error);
  return (
    <Document title="Error!">
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Sorry, an error occurred!
          </h1>
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error Details:</strong>
            <pre className="mt-2 p-2 bg-red-50 rounded overflow-x-auto text-sm">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
          <p className="mt-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Go back to homepage
            </Link>
          </p>
        </div>
      </Layout>
    </Document>
  );
}

function Document({ children, title }: iDocType) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{title ? title : "MongoDB Remix Template"}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
      <Scripts />
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-gray-800 text-white p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">NodeJS Snippet Executor</h1>
          </div>
        </header>

        <div className="flex flex-1 container mx-auto mt-4 mb-4 overflow-hidden">
          <aside className="hidden sm:block w-64 bg-white p-4 rounded-lg shadow mr-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/snippets"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                  >
                    Snippets
                  </Link>
                </li>
                <li>
                  <Link
                    to="/snippets/add"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                  >
                    + Add Snippet
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 bg-white p-6 rounded-lg shadow overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
