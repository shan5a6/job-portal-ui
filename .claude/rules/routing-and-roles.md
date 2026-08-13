# Routing and Roles

## Route Guard

All protected routes use the `ProtectedRoute` component (`src/components/ProtectedRoute.jsx`).

```jsx
<ProtectedRoute allowedRoles={['ROLE_EMPLOYER']}>
  <PostJob />
</ProtectedRoute>
```

Behavior:
- If `isLoading` — renders a full-screen spinner
- If not authenticated — redirects to `/login` with `state.from` set for post-login redirect
- If authenticated but wrong role — redirects to `/` (home)
- If authenticated and role matches — renders `children`

## Roles

Three roles exist in the system. The role string is stored on `user.role`.

### `ROLE_JOB_SEEKER`

Registered via the Register page (`/register`). All self-registered users get this role by default.

Protected routes:
- `/profile` — view and edit profile
- `/applied-jobs` — list of submitted applications
- `/saved-jobs` — list of bookmarked jobs

Capabilities (via `JobContext`):
- `applyForJob(job, coverLetter)` — requires `user.profileComplete === true`
- `saveJob(job)` / `unsaveJob(jobId)`
- `withdrawApplication(jobId)`

### `ROLE_EMPLOYER`

Hardcoded dummy accounts only (see `DUMMY_USERS` in `AuthContext`). No self-registration path.

Protected routes:
- `/post-job` — create a new job listing
- `/employer/jobs` — manage posted jobs (edit/delete)
- `/job-applicants/:jobId` — view applicants for a specific job

Capabilities (via `JobContext`):
- `postJob(jobData)` — writes to `postedJobs_{userId}` and `globalPostedJobs`
- `updateJob(jobId, updates)`
- `deleteJob(jobId)` — removes from both personal and global storage
- `updateApplicationStatus(applicationId, status)`

### `ROLE_ADMIN`

Single hardcoded account: `admin@portal.com` / `admin123`.

Protected routes (all under `/admin`):
- `/admin` — dashboard with stats
- `/admin/companies` — manage companies
- `/admin/employers` — manage employer accounts
- `/admin/contact-messages` — view submitted contact forms

## Public Routes

These routes are accessible to all users regardless of authentication:

| Route | Component |
|---|---|
| `/` | `Home` |
| `/jobs` | `Jobs` |
| `/jobs/:id` | `JobDetail` |
| `/companies` | `Companies` |
| `/companies/:id` | `CompanyDetail` |
| `/login` | `Login` |
| `/register` | `Register` |
| `/contact` | `Contact` |
| `/cookie-policy` | `CookiePolicy` |

## Auth Helpers

`AuthContext` exposes these boolean shortcuts — use these instead of checking `user.role` directly:

```js
const { isAuthenticated, isJobSeeker, isEmployer, isAdmin } = useAuth();
```

## Adding a New Protected Route

1. Create the page in `src/pages/`
2. Import in `App.jsx`
3. Add inside `<Route path="/" element={<Layout />}>`:
```jsx
<Route
  path="your-path"
  element={
    <ProtectedRoute allowedRoles={['ROLE_X']}>
      <YourPage />
    </ProtectedRoute>
  }
/>
```
4. Add the nav link to `Navbar.jsx` behind the appropriate role check
