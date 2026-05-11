# QACanvas

A practice playground for **Playwright (TypeScript)** test automation. Every page
targets a specific type of UI element or Playwright feature. No backend — all logic
is client-side with hardcoded data.

## Quick start

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173/qacanvas/`. The app is configured
with `base: '/qacanvas/'` so it works under that path on GitHub Pages too.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check then build to `dist/` |
| `npm run preview` | Preview the production build locally |

## Auth

The home and every `/pages/*.html` are protected. The only unprotected page is
`/login.html`.

- **Credentials:** `admin` / `admin123`
- Session is stored as `sessionStorage.setItem('loggedIn', 'true')`.
- Wrong credentials show an inline error message (`data-testid="login-error-msg"`).
- The "Logout" button in the navbar clears `sessionStorage.loggedIn` and redirects to
  `/login.html`.

## Theming

Light/dark theme toggle in the navbar (`data-testid="theme-toggle"`). The chosen
theme is persisted in `localStorage` under `qacanvas-theme`. A small inline script in
every page's `<head>` reads the theme before CSS loads to prevent a flash.

## Pages

| Section | URL | What it covers |
| --- | --- | --- |
| Home | `/index.html` | Navigation grid (`data-testid="home-grid"`) |
| Login | `/login.html` | Form with hardcoded credentials |
| Inputs | `/pages/inputs.html` | text, number, password, tel, url, textarea, range, color, search, datalist |
| Buttons | `/pages/buttons.html` | click, double-click, right-click, dynamic toggle, loading, 3s-delayed |
| Checkboxes | `/pages/checkboxes.html` | single, check-all group, indeterminate parent, radio groups |
| Selects | `/pages/selects.html` | native single, multi, sorted, custom dropdown, searchable, cascading |
| Forms | `/pages/forms.html` | full registration form with validation + error/success modals |
| Tables | `/pages/tables.html` | static, sortable, filterable/searchable, paginated, dynamic |
| Alerts | `/pages/alerts.html` | JS alert/confirm/prompt, custom modal, nested modals, auto-close modal |
| Iframes | `/pages/iframes.html` | three `srcdoc` iframes including a nested one |
| Drag & Drop | `/pages/dragdrop.html` | drag between lists, sortable list, drop zone (HTML5 drag events) |
| Hover | `/pages/hover.html` | tooltips (4 positions), hover card, right-click context menu, hover image swap |
| Keyboard | `/pages/keyboard.html` | key press logger, Ctrl+S / Ctrl+Z / Esc shortcuts, tab order, arrow nav |
| Scroll | `/pages/scroll.html` | scrollIntoView, infinite scroll, sticky bar, scroll-position tracker |
| Dynamic | `/pages/dynamic.html` | appearing/disappearing element, skeleton → content, progress bar, rotating text, conditional |
| Tabs | `/pages/tabs.html` | new tab link, `window.open`, popup, `BroadcastChannel` |
| Shadow DOM | `/pages/shadow-dom.html` | open shadow root, nested shadow, shadow form |
| Network | `/pages/network.html` | `/api/*` targets for `page.route()` interception (404 in plain browser, by design) |
| Storage | `/pages/storage.html` | `localStorage` / `sessionStorage` / cookies CRUD + persistence test |

## Test-id convention

Every interactive element and every result/feedback element has a `data-testid`.
The pattern is `element-description-qualifier` — e.g.
`text-input`, `submit-btn`, `dropdown-country`, `table-row-0`, `error-msg-email`.

A few patterns to keep in mind:

- Listed result/output elements always have a dedicated `*-result`, `*-display`, or
  `*-status` test id, separate from the trigger.
- Group containers (radio sets, interest checkboxes, etc.) carry the group test id
  (`gender-input`, `interests-input`) while individual options have their own
  (`gender-male`, `interest-sports`, …).
- The shared navbar exposes `navbar`, `navbar-brand`, `navbar-menu-toggle`,
  `navbar-links`, `nav-link-{key}`, `theme-toggle`, `logout-btn`. The footer is
  `page-footer`.

## Network page note

The fake endpoints (`/api/users`, `/api/products`, `/api/login`, `/api/slow`,
`/api/error`) intentionally return 404 in a regular browser — there is no server.
Tests intercept them with:

```ts
await page.route('**/api/users', (route) =>
  route.fulfill({ json: [ /* fixtures */ ] })
);
```

The UI gracefully displays the error and tells you to wire up `page.route()`.

## Project structure

```
qacanvas/
├── index.html                  ← home
├── login.html                  ← only unprotected page
├── pages/                      ← protected practice pages
│   ├── inputs.html
│   ├── buttons.html
│   ├── …
├── src/
│   ├── main.ts                 ← shared: auth guard, theme, navbar, footer, logout
│   ├── login.ts
│   └── pages/                  ← one TS module per page
│       ├── home.ts
│       ├── inputs.ts
│       ├── …
├── styles/
│   ├── base.css                ← reset, CSS vars (light/dark), typography
│   ├── navbar.css
│   └── components.css          ← buttons, inputs, tables, modals, cards, …
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Deployment (GitHub Pages)

1. Build: `npm run build`
2. Output: `dist/`
3. The `base` is set to `/qacanvas/` in `vite.config.ts`. If your repo has a different
   name, update `base` and the link below.
4. Publish `dist/` to the `gh-pages` branch (e.g. via `gh-pages` package or a GitHub
   Actions workflow).

## Implementation decisions worth knowing

A few places where the spec left room for interpretation:

- **Navbar/footer are injected by JS** (`src/main.ts`) instead of duplicated in every
  HTML file. This keeps the markup DRY; both still exist before tests assert on them
  because the script runs synchronously after `DOMContentLoaded`.
- **Auth session value:** stored as a string flag — `sessionStorage.setItem('loggedIn', 'true')` — rather than a JSON object. The check is `sessionStorage.getItem('loggedIn') === 'true'`.
- **Theme is read by an inline `<head>` script** before any module loads, to avoid a
  flash of the wrong theme on first paint.
- **Internal hrefs are relative** (e.g. `pages/inputs.html`, `../index.html`) so the
  app stays portable to any `base` path.
- **JS-built redirects** prepend `import.meta.env.BASE_URL` so login redirects work
  under `/qacanvas/`.
- **The 6 delayed/loading patterns use real `setTimeout`** rather than feature flags
  or mocked promises — this is the realistic case Playwright's auto-waiting must
  handle.
- **Custom modal close buttons** include both the `✕` corner button and an explicit
  Confirm/Cancel/OK action so tests can choose which dismissal path to exercise.
- **Drag-and-drop uses native HTML5 events** (`dragstart` / `dragover` / `drop`).
  Playwright's `locator.dragTo()` issues mouse events which may not trigger the
  HTML5 path on every browser; if your tests need it, dispatch
  `DataTransfer`-based events directly or use the dedicated helpers.

Happy automating! 🎭
