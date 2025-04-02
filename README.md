# ToDo List App – Frontend

This is the frontend for the ToDo List application – a modern interface for managing tasks with drag-and-drop functionality, dark mode, multilingual support, and automatic hiding of completed tasks after 24 hours.

## Features

- Drag and drop task reordering
- Light and dark theme toggling
- Multilingual support (English/Polish) with auto-detection
- Task creation, editing, completion, and auto-hiding after 24 hours
- Responsive UI for all screen sizes
- Debug mode for internal state inspection

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- @dnd-kit for drag-and-drop interactions
- react-i18next for localization
- Axios for API communication
- Context API for global state management

## Project Structure

```
src/
├── api/            // API service definitions
├── components/     // Reusable UI components
├── locales/        // Language translation files
├── pages/          // Application pages
├── services/       // Business logic and state handling
├── i18n.ts         // Localization configuration
├── App.tsx         // Root component
├── index.tsx       // Entry point
└── debug.ts        // Debug utilities
```

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Run the application:
   ```
   npm run start
   ```

## Usage

- Add tasks using the "+" button.
- Mark a task as completed with the checkmark icon; it will disappear after 24 hours.
- Reorder tasks via drag-and-drop.
- Switch themes and languages using the navigation bar.
- View completed tasks under the "Completed" tab.
