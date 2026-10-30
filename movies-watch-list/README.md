# Movies Watch List (React)

## Run it
1. Install Node.js (LTS) if you don't already have it.
2. Extract this folder.
3. Open the folder in VS Code.
4. Open a terminal in the project folder and run:
   npm install
   npm run dev
5. Open the local URL Vite prints in the terminal.

## Features
- Add movies with a review and 1–5 star rating.
- Remove movies from the list.
- Edit reviews and ratings after adding.
- Shows star emojis and movie count / average rating.

## React concepts used
- Components: `App` and `MovieCard`
- Props: `movie`, `onRemove`, `onUpdate`
- State: `useState`
- Event handlers: `onClick`, `onChange`, `onSubmit`
- List rendering: `movies.map(...)`
- Conditional rendering: empty state versus movie cards
