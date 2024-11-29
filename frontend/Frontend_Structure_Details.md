# Project Directory Structure and Explanation

## Frontend Structure

### **public/**
This folder contains static assets that don’t change during the app’s lifecycle.
- **favicon.ico**: The small icon displayed in the browser tab.
- **logo.png**: The project’s logo. You can replace this if needed.
- **index.html**: The main HTML file that serves the app (framework-dependent).

---

### **src/**
This folder is the heart of our application where all the development happens.

#### **app/**
This folder is specifically for Next.js compatibility.
- **fonts/**: Stores custom font files used across the app.
- **globals.css**: Contains global CSS styles applied throughout the app.
- **layout.tsx**: The base layout component that defines the structure of the app (headers, footers, etc.).
- **page.module.css**: CSS styles specifically for the root page.
- **page.tsx**: The root component of the app (acts like the "homepage").

#### **pages/**
This folder organizes the app into different functional pages.
- **Home/**: 
  - **index.jsx**: The main component for the homepage.
  - **Home.module.css**: Styles specific to the homepage.
  - **TaskSummary.jsx**: A reusable subcomponent that summarizes tasks.
- **Project/**:
  - **index.jsx**: The main component displaying project details.
  - **Project.module.css**: Styles specific to the project page.
  - **TaskList.jsx**: A component to list tasks related to a specific project.
  - **useProjectData.js**: A custom hook to fetch data related to projects.
- **Login/**:
  - **index.jsx**: The main component for the login page.
  - **Login.module.css**: Styles specific to the login page.
  - **LoginForm.jsx**: A reusable form component for user login.

#### **components/**
This folder holds reusable UI and layout components used across the app.
- **ui/**:
  - **Button.jsx**: A customizable button component.
  - **Modal.jsx**: A reusable modal (popup) component.
  - **ProgressBar.jsx**: A component for displaying progress visually.
- **form/**:
  - **Input.jsx**: A styled input field component.
  - **Checkbox.jsx**: A styled checkbox component.
- **layout/**:
  - **Header.jsx**: The app's header component.
  - **Footer.jsx**: The app's footer component.
  - **Sidebar.jsx**: A sidebar navigation component.

#### **hooks/**
This folder contains custom hooks for shared logic.
- **useAuth.js**: Handles user authentication and permissions.
- **useFetch.js**: A wrapper for API calls, making them easier to use.
- **useProgress.js**: Calculates progress for tasks or projects.

#### **context/**
Stores React Contexts for managing global state.
- **AuthContext.js**: Manages user authentication state.
- **ProjectContext.js**: Shares project-related data across components.
- **TaskContext.js**: Shares task-related data across components.

#### **assets/**
Contains static assets such as images, fonts, and global styles.
- **images/**: Stores all image files (e.g., logos, icons).
- **fonts/**: Contains custom font files used in the app.
- **styles/**:
  - **variables.css**: Centralized CSS variables for consistent theming.
  - **globals.css**: Additional global CSS styles.
  - **reset.css**: A CSS reset to ensure consistent styling across browsers.

#### **utils/**
Utility functions used across the app to simplify common tasks.
- **helpers.js**: General helper functions (e.g., sorting, filtering).
- **formatters.js**: Functions for formatting dates, numbers, etc.
- **validators.js**: Functions for input validation.

#### **data/**
Contains static or constant data used throughout the app.
- **themes.json**: Configuration for app themes (e.g., dark/light mode).
- **constants.js**: Stores global constants such as API URLs or key values.

#### Other Important Files:
- **index.jsx**: The app’s entry point. It’s where the app starts running.
- **App.jsx**: The main component that wraps all other components.
- **reportWebVitals.js**: Used for monitoring app performance (optional).

---

### Root-Level Files
- **.eslintrc.json**: Configuration for ESLint, which ensures our code follows best practices.
- **tsconfig.json**: Configuration file for TypeScript (if used).
- **package.json**: Lists all project dependencies and scripts.
- **package-lock.json**: Ensures consistent dependency versions.
- **README.md**: Project documentation that helps new developers get started.
