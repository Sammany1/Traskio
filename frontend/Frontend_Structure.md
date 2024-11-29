# Project Directory Structure

## Frontend

```plaintext
frontend/
├── public/                     # Static assets (unchanged)
│   ├── favicon.ico
│   ├── logo.png                # Add logo if not present
│   └── index.html              # Optional, depending on the framework setup
├── src/
│   ├── app/                    # Retain for Next.js compatibility
│   │   ├── fonts/              # Custom fonts
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Layout component (Next.js specific)
│   │   ├── page.module.css     # Global page styles
│   │   ├── page.tsx            # Root page (index)
│   ├── pages/                  # Page-specific components
│   │   ├── Home/
│   │   │   ├── index.jsx       # Home page root component
│   │   │   ├── Home.module.css # Home page styles
│   │   │   └── TaskSummary.jsx # Home-specific subcomponent
│   │   ├── Project/
│   │   │   ├── index.jsx       # Project details root component
│   │   │   ├── Project.module.css # Styles for Project page
│   │   │   ├── TaskList.jsx    # Task list for a project
│   │   │   └── useProjectData.js # Custom hook for project data fetching
│   │   └── Login/
│   │       ├── index.jsx       # Login page root component
│   │       ├── Login.module.css # Login page styles
│   │       └── LoginForm.jsx   # Login form subcomponent
│   ├── components/             # Shared/reusable components
│   │   ├── ui/
│   │   │   ├── Button.jsx      # Button component
│   │   │   ├── Modal.jsx       # Modal component
│   │   │   └── ProgressBar.jsx # Progress bar component
│   │   ├── form/
│   │   │   ├── Input.jsx       # Input field component
│   │   │   └── Checkbox.jsx    # Checkbox component
│   │   └── layout/
│   │       ├── Header.jsx      # Header component
│   │       ├── Footer.jsx      # Footer component
│   │       └── Sidebar.jsx     # Sidebar component
│   ├── hooks/                  # Global custom hooks
│   │   ├── useAuth.js          # Authentication logic
│   │   ├── useFetch.js         # Fetch API wrapper
│   │   └── useProgress.js      # Progress bar calculation
│   ├── context/                # React context for global state
│   │   ├── AuthContext.js      # Authentication context
│   │   ├── ProjectContext.js   # Project-related context
│   │   └── TaskContext.js      # Task-related context
│   ├── assets/                 # Non-code assets
│   │   ├── images/             # Logos, icons, etc.
│   │   ├── fonts/              # Custom fonts
│   │   └── styles/
│   │       ├── variables.css   # CSS variables for theming
│   │       ├── globals.css     # Global styles
│   │       └── reset.css       # CSS reset
│   ├── utils/                  # Utility functions
│   │   ├── helpers.js          # General helper functions
│   │   ├── formatters.js       # Formatting logic
│   │   └── validators.js       # Input validation logic
│   ├── data/                   # Static data or constants
│   │   ├── themes.json         # Theme configuration
│   │   └── constants.js        # Global constants (e.g., API URLs)
│   ├── index.jsx               # App entry point
│   ├── App.jsx                 # Main App component
│   └── reportWebVitals.js      # Performance monitoring (optional)
├── .eslintrc.json              # ESLint configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── package-lock.json           # Lock file for npm
└── README.md                   # Project documentation
