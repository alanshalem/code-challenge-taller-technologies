# Task Manager

Simple task manager app built with React + TypeScript and ASP.NET Core.

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (v18 or higher)

## Running the project

### Backend

Open a terminal in the `API` folder and run:

```bash
cd API
dotnet run
```

The API will start at `http://localhost:5120`

> **Note:** `dotnet run` automatically restores NuGet packages, so no extra install step needed.

### Frontend

Open another terminal in the `Client` folder and run:

```bash
cd Client
npm install
npm run dev
```

The app should open automatically in your browser, usually at `http://localhost:5173`

## Running tests

To run the frontend tests:

```bash
cd Client
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

## What's included

- RESTful API with in-memory storage
- Task CRUD operations (get, create, toggle status)
- Dark neobrutalism design with Tailwind CSS
- Clean architecture (Domain, Application, Persistence, API layers)
- Sample data seeded on startup
- Unit tests for React components (Vitest + React Testing Library)
