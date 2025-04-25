# Movie Explorer

A responsive React-based web application for exploring movies using the OMDB API.
Built with modern web technologies and best practices.

## Features

- Search for movies using the OMDB API
- View detailed information about movies
- Mark movies as favorites (stored in localStorage)
- Responsive design that works on all devices
- Keyboard navigation support
- Clean and modern UI

## Tech Stack

- React 18
- React Router v6
- Webpack 5
- Babel 7
- TailwindCSS
- Jest + React Testing Library
- ESLint + Prettier + Husky
- LocalStorage for data persistence

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OMDB API key (get one at http://www.omdbapi.com/)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-explorer-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OMDB API key:
```
REACT_APP_OMDB_BASE_URL=your_base_url
REACT_APP_OMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Creates a production build
- `npm test` - Runs the test suite
- `npm run lint` - Runs ESLint
- `npm run format` - Formats code with Prettier

## Project Structure

```
movie-explorer-app/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── public/             # Static files
├── .eslintrc.json     # ESLint configuration
├── .prettierrc        # Prettier configuration
├── webpack.config.js  # Webpack configuration
└── package.json       # Project dependencies
```

## Testing

```bash
npm test
```

## Code Quality

- ESLint is configured with Airbnb's style guide
- Prettier ensures consistent code formatting
- Husky runs linting and formatting on pre-commit
