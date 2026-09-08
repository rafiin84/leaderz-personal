# Progress Log

Running record of what's been done on this project, so picking it back up
later (in a new chat, after time away) doesn't require re-explaining
context. For static project facts (design system, file map, tenant info)
see `CLAUDE.md` — this file is the changelog of decisions and customizations.

## Repo & environment

- GitHub: `https://github.com/rafiin84/leaderz-personal` (branch `main`)
- Local dev server: `npm run dev -- -p 3021` → `http://localhost:3021`
  (port 3020 is the convention in `CLAUDE.md`; 3021 was used to avoid
  clashing with another running instance)
- Git identity for commits in this repo is set locally (not global):
  `rafi-9540` / `mohammed.n@zohocorp.com`

## Working agreement

- After every meaningful change, commit and push to `origin main`
  automatically — no need to ask each time.
- Corrections/UI tweaks (colors, spacing, hiding/showing sections, nav
  changes) should just be applied directly, no back-and-forth. See
  `WORKING-PREFERENCES.md`.

## UI customizations made so far

**Left sidebar / mobile nav** (`src/components/navigation/navItems.ts`)
- Trimmed to exactly 4 tabs: **Home, Contacts, Messages, AI**.
- Originally also had Mission, Reels, Followers, Events, Organizations,
  Opportunities, Notifications — all removed from the nav on request.
- Notifications was briefly added as a 5th tab, then removed again since
  it's already reachable via the bell icon top-right
  (`src/components/notifications/NotificationBell.tsx`).

**Home page right panel** (`src/components/layout/RightPanel.tsx`)
- Removed: "Your mission" card, "Discovered" companies section, "Today's
  briefing" AI text block, "Relationship insights", "Coming up" (events).
- Kept: calendar + "Needs attention" (birthdays/follow-ups — contact info),
  and "Top engagers" (restored after being removed once).
- Current right panel = Calendar/Needs-attention card + Top engagers only.

## Notes for next session

- The `/leader/mission`, `/leader/reels`, `/leader/followers`,
  `/leader/events`, `/leader/projects`, `/leader/opportunities` pages still
  exist in the codebase — they were only unlinked from navigation, not
  deleted. Ask before deleting the actual page code if that's ever wanted.
