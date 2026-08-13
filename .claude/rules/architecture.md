# Architecture

React 19 SPA built with Vite 7, Tailwind CSS 4, and React Router 7. No TypeScript — plain JSX throughout.

## Tech Stack

- **React 19** — functional components, hooks only
- **Vite 7** — dev server and build tool
- **Tailwind CSS 4** — utility-first styling, no CSS modules or inline styles
- **React Router 7** — client-side routing via `BrowserRouter`
- **react-toastify** — toast notifications
- **Font Awesome + Lucide React** — icons

## Provider Tree (App.jsx)

Providers must remain in this exact nesting order:

```
AuthProvider
  └── JobsDataProvider
        └── JobProvider
              └── CompaniesProvider
                    └── ThemeProvider
                          └── Router
```

`JobProvider` depends on `useAuth` (from `AuthProvider`) and `useJobsData` (from `JobsDataProvider`), so those two must wrap it.

## Context Layers

Two directories, two distinct purposes:

| Directory | Contexts | Purpose |
|---|---|---|
| `src/context/` | `AuthContext`, `JobContext`, `ThemeContext` | Core app state — auth, job actions, theme |
| `src/contexts/` | `JobsDataContext`, `CompaniesContext` | Data-fetching with caching |

Do not merge these directories. The split is intentional.

### AuthContext (`src/context/AuthContext.jsx`)

Manages login, logout, registration, and user profile state. Persists `jobPortalUser` and `authToken` to localStorage. Exposes convenience booleans: `isAuthenticated`, `isEmployer`, `isJobSeeker`, `isAdmin`.

Dummy credentials hardcoded in `DUMMY_USERS` for testing:
- Employer: `employer@company.com` / `employer123`
- Job Seeker: `jobseeker@email.com` / `jobseeker123`
- Admin: `admin@portal.com` / `admin123`

### JobContext (`src/context/JobContext.jsx`)

Handles all job-action side effects scoped to the current user: apply, save/unsave, withdraw, post, update, delete. Calls service functions for job-seeker actions; uses localStorage directly for employer-posted jobs.

### JobsDataContext (`src/contexts/JobsDataContext.jsx`)

Fetches and caches the global job list with a 5-minute TTL. Auto-refreshes on window focus and every 5 minutes when the tab is active. Exposes `forceRefresh()` for manual cache invalidation and `updateJobApplicationsCount()` to optimistically update counts after apply/withdraw.

### ThemeContext (`src/context/ThemeContext.jsx`)

Toggles `light`/`dark` class on `document.documentElement`. Persisted to `job-portal-theme` in localStorage. Use `useTheme()` to read `theme` and call `toggleTheme()`. Do not use Tailwind's `dark:` variants — apply classes conditionally based on `theme === 'dark'`.

## Component Structure

```
src/components/
  Layout.jsx            — Wraps all routes; renders Navbar + Footer + <Outlet>
  Navbar.jsx            — Top navigation; role-aware links
  Footer.jsx            — Footer with hover tooltips on legal links
  ProtectedRoute.jsx    — Role-based route guard
  ScrollToTop.jsx       — Resets scroll position on route change
  Hero.jsx              — Home page hero section
  JobsSection.jsx       — Featured jobs on home page
  CompaniesSection.jsx  — Featured companies on home page
  ConfirmationModal.jsx — Reusable confirm dialog
  RefreshButton.jsx     — Triggers forceRefresh on JobsDataContext
```

## Page Structure

```
src/pages/
  Home.jsx, Jobs.jsx, JobDetail.jsx
  Companies.jsx, CompanyDetail.jsx
  Login.jsx, Register.jsx
  AppliedJobs.jsx, SavedJobs.jsx  — ROLE_JOB_SEEKER only
  Profile.jsx                     — ROLE_JOB_SEEKER only
  PostJob.jsx, MyJobs.jsx         — ROLE_EMPLOYER only
  JobApplicants.jsx               — ROLE_EMPLOYER only
  Contact.jsx, CookiePolicy.jsx   — public
  admin/
    Dashboard.jsx, CompanyManagement.jsx
    EmployerManagement.jsx, ContactMessages.jsx
```

## Adding New Routes

1. Create the page component in `src/pages/`
2. Import it in `App.jsx`
3. Add a `<Route>` inside `<Route path="/" element={<Layout />}>`
4. Wrap in `<ProtectedRoute allowedRoles={[...]}>` if role-restricted
