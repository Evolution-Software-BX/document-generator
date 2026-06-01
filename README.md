# Document Generator

Recovered project scaffold for a NestJS, Prisma, PostgreSQL and Next.js document generator.

## Development

Start PostgreSQL:

```powershell
docker compose up -d postgres
```

Backend:

```powershell
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Prisma Studio:

```powershell
cd backend
npx prisma studio
```
