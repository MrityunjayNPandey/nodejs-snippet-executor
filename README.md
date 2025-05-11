# NodeJS Snippet Executor

A web application built with Remix, React, Node.js, and MongoDB that allows users to store, view, and execute NodeJS code snippets.

## Overview

This project provides a platform for managing and running small NodeJS code snippets directly from a web interface. It's designed to be a simple and effective tool for testing and sharing code.

## Features

- **List Snippets:** View all stored code snippets.
- **View Snippet:** See the details and code of a specific snippet.
- **Execute Snippets:** Run NodeJS code snippets and see their `stdout` and `stderr` output.
- **Add Snippets:** (Assumed based on UI links) Functionality to add new code snippets.
- **Responsive UI:** Styled with Tailwind CSS for a clean and modern look.

## Tech Stack

- **Frontend:**
  - [Remix](https://remix.run/): Full stack web framework.
  - [React](https://reactjs.org/): JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
- **Backend:**
  - [Node.js](https://nodejs.org/): JavaScript runtime environment.
  - [Express.js](https://expressjs.com/) (via Remix server): Web application framework.
- **Database:**
  - [MongoDB](https://www.mongodb.com/): NoSQL document database.
- **Language:**
  - [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript that adds static typing.

## Prerequisites

- Node.js (>=14, as specified in `package.json`)
- npm (comes with Node.js) or yarn
- A running MongoDB instance (local or cloud-hosted like MongoDB Atlas).

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd nodejs-snippet-executor
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. This file will store your MongoDB connection string.

    ```
    CONNECTION_STRING=your_mongodb_connection_string_here
    ```

    Refer to the <mcfile name="db.server.ts" path="nodejs-snippet-executor/app/utils/db.server.ts"></mcfile> file for how the connection string is used. It expects a standard MongoDB connection URI.
    Example for a local MongoDB instance:
    `CONNECTION_STRING=mongodb://localhost:27017`

    **Important:** Ensure your connection string includes `appName` or it will be appended automatically (e.g., `appName=devrel.template.remix`).

## Running the Application

1.  **Development Mode:**
    This command will start the Remix development server and the Tailwind CSS watcher.

    ```bash
    npm run dev
    ```

    The application will typically be available at `http://localhost:3000`.

2.  **Production Build:**
    To build the application for production:
    ```bash
    npm run build
    ```
    To serve the production build:
    ```bash
    npm run start
    ```

## Available Scripts

The <mcfile name="package.json" path="nodejs-snippet-executor/package.json"></mcfile> file contains several scripts for managing the application:

- `npm run build`: Compiles the Tailwind CSS and builds the Remix application for production.
- `npm run build:css`: Compiles Tailwind CSS.
- `npm run dev`: Starts the application in development mode with live reloading and CSS watching.
- `npm run dev:css`: Starts the Tailwind CSS watcher.
- `npm run start`: Serves the production build of the application.
- `npm run test`: Opens Cypress for testing (ensure Cypress is configured if you intend to use this).
- `npm run db:seed`: Seeds the database using Prisma. (Note: The primary database interaction seems to be via the native MongoDB driver in `db.server.ts`. This script might be for a different setup or legacy.)
- `npm run db:setup`: Pushes Prisma schema to the database. (Similar note as `db:seed`.)

## Project Structure

A brief overview of the key directories:

- `app/`: Contains the core application code, including routes, components, and utility functions.
  - `components/`: Reusable React components (e.g., <mcfile name="Snippet.tsx" path="nodejs-snippet-executor/app/components/Snippet.tsx"></mcfile>).
  - `routes/`: Defines the application's routes and their corresponding loader/action functions.
  - `styles/`: CSS files, including the main `app.css` processed by Tailwind.
  - `utils/`: Utility files, such as database connection (<mcfile name="db.server.ts" path="nodejs-snippet-executor/app/utils/db.server.ts"></mcfile>) and type definitions (<mcfile name="types.server.ts" path="nodejs-snippet-executor/app/utils/types.server.ts"></mcfile>).
- `public/`: Static assets that are served directly.
- `prisma/`: Contains Prisma schema and seed scripts (if Prisma is actively used for the core functionality).
- <mcfile name="remix.config.js" path="nodejs-snippet-executor/remix.config.js"></mcfile>: Configuration file for the Remix framework.
- <mcfile name="tailwind.config.js" path="nodejs-snippet-executor/tailwind.config.js"></mcfile>: Configuration file for Tailwind CSS.
- <mcfile name="tsconfig.json" path="nodejs-snippet-executor/tsconfig.json"></mcfile>: TypeScript compiler options.

## How Snippet Execution Works

The core snippet execution logic is handled in <mcfile name="$snippetId.tsx" path="nodejs-snippet-executor/app/routes/snippets/$snippetId.tsx"></mcfile>.
When a user requests to run a snippet:

1.  An `action` function is triggered on the server.
2.  The `codeSnippet` is retrieved from the form data.
3.  Node.js's `child_process.exec` function is used to execute the code snippet in a sandboxed manner (e.g., `node -e "your_code_here"`).
4.  A timeout is implemented to prevent long-running scripts.
5.  The `stdout` (standard output) and `stderr` (standard error) from the execution are captured.
6.  The results (output or error) are sent back to the client and displayed.

**Security Note:** Executing arbitrary code from users can be risky. The current implementation uses `node -e` which provides some level of isolation, and a timeout is in place. For a production application handling untrusted code, further sandboxing and security measures would be crucial.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project does not specify a license in its `package.json`. Please add a license file if you intend to distribute it.
