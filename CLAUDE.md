# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. Agents.md provides instructions as well, and guidance on other docs in the repo you can reference. 

IMPORTANT - Always review progress.md prior to making any changes and update it after completing every task. 

## Project Overview

Survey Creator is a conversational survey builder built as a Turborepo monorepo. The application allows users to create interactive surveys with a visual flow editor, style them with custom themes, and analyze responses through a dashboard.

## Architecture

This is a Turborepo monorepo with three main applications:

- **apps/web**: Main Next.js frontend application (port 3000) - Builder, Dashboard, and survey interface
- **apps/api**: Express.js backend API (port 3001) - Survey management and response handling  
- **apps/docs**: Next.js documentation app (port 3001) - Project documentation

### Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript, CORS, body-parser
- **State Management**: Zustand
- **Flow Editor**: React Flow for visual survey building
- **File Processing**: xlsx for spreadsheet uploads
- **Build System**: Turborepo with intelligent caching

## Development Commands

### Root Level (using Turborepo)
```bash
npm run dev          # Start all apps in development mode
npm run build        # Build all apps and packages
npm run lint         # Run linting across all apps
npm run check-types  # Run TypeScript type checking
npm run format       # Format code with Prettier
```

### App-Specific Commands
```bash
# Run specific app only
turbo dev --filter=web    # Frontend only (port 3000)
turbo dev --filter=api    # Backend only (port 3001)
turbo dev --filter=docs   # Documentation only (port 3001)

# Build specific app
turbo build --filter=web
turbo build --filter=api
```

### Individual App Development
```bash
# API (apps/api)
npm run dev    # ts-node-dev src/index.ts
npm run build  # TypeScript compilation
npm run start  # Run built application

# Web (apps/web) 
npm run dev         # Next.js with Turbopack
npm run build       # Next.js build
npm run start       # Next.js production server
npm run lint        # ESLint with max-warnings 0
npm run check-types # TypeScript check without emit
```

## Project Structure

### Backend API (apps/api)
- Express.js server with TypeScript
- Mock authentication middleware
- Survey CRUD operations
- Response collection and retrieval
- Public survey configuration endpoint

### Frontend (apps/web)
- Next.js app with App Router
- Key components:
  - `Flow.tsx`: React Flow editor for building surveys
  - `SpreadsheetUpload.tsx`: CSV/Excel file upload handling
- Builder interface at `/builder`
- Uses Zustand for state management

### Core API Endpoints
- `POST /api/surveys` - Create survey
- `GET /api/surveys` - List user surveys  
- `GET /api/surveys/:id` - Get survey configuration
- `PUT /api/surveys/:id` - Update survey
- `GET /api/surveys/:id/public` - Public survey config
- `POST /api/responses` - Submit survey response
- `GET /api/surveys/:id/responses` - Get survey responses

## Development Workflow

1. **Start Development**: Run `npm run dev` from root to start all services
2. **Type Safety**: The project uses TypeScript extensively - always run `npm run check-types` before commits
3. **Code Quality**: Run `npm run lint` and `npm run format` before commits
4. **Testing**: Check individual app README files for testing instructions

## Important Notes

- Uses npm workspaces for package management
- Turborepo handles build caching and parallel execution
- All apps use TypeScript with strict type checking
- Frontend uses Next.js 15 with App Router
- Backend uses Express.js with TypeScript
- React Flow is the core library for the visual survey builder
- xlsx library handles spreadsheet file processing
-