# Frontend Project Structure

```plaintext
frontend/
├── public/                     # Static assets (unchanged)
│   ├── favicon.ico             # Website favicon
│   ├── logo.png                # App logo
│   └── index.html              # Main HTML file for the app
├── src/                        # Source code
│   ├── pages/                  # Page-specific logic and components
│   │   ├── Home/               # Home page (e.g., dashboard or landing)
│   │   │   ├── index.jsx       # Root component for the Home page
│   │   │   ├── Home.module.css # Styles for the Home page
│   │   │   └── TaskSummary.jsx # Component specific to the Home page
│   │   ├── Project/            # Project details page
│   │   │   ├── index.jsx       # Root component for the Project page
│   │   │   ├── Project.module.css # Styles for the Project page
│   │   │   ├── TaskList.jsx    # Component to list tasks
│   │   │   └── useProjectData.js # Custom hook for project data
│   │   └── Login/              # Login page
│   │       ├── index.jsx       # Root component for the Login page
│   │       ├── Login.module.css # Styles for the Login page
│   │       └── LoginForm.jsx   # Form component for login
│   ├── components/             # Shared/reusable components
│   │   ├── ui/                 # UI components
│   │   │   ├── Button.jsx      # Button component
│   │   │   ├── Modal.jsx       # Modal component
│   │   │   └── ProgressBar.jsx # Progress bar component
│   │   ├── form/               # Form-specific components
│   │   │   ├── Input.jsx       # Input field component
│   │   │   └── Checkbox.jsx    # Checkbox component
│   │   └── layout/             # Layout components
│   │       ├── Header.jsx      # Header component
│   │       ├── Footer.jsx      # Footer component
│   │       └── Sidebar.jsx     # Sidebar component
│   ├── hooks/                  # Global custom hooks
│   │   ├── useAuth.js          # Authentication logic
│   │   ├── useFetch.js         # API fetch wrapper
│   │   └── useProgress.js      # Progress bar calculation
│   ├── context/                # React context for global state
│   │   ├── AuthContext.js      # Authentication context
│   │   ├── ProjectContext.js   # Project-related context
│   │   └── TaskContext.js      # Task-related context
│   ├── assets/                 # Non-code assets
│   │   ├── images/             # Images (e.g., logos, icons)
│   │   ├── fonts/              # Custom fonts
│   │   └── styles/             # Global styles
│   │       ├── variables.css   # CSS variables for theming
│   │       ├── globals.css     # Global styles
│   │       └── reset.css       # CSS reset
│   ├── utils/                  # Utility functions
│   │   ├── helpers.js          # General helper functions
│   │   ├── formatters.js       # Date/number formatting
│   │   └── validators.js       # Input validation logic
│   ├── data/                   # Static data or constants
│   │   ├── themes.json         # Theme configuration
│   │   └── constants.js        # Global constants (e.g., API URLs)
│   ├── index.jsx               # Entry point for the React app
│   ├── App.jsx                 # Main App component
│   └── reportWebVitals.js      # Performance monitoring (optional)
├── .gitignore                  # Files/directories to ignore in Git
├── package.json                # Dependencies and scripts
├── package-lock.json           # Lock file for npm
└── README.md                   # Project documentation
