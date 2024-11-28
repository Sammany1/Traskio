# Project Structure for Frontend

This document explains the structure of the frontend directory, including its purpose and organization.

## Directory Overview

### `frontend/`
The root directory for the frontend codebase. It contains the source code, configuration files, and static assets.

---

### `public/`
Contains static files that remain unchanged during the build process.
- **`favicon.ico`**: The website's favicon.
- **`logo.png`**: A logo image used in the app.
- **`index.html`**: The main HTML file that serves the React app.

---

### `src/`
The source directory where the app's code is organized.

#### **`pages/`**
Houses logic and components specific to individual pages in the app.
- **`Home/`**: Components for the Home page.
  - `index.jsx`: The main component for the Home page.
  - `Home.module.css`: Styles for the Home page.
  - `TaskSummary.jsx`: A task summary component.
- **`Project/`**: Components for the Project details page.
  - `index.jsx`: The main component for the Project page.
  - `Project.module.css`: Styles for the Project page.
  - `TaskList.jsx`: A component for listing tasks.
  - `useProjectData.js`: A custom hook for fetching project data.
- **`Login/`**: Components for the Login page.
  - `index.jsx`: The main component for the Login page.
  - `Login.module.css`: Styles for the Login page.
  - `LoginForm.jsx`: A reusable form component for logging in.

#### **`components/`**
Reusable components shared across the app.
- **`ui/`**: UI-specific reusable components.
  - `Button.jsx`, `Modal.jsx`, `ProgressBar.jsx`: Generic UI components.
- **`form/`**: Form-specific reusable components.
  - `Input.jsx`, `Checkbox.jsx`: Form input components.
- **`layout/`**: Layout components used for structuring pages.
  - `Header.jsx`, `Footer.jsx`, `Sidebar.jsx`: Common layout components.

#### **`hooks/`**
Custom React hooks for global functionality.
- `useAuth.js`: Handles authentication logic.
- `useFetch.js`: A wrapper for API requests.
- `useProgress.js`: Calculates progress bar values.

#### **`context/`**
React Context for managing global state.
- `AuthContext.js`: Context for authentication state.
- `ProjectContext.js`: Context for project-related data.
- `TaskContext.js`: Context for task-related data.

#### **`assets/`**
Non-code assets like images, fonts, and styles.
- **`images/`**: Stores logo and icon images.
- **`fonts/`**: Custom fonts for the app.
- **`styles/`**: Global styling files.
  - `variables.css`: CSS variables for theming.
  - `globals.css`: General global styles.
  - `reset.css`: CSS reset for consistent styling across browsers.

#### **`utils/`**
Utility functions for common tasks.
- `helpers.js`: General helper functions.
- `formatters.js`: Functions for formatting dates and numbers.
- `validators.js`: Logic for validating input fields.

#### **`data/`**
Static data and configuration files.
- `themes.json`: Theme settings for the app.
- `constants.js`: Global constants like API URLs.

#### Other Files in `src/`
- **`index.jsx`**: The entry point for the React app.
- **`App.jsx`**: The main app component.
- **`reportWebVitals.js`**: Used for performance monitoring (optional).

---

### Root Files
- **`.gitignore`**: Specifies files and directories to exclude from Git tracking.
- **`package.json`**: Defines dependencies and scripts for the project.
- **`package-lock.json`**: Lock file for npm dependencies.
- **`README.md`**: Documentation for the project.

---

This structure promotes modularity, reusability, and maintainability, making it easier to scale and manage the application.
