# Git Conventions

## Branching

Branch off `main` for all new work. Keep branches short-lived; open a PR when ready. Delete branches after merging.

### Branch Naming

```
feature/add-job-filter-sidebar         # New features
fix/employer-route-redirect-loop       # Bug fixes
docs/update-readme                     # Documentation only
chore/upgrade-dependencies             # Maintenance, tooling
refactor/simplify-auth-context         # Code refactoring
style/mobile-job-card-spacing          # Visual/style changes
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add saved jobs count to navbar
fix: correct role guard on employer routes
docs: update README with localStorage keys
chore: upgrade react-router to v7.8
refactor: extract job card into reusable component
style: fix spacing on mobile job list
```

Rules:
- Use present tense, lowercase, no period at the end
- Keep the subject line under 72 characters
- Add a body for non-obvious changes

## Pull Requests

- PR title must match the commit message format
- Include a summary and test plan in the PR description
- Target `main` as the base branch

## Main Branch

`main` is the base branch. All PRs target `main`. Do not push directly to `main`.

## Workflow

```
git checkout main
git pull
git checkout -b fix/your-branch-name

# ... make changes ...

npm run lint          # must pass before committing
git add <specific files>
git commit -m "fix: describe what you fixed"
git push -u origin fix/your-branch-name
# open PR targeting main
```

Always stage specific files rather than `git add .` to avoid accidentally committing `.env` files, build artifacts, or large binaries.
