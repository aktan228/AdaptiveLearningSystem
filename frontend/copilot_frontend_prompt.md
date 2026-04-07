# PROMPT FOR GITHUB COPILOT — ADAPTIVE PYTHON LEARNING PLATFORM (FRONTEND)

---

## PROJECT OVERVIEW

Build a **complete React frontend** for an Adaptive Python Learning Platform — a web-based
educational tool where students learn Python through structured modules, submit code solutions,
receive AST-based feedback, get progressive hints, and track their progress on a dashboard.

**NO backend connection needed yet. Use mock data only.**
All data must be defined as JavaScript constants inside a `src/mock/` folder.

---

## TECH STACK

- React 18 (with hooks: useState, useEffect, useContext, useNavigate)
- React Router DOM v6 (client-side routing)
- Monaco Editor (`@monaco-editor/react`) — for the code editor page
- Axios (install but mock all calls for now — no real API)
- CSS Modules OR styled plain CSS files per component
- istall tailwind (use for styling)
- NO Bootstrap, NO Material UI
- Font: Import from Google Fonts — use **"Fira Code"** for code blocks,
  **"Space Grotesk"** for headings, **"Inter"** for body text

---

## DESIGN SYSTEM

Define these CSS variables in `src/styles/global.css` and apply consistently everywhere:

```css
:root {
  --bg-primary:     #0d1117;   /* dark navy — main background */
  --bg-secondary:   #161b22;   /* slightly lighter — cards, panels */
  --bg-tertiary:    #21262d;   /* borders, inputs, hover states */
  --accent-blue:    #58a6ff;   /* primary CTA, links, active states */
  --accent-green:   #3fb950;   /* success, correct answers, completed */
  --accent-orange:  #f0883e;   /* warnings, hints, medium difficulty */
  --accent-red:     #f85149;   /* errors, failures, hard difficulty */
  --accent-purple:  #bc8cff;   /* adaptive engine indicators */
  --text-primary:   #e6edf3;   /* main text */
  --text-secondary: #8b949e;   /* subtitles, placeholders */
  --text-muted:     #484f58;   /* disabled, very subtle */
  --border-color:   #30363d;   /* card borders */
  --radius-sm:      6px;
  --radius-md:      12px;
  --radius-lg:      20px;
  --shadow-card:    0 4px 24px rgba(0,0,0,0.4);
  --font-heading:   'Space Grotesk', sans-serif;
  --font-body:      'Inter', sans-serif;
  --font-code:      'Fira Code', monospace;
}
```

Global rules:
- Dark theme throughout, no light mode
- Smooth transitions on all interactive elements: `transition: all 0.2s ease`
- Scrollbars: styled thin and dark (`::-webkit-scrollbar`)
- `box-sizing: border-box` on everything

---

## FOLDER STRUCTURE

Create exactly this structure:

```
src/
├── mock/
│   ├── user.js
│   ├── modules.js
│   ├── lessons.js
│   ├── tasks.js
│   ├── hints.js
│   └── submissions.js
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── ModulesPage.jsx
│   ├── LessonPage.jsx
│   ├── TaskPage.jsx
│   └── DashboardPage.jsx
├── components/
│   ├── Navbar.jsx
│   ├── ModuleCard.jsx
│   ├── LessonCard.jsx
│   ├── CodeEditor.jsx
│   ├── HintPanel.jsx
│   ├── FeedbackPanel.jsx
│   ├── DifficultyBadge.jsx
│   ├── ProgressBar.jsx
│   ├── StatCard.jsx
│   └── ProtectedRoute.jsx
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

---

## MOCK DATA — src/mock/

### src/mock/user.js
```js
export const mockUser = {
  id: 1,
  username: "aktan_dev",
  email: "aktan@example.com",
  role: "student",
  avatar_url: null,
  bio: "Learning Python step by step.",
  total_tasks_completed: 7,
  current_streak: 3,
  last_active: "2025-04-01T10:00:00Z",
  threshold_easy: 0.4,
  threshold_hard: 0.8,
};
```

### src/mock/modules.js
```js
export const mockModules = [
  { id: 1, title: "Variables & Data Types",   description: "Learn about int, float, str, bool and how to store data.", order: 1, lessonsCount: 3, completedLessons: 3 },
  { id: 2, title: "Control Structures",        description: "Master if/elif/else statements and boolean logic.", order: 2, lessonsCount: 3, completedLessons: 2 },
  { id: 3, title: "Loops",                     description: "Use for and while loops to repeat actions.", order: 3, lessonsCount: 3, completedLessons: 1 },
  { id: 4, title: "Functions",                 description: "Define reusable functions with parameters and return values.", order: 4, lessonsCount: 4, completedLessons: 0 },
  { id: 5, title: "Lists & Dictionaries",      description: "Work with collections of data using lists and dicts.", order: 5, lessonsCount: 4, completedLessons: 0 },
  { id: 6, title: "Recursion",                 description: "Solve problems by calling functions within themselves.", order: 6, lessonsCount: 3, completedLessons: 0 },
];
```

### src/mock/lessons.js
```js
export const mockLessons = [
  { id: 1, module_id: 1, title: "What are Variables?", order: 1, is_completed: true },
  { id: 2, module_id: 1, title: "Data Types in Python", order: 2, is_completed: true },
  { id: 3, module_id: 1, title: "Type Casting", order: 3, is_completed: true },
  { id: 4, module_id: 2, title: "If Statements", order: 1, is_completed: true },
  { id: 5, module_id: 2, title: "Elif and Else", order: 2, is_completed: true },
  { id: 6, module_id: 2, title: "Nested Conditions", order: 3, is_completed: false },
  { id: 7, module_id: 3, title: "For Loops", order: 1, is_completed: true },
  { id: 8, module_id: 3, title: "While Loops", order: 2, is_completed: false },
  { id: 9, module_id: 3, title: "Loop Control: break & continue", order: 3, is_completed: false },
];

export const mockLessonContent = {
  7: {
    id: 7,
    title: "For Loops",
    content_html: `
      <h2>Introduction to For Loops</h2>
      <p>A <strong>for loop</strong> in Python is used to iterate over a sequence
      (like a list, tuple, or string) and execute a block of code for each item.</p>
      <h3>Basic Syntax</h3>
      <pre><code>for item in sequence:
    # code to execute</code></pre>
      <h3>Example</h3>
      <pre><code>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)</code></pre>
      <p>This will print each fruit on a new line.</p>
      <h3>Using range()</h3>
      <pre><code>for i in range(5):
    print(i)  # prints 0, 1, 2, 3, 4</code></pre>
      <p>The <code>range()</code> function generates a sequence of numbers.</p>
    `,
    task_id: 1,
  }
};
```

### src/mock/tasks.js
```js
export const mockTasks = [
  {
    id: 1,
    lesson_id: 7,
    title: "Sum of Numbers Using Loop",
    description: `Write a Python function called \`sum_numbers(n)\` that takes an integer \`n\` 
and returns the sum of all numbers from 1 to n using a **for loop**.

**Requirements:**
- You MUST use a for loop (not recursion or built-in sum())
- The function must be named exactly \`sum_numbers\`
- Return the integer result

**Examples:**
- \`sum_numbers(5)\` → 15  (1+2+3+4+5)
- \`sum_numbers(10)\` → 55
- \`sum_numbers(1)\` → 1`,
    difficulty_level: "easy",
    time_limit: 300,
    tags: ["loops", "for-loop", "arithmetic"],
    starter_code: `def sum_numbers(n):
    # Write your solution here
    pass`,
  },
  {
    id: 2,
    lesson_id: 7,
    title: "Count Even Numbers",
    description: `Write a function \`count_evens(numbers)\` that takes a list of integers
and returns the count of even numbers using a **for loop**.

**Requirements:**
- Use a for loop
- Do NOT use list comprehensions or filter()

**Examples:**
- \`count_evens([1, 2, 3, 4, 6])\` → 3
- \`count_evens([1, 3, 5])\` → 0`,
    difficulty_level: "medium",
    time_limit: 300,
    tags: ["loops", "conditionals", "lists"],
    starter_code: `def count_evens(numbers):
    # Write your solution here
    pass`,
  },
];
```

### src/mock/hints.js
```js
export const mockHints = {
  1: [
    { level: 1, content: "Think about how to initialize a variable to store the running total before the loop starts." },
    { level: 2, content: "Use range(1, n+1) to generate numbers from 1 to n. Add each number to your total variable inside the loop." },
    { level: 3, content: `Here is the pseudocode structure:
total = 0
for i in range(1, n+1):
    total = total + i
return total` },
  ],
  2: [
    { level: 1, content: "You need a counter variable that increases every time you find an even number." },
    { level: 2, content: "Use the modulo operator (%) to check if a number is even: if num % 2 == 0, it is even." },
    { level: 3, content: `Pseudocode:
count = 0
for num in numbers:
    if num % 2 == 0:
        count = count + 1
return count` },
  ],
};
```

### src/mock/submissions.js
```js
export const mockSubmissions = [
  { id: 1, task_id: 1, task_title: "Sum of Numbers Using Loop", submitted_at: "2025-03-30T10:15:00Z", test_result: true,  ast_result: true,  hints_used: 0, time_spent: 180, difficulty_at_submission: "easy",   feedback_text: "All test cases passed. For loop detected correctly." },
  { id: 2, task_id: 2, task_title: "Count Even Numbers",        submitted_at: "2025-03-31T14:22:00Z", test_result: false, ast_result: true,  hints_used: 1, time_spent: 240, difficulty_at_submission: "medium", feedback_text: "Test case 2 failed. Check your loop logic for empty lists." },
  { id: 3, task_id: 2, task_title: "Count Even Numbers",        submitted_at: "2025-03-31T14:35:00Z", test_result: true,  ast_result: false, hints_used: 1, time_spent: 80,  difficulty_at_submission: "medium", feedback_text: "Output correct, but required construct 'for_loop' not found. Did you use a for loop?" },
  { id: 4, task_id: 1, task_title: "Sum of Numbers Using Loop", submitted_at: "2025-04-01T09:00:00Z", test_result: true,  ast_result: true,  hints_used: 2, time_spent: 310, difficulty_at_submission: "easy",   feedback_text: "All test cases passed. Well done!" },
];
```

---

## AUTH CONTEXT — src/context/AuthContext.jsx

```jsx
import { createContext, useContext, useState } from "react";
import { mockUser } from "../mock/user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = logged out, mockUser object = logged in
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock: accept any non-empty credentials
    if (email && password) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const register = (username, email, password) => {
    if (username && email && password) {
      setUser({ ...mockUser, username, email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

## ROUTING — src/App.jsx

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ModulesPage from "./pages/ModulesPage";
import LessonPage from "./pages/LessonPage";
import TaskPage from "./pages/TaskPage";
import DashboardPage from "./pages/DashboardPage";
import "./styles/global.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<><Navbar /><main style={{paddingTop:"80px"}}>{/* outlet */}</main></>}>
              <Route path="/"           element={<Navigate to="/modules" />} />
              <Route path="/modules"    element={<ModulesPage />} />
              <Route path="/lesson/:id" element={<LessonPage />} />
              <Route path="/task/:id"   element={<TaskPage />} />
              <Route path="/dashboard"  element={<DashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

---

## PAGES — DETAILED REQUIREMENTS

### LoginPage.jsx
- Centered card on dark background with subtle grid/dot pattern background
- Fields: Email, Password
- "Login" button — full width, accent-blue background
- Link to RegisterPage
- On submit: call `auth.login()`, on success → navigate to `/modules`
- Show inline error if login fails: "Invalid credentials"
- Add subtle fade-in animation on card load

### RegisterPage.jsx
- Same style as LoginPage
- Fields: Username, Email, Password, Confirm Password
- Validate: passwords match, all fields filled
- On success → navigate to `/modules`

### ModulesPage.jsx
- Page title: "Learning Modules" with subtitle
- Show a grid of ModuleCard components (2 columns on desktop, 1 on mobile)
- Each card shows: module title, description, progress bar
  (`completedLessons / lessonsCount`), "Continue" or "Start" button
- A module is locked if all previous modules have 0 completedLessons
  (show lock icon on locked cards, disable button)
- Completed modules show a green checkmark badge

### LessonPage.jsx
- Use `useParams()` to get lesson id
- Show lesson title and module breadcrumb: "Modules > Module Title > Lesson Title"
- Render `content_html` safely using `dangerouslySetInnerHTML`
- Style the rendered HTML: `h2` gets accent-blue color, `pre code` gets dark
  background with Fira Code font, `p` gets comfortable line-height
- "Start Task" button at the bottom → navigate to `/task/:task_id`
- Show "Mark as Complete" button (just toggles state visually for now)

### TaskPage.jsx ← MOST IMPORTANT PAGE
This is the core page. Layout: **two-column split**

**LEFT PANEL (40% width) — Problem Description**
- Task title with DifficultyBadge component
- Tags displayed as small pill badges (accent-blue outline)
- Full task description rendered as markdown-style text (handle `**bold**`
  and backtick `` `code` `` inline, newlines as `<br>`)
- Hint section below description:
  - "Get Hint" button (accent-orange color)
  - Hints reveal one at a time (Level 1 → Level 2 → Level 3)
  - Each revealed hint shows as a numbered card
  - After all 3 hints shown, button becomes disabled: "No more hints"
  - Track `hintsUsed` count in state

**RIGHT PANEL (60% width) — Code Editor + Output**
- Monaco Editor component (full height of panel, min 400px)
  - Language: "python"
  - Theme: "vs-dark"
  - Font size: 14
  - Default value: task's `starter_code`
  - Options: minimap disabled, font family "Fira Code"
- Two buttons below editor: "Run Code" and "Submit"
- FeedbackPanel component shows below buttons after submission:
  - Shows test result (pass/fail with green/red colors)
  - Shows AST result (pass/fail)
  - Shows feedback_text message
  - Animated slide-in from bottom

**Mock submission logic (no real API):**
```js
const handleSubmit = () => {
  setIsLoading(true);
  setTimeout(() => {
    // Simulate evaluation result
    const passed = code.includes("for") && code.includes("return");
    setFeedback({
      test_result: passed,
      ast_result: code.includes("for"),
      feedback_text: passed
        ? "✓ All test cases passed. For loop detected correctly."
        : "✗ Test case failed or required construct missing.",
    });
    setIsLoading(false);
  }, 1500);  // simulate network delay
};
```

- After successful submission (both true): show green success banner
  "Task completed! 🎉" and show "Next Task" button
- Show a timer (counting up from 0:00 in MM:SS format) using `useEffect` + `setInterval`
- Show current difficulty badge in top-right corner of the page

### DashboardPage.jsx
- Page title: "My Progress"
- Top row: 4 StatCard components showing:
  1. Total Tasks Completed: `mockUser.total_tasks_completed`
  2. Current Streak: `mockUser.current_streak` days 🔥
  3. Success Rate: calculate from mockSubmissions (test_result && ast_result)
  4. Modules Completed: calculate from mockModules
- Module completion section: show ProgressBar for each module
- Submission History table:
  - Columns: Task | Date | Test Result | AST Result | Hints Used | Difficulty
  - Color code: green row if both results true, red if both false, orange if mixed
  - Format date nicely: "Mar 30, 2025 10:15"
  - Show emoji status: ✅ for true, ❌ for false

---

## COMPONENTS — DETAILED REQUIREMENTS

### Navbar.jsx
- Fixed top, full width, height 64px
- Left: logo — Python snake emoji 🐍 + "PyLearn" text in accent-blue
- Center: nav links — "Modules", "Dashboard" (highlight active with accent-blue underline)
- Right: user avatar circle (first letter of username) + username + "Logout" button
- Thin bottom border: `var(--border-color)`
- Backdrop blur effect: `backdrop-filter: blur(10px)`

### ModuleCard.jsx
Props: `{ module, isLocked, onClick }`
- Card with border, rounded corners, hover: lift shadow + border turns accent-blue
- Progress bar showing percentage complete
- Lock icon overlay if `isLocked`
- Green checkmark if 100% complete

### DifficultyBadge.jsx
Props: `{ level }` — "easy" | "medium" | "hard"
- Small pill badge
- easy → accent-green background
- medium → accent-orange background
- hard → accent-red background

### ProgressBar.jsx
Props: `{ value, max, label }`
- Show label and percentage text
- Animated fill on mount using CSS transition
- Color changes: green if 100%, blue if >50%, orange if >0%, gray if 0%

### StatCard.jsx
Props: `{ icon, label, value, color }`
- Dark card with icon, big number, label below
- Hover: subtle glow effect using `box-shadow` with the color prop

### HintPanel.jsx
Props: `{ hints, taskId }`
- Manages which hints are revealed
- Each hint card: numbered badge (L1/L2/L3) + hint text
- Level 1: accent-blue tint, Level 2: accent-orange tint, Level 3: accent-red tint
- Smooth reveal animation (fade + slide down)

### FeedbackPanel.jsx
Props: `{ feedback }` where feedback = `{ test_result, ast_result, feedback_text }`
- Two result rows: "Test Cases" and "AST Analysis"
- Each row: colored icon (✅/❌) + label + PASS/FAIL badge
- `feedback_text` displayed below in a text box
- Slide-in animation from bottom on mount

### CodeEditor.jsx
Props: `{ value, onChange, language, height }`
- Wraps `@monaco-editor/react`
- Shows loading spinner while Monaco loads
- Default props: language="python", theme="vs-dark", height="450px"

### ProtectedRoute.jsx
- If `user` is null → redirect to `/login`
- Otherwise render `<Outlet />`

---

## ANIMATIONS

Add these CSS keyframes in global.css:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.fade-in    { animation: fadeIn    0.3s ease forwards; }
.slide-in   { animation: slideInUp 0.4s ease forwards; }
.pulse      { animation: pulse     1.5s ease infinite; }
```

Apply `fade-in` class to page wrappers, `slide-in` to FeedbackPanel.

---

## INSTALL COMMANDS

Run in the project root:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install react-router-dom
npm install @monaco-editor/react
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install axios
```

---

## FINAL CHECKLIST FOR COPILOT

- [ ] All 6 pages created and routed correctly
- [ ] All 9 components created with correct props
- [ ] All 6 mock data files created with the exact data above
- [ ] AuthContext working (login/logout/register with mock)
- [ ] ProtectedRoute redirects to /login if not authenticated
- [ ] Monaco Editor renders on TaskPage with starter_code as default value
- [ ] Hint system: reveals one hint at a time, tracks count
- [ ] Mock submit: 1.5s delay, evaluates if code has "for" and "return"
- [ ] Timer counting up on TaskPage
- [ ] Dashboard shows real calculations from mock data
- [ ] All colors from CSS variables only — no hardcoded hex in components
- [ ] Dark theme consistent on all pages
- [ ] Responsive: works on 1024px+ screens minimum

