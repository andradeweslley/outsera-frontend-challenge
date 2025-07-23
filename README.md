# Outsera Frontend Challenge

This is a React application (using TypeScript and Material UI) for the Outsera frontend challenge. It displays data about the Golden Raspberry Awards, including dashboards and a paginated/filterable movie list.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (recommended) or npm

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd outsera-frontend-challenge
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   # or, if you prefer npm:
   npm install
   ```

3. **Start the development server:**

   ```bash
   yarn start
   # or
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `yarn start` — Runs the app in development mode.
- `yarn build` — Builds the app for production to the `build` folder.
- `yarn test` — Runs all tests using Jest.
- `yarn test:watch` — Runs tests in watch mode.

## Testing

To run the test suite:

```bash
yarn test
# or
npm test
```

To run tests in watch mode:

```bash
yarn test:watch
# or
npm run test:watch
```

## Build

To create a production build:

```bash
yarn build
# or
npm run build
```

The optimized build will be in the `build/` directory.

## Notes

- This project uses [Material UI](https://mui.com/) for UI components.
- All API requests are made to the public Outsera challenge API.
- No additional configuration or environment variables are needed to run or build the project.
