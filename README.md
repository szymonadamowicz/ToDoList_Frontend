# 📝 ToDo List App – Frontend

Nowoczesna aplikacja do zarządzania zadaniami (ToDo List) z interaktywnym przeciąganiem zadań, trybem ciemnym, lokalizacją wielojęzyczną oraz automatycznym ukrywaniem zakończonych zadań po 24 godzinach.

## Features

- 🪄 **Drag & Drop** – dynamic reordering of tasks via drag-and-drop
- 🌗 **Dark mode** – toggle between light and dark themes
- 🌍 **i18n** – multilingual support (PL/EN) with auto-detection and toggle
- 📆 **Task management** – create, edit, complete tasks; completed tasks are hidden after 24 hours
- 🧩 **Responsive UI** – optimized for all screen sizes
- 🔧 **Debug mode** – internal logging for state inspection

## Tech Stack

- ⚛️ **React** + **TypeScript**
- 🎨 **Tailwind CSS** – styling and layout
- 📦 **@dnd-kit** – drag-and-drop engine
- 🌐 **react-i18next** – internationalization
- 🕶️ **Dark Mode Toggle** – custom light/dark switching
- 🔧 **Axios** – API communication
- 🧠 **Context API** – global state management

## Project Structure

src/
├── api/                # Backend communication
├── components/         # UI components (Task, Navbar, Modal, etc.)
├── locales/            # Translation files
├── pages/              # Views (MainPage, CompletedTasks)
├── services/           # Logic and model mapping
├── i18n.ts             # i18n configuration
├── App.tsx             # Main app logic
├── index.tsx           # Entry point
└── debug.ts            # Debugging tools

## Installation

```bash
npm install
npm run start
```

## Usage

1. Add new tasks via the "+" button.
2. Click the green checkmark to complete a task. It will fade out and disappear after 24 hours.
3. Drag and drop tasks to reorder them. Changes are synced with the backend.
4. Switch themes or language via the top navigation bar.
5. View completed tasks on the "Completed" tab.

## Author
Szymon Admowicz
Created as part of a personal portfolio. Backend available separately.
