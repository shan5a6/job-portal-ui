# Data Layer

No real backend. All data originates from `src/data/mockData.js` and is persisted via localStorage. Services in `src/services/` simulate async API calls with artificial latency.

## Mock Data (`src/data/mockData.js`)

Single source of truth for seed data: jobs, companies, and users. Imported by service functions only — do not import it directly in components or contexts.

## Services (`src/services/`)

Each service simulates an async API. Every service function must call `delay()` from `src/utils/delay.js` to simulate network latency.

| File | Responsibility |
|---|---|
| `companyService.js` | Fetch companies and jobs (merges static + employer-posted) |
| `jobApplicationService.js` | Apply for jobs, withdraw applications, get my applications |
| `savedJobService.js` | Save/unsave jobs, get saved jobs list |
| `profileService.js` | Get and update job seeker profile data |
| `contactService.js` | Submit and retrieve contact form messages |

Do not call services directly from components. Pages must consume data through contexts (`useJobsData`, `useJobs`, `useAuth`) or dispatch context actions that call services internally.

## localStorage Keys

| Key | Content |
|---|---|
| `jobPortalUser` | Serialized current user object |
| `authToken` | Mock JWT string (`mock-jwt-{timestamp}`) |
| `registeredUsers` | Array of self-registered users |
| `globalPostedJobs` | Jobs posted by all employers |
| `globalApplications` | All job applications across seekers |
| `postedJobs_{userId}` | Employer's own posted jobs |
| `allApplications_{userId}` | Employer's received applications |
| `savedJobs_{userId}` | Job seeker saved jobs (localStorage fallback) |
| `appliedJobs_{userId}` | Job seeker applied jobs (localStorage fallback) |
| `job-portal-theme` | `"light"` or `"dark"` |

The `_{userId}` suffix uses `user.userId || user.id` — always check both fields.

## Data Flow

```
mockData.js
    └── services/            (async, always uses delay())
          └── contexts/      (JobsDataContext, CompaniesContext — cached)
                └── context/ (JobContext — mutating actions)
                      └── pages / components (consume via hooks only)
```

## Job List Composition

The global job list shown to users merges two sources:
1. Static jobs from `mockData.js` via `companyService.fetchAllJobs()`
2. Employer-posted jobs from `globalPostedJobs` in localStorage

`JobsDataContext` merges these on every fetch. `JobContext.getAllJobsSync()` provides a synchronous fallback for lookups that cannot await.

## Profile Completeness

Job seekers must complete their profile before applying for jobs. `AuthContext.login()` calls `profileService.getProfile()` after authentication and sets `user.profileComplete`. The check requires all of: `jobTitle`, `location`, `experienceLevel`, `professionalBio`, `profilePictureName`, `resumeName`. Missing any field sets `profileComplete: false`, which causes `JobContext.applyForJob()` to return an error with `requiresProfile: true`.

## Adding a New Service

1. Create `src/services/myService.js`
2. Import and call `delay()` at the start of every exported async function
3. Read/write to localStorage or `mockData.js` as needed
4. Expose the service only through the appropriate context — never call it directly from a component
