# PyLearn - Adaptive Python Learning Platform

A React-based web application for learning Python through structured modules, interactive coding tasks, and adaptive feedback.

## Features

- **User Authentication**: Login/Register with mock authentication
- **Learning Modules**: Structured Python curriculum with progress tracking
- **Interactive Tasks**: Code editor with real-time feedback and hints
- **Dashboard**: Progress tracking and submission history
- **Dark Theme**: Consistent dark UI with custom CSS variables

## Tech Stack

- React 18 with Hooks
- React Router DOM for routing
- Monaco Editor for code editing
- Custom CSS with CSS Variables
- Mock data for demonstration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── mock/          # Mock data files
├── context/       # React Context for auth
├── pages/         # Page components
├── components/    # Reusable UI components
├── styles/        # Global styles
└── main.jsx       # App entry point
```

## Mock Data

All data is stored in `src/mock/` and includes:
- User profiles
- Learning modules and lessons
- Coding tasks with hints
- Submission history

## Authentication

Uses mock authentication - any email/password combination works for login/register.
