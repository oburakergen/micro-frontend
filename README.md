# Micro-Frontend Architecture

This project implements a micro-frontend architecture with a shell application that hosts multiple independently-developed micro-frontends.

## Project Structure

- **shell-app**: The main container application that hosts all micro-frontends
- **event-bus**: Provides event-based communication between micro-frontends
- **page-vite**: A Vite-based micro-frontend
- **page-webpack**: A Webpack-based micro-frontend
- **shared-ui**: Shared UI components used across micro-frontends

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (optional, for containerized development)

### Development Setup

#### Using npm

1. Install dependencies for all workspaces:
   ```bash
   npm install
   ```

2. Start the shell app and all micro-frontends:
   ```bash
   # In separate terminals
   cd workspaces/event-bus && npm run start:dev
   cd workspaces/page-vite && npm run start:dev
   cd workspaces/page-webpack && npm run start:dev
   cd workspaces/shell-app && npm run start:dev
   ```

3. Access the application:
    - Shell app: http://localhost:3000
    - Page Vite: http://localhost:3003
    - Page Webpack: http://localhost:3004

#### Using Docker

1. Build and start all services:
   ```bash
   docker-compose up
   ```

2. Access the application at http://localhost:3000

## Architecture

### Routing

The shell app provides the main routing structure and loads micro-frontends based on the current route:
- `/` - Shell app home page
- `/page-vite/*` - Routes handled by the page-vite micro-frontend
- `/page-webpack/*` - Routes handled by the page-webpack micro-frontend

### Communication

Micro-frontends communicate through the event bus using a publish-subscribe pattern:
1. The event bus provides a way to emit and subscribe to events
2. Micro-frontends can subscribe to events they're interested in
3. Any micro-frontend can emit events that others might respond to

### Navigation

Navigation between micro-frontends is handled through the event bus:
1. A micro-frontend emits a NAVIGATION_REQUESTED event with the target path
2. The shell app listens for these events and updates the router accordingly

## Creating a New Micro-Frontend

Use the provided script to create a new micro-frontend:

```bash
npm run create:service
```

Follow the prompts to choose the template type (Vite or Webpack) and the name for your new micro-frontend.

## Building for Production

Build all micro-frontends:

```bash
# Build all workspaces
npm run build --workspaces
```

## Integration Testing

To ensure proper integration between micro-frontends, run the following:

```bash
# Run integration tests
npm test
```