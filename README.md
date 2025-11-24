#  Shopy

Full-stack e-commerce built with [T3 Stack](https://create.t3.gg/)

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```bash
# Database URL for prisma
DATABASE_URL=

# URL of the website
NEXTAUTH_URL='http://localhost:3000'

# Used to hash tokens, sign/encrypt cookies and ...
# You can quickly create a good value with this command
# openssl rand -base64 32


## Run Locally


Go to the project directory


Install dependencies

```bash
  pnpm install
```

Apply migrations to database

```bash
  pnpm migrate-dev
```

Seed the database

```bash
  pnpm db-seed
```

Start the server

```bash
  pnpm dev
```
=======
# shopy
>>>>>>> ea6cbdc6ab30153e63def7b4e3bf412359eab598
