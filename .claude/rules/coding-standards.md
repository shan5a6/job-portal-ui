# Coding Standards

## Language

- **No TypeScript** — plain `.jsx` throughout; never add `.ts` or `.tsx` files
- **Functional components only** — no class components
- **Named exports** preferred over default exports for components

## Styling

- Use **Tailwind CSS utility classes exclusively** — no inline styles, no CSS modules
- Follow mobile-first responsive design: `sm:`, `md:`, `lg:` breakpoints
- **Dark mode via `ThemeContext`** — conditionally toggle classes based on `theme === 'dark'`; do not use Tailwind's `dark:` variants
- Access `theme` via `useTheme()` from `src/context/ThemeContext.jsx`

Example:
```jsx
const { theme } = useTheme();
<div className={`p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
```

## State & Data

- Use React Context for all shared state — no external state management library (no Redux, Zustand, etc.)
- Do not fetch data directly in page components; use service functions exposed through contexts
- All async service functions must call `delay()` from `src/utils/delay.js`
- Persist user-specific data to localStorage using the `{entity}_{userId}` key pattern
- Use `user.userId || user.id` when constructing localStorage keys — the field name varies between dummy and registered users

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | `PascalCase` | `JobCard.jsx` |
| Variables/functions | `camelCase` | `applyForJob` |
| Constants | `UPPER_SNAKE_CASE` | `CACHE_DURATION` |
| Files | Match the default/named export | `JobCard.jsx` exports `JobCard` |

## Component Design

- Keep components focused — extract reusable pieces into `src/components/`
- Do not add features, abstractions, or error handling beyond what the task requires
- Three similar lines is better than a premature abstraction
- No half-finished implementations

## Comments

- Default to writing no comments
- Add a comment only when the WHY is non-obvious: a hidden constraint, a subtle invariant, or a workaround for a specific bug
- Never comment what the code does — well-named identifiers already do that

## ESLint

Flat config in `eslint.config.js`. The `no-unused-vars` rule ignores variables starting with uppercase or `_` (`varsIgnorePattern: '^[A-Z_]'`). Run `npm run lint` before committing.

## Icons

Use **Font Awesome** (`@fortawesome/react-fontawesome`) or **Lucide React** (`lucide-react`) — both are already installed. Do not add additional icon libraries.

## Notifications

Use **react-toastify** (`toast.success()`, `toast.error()`, etc.) for user-facing feedback. The `<ToastContainer>` is mounted in the root layout — do not add another one.
