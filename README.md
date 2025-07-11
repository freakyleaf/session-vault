# Studio Log

This project is composed of a MERN stack backend application (authenticated with Clerk) and a React frontend application.

## Prerequisites

- [MongoDB](https://www.mongodb.com/) - version 8.0 or later
- [Node.js](https://nodejs.org/) - version 20.10.0 or later
- [PNPM](https://pnpm.io/) - version 10.8.0 or later
- A [Clerk](https://clerk.com/) account

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/freakyleaf/studio-log.git
   cd studio-log
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

4. Fill in the environment variables in the `.env` file.

5. Start the development server:
   ```bash
   pnpm dev
   ```

## Account Types

There are two types of accounts in this application:

- `admin` - has full access to all resources and can manage other users.
- `artist` - has access to their own resources and cannot manage other users.

To give a user admin privileges, add `role: "admin"` to their Clerk user public metadata.
