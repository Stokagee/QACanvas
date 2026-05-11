# QACanvas — Playwright Practice App Specification

## Overview

Build **QACanvas** — a standalone, modern web application designed as a practice playground for Playwright (TypeScript) test automation. Every page targets a specific type of UI element or Playwright feature. The app has no backend; all logic is client-side with hardcoded data.

---

## Tech Stack

- **Build tool:** Vite (multi-page mode)
- **Language:** Vanilla TypeScript + HTML + CSS
- **No framework** (no React, no Vue, no Angular)
- **Theme:** Light/dark toggle (CSS custom properties)
- **Deployment target:** GitHub Pages (static build)

---

## Design Requirements

- Modern, clean look — think developer tool / documentation site aesthetic
- CSS custom properties for theming (`--color-bg`, `--color-text`, `--color-primary`, etc.)
- Light theme default, dark theme toggled via button in navbar
- Theme persisted in `localStorage`
- Responsive layout (desktop-first, but functional on tablet)
- Consistent navbar on every page with:
  - App logo/name **QACanvas** (links to index)
  - Navigation links to all sections (collapsible on smaller screens)
  - Light/dark toggle button (`data-testid="theme-toggle"`)
- Footer on every page: `data-testid="page-footer"`
- Every page has an `<h1>` with the section name

---

## Project Structure

```
qacanvas/
├── index.html
├── login.html
├── pages/
│   ├── inputs.html
│   ├── buttons.html
│   ├── checkboxes.html
│   ├── selects.html
│   ├── forms.html
│   ├── tables.html
│   ├── alerts.html
│   ├── iframes.html
│   ├── dragdrop.html
│   ├── hover.html
│   ├── keyboard.html
│   ├── scroll.html
│   ├── dynamic.html
│   ├── tabs.html
│   ├── shadow-dom.html
│   ├── network.html
│   └── storage.html
├── src/
│   ├── main.ts           ← shared: theme toggle, navbar logic
│   ├── login.ts
│   ├── pages/
│   │   ├── inputs.ts
│   │   ├── buttons.ts
│   │   ├── checkboxes.ts
│   │   ├── selects.ts
│   │   ├── forms.ts
│   │   ├── tables.ts
│   │   ├── alerts.ts
│   │   ├── iframes.ts
│   │   ├── dragdrop.ts
│   │   ├── hover.ts
│   │   ├── keyboard.ts
│   │   ├── scroll.ts
│   │   ├── dynamic.ts
│   │   ├── tabs.ts
│   │   ├── shadow-dom.ts
│   │   ├── network.ts
│   │   └── storage.ts
├── styles/
│   ├── base.css          ← reset, variables, typography
│   ├── navbar.css
│   └── components.css    ← reusable: cards, badges, tables, buttons
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## data-testid Convention

Follow this pattern throughout: `element-description-qualifier`

Examples:
- `data-testid="text-input"` 
- `data-testid="submit-btn"`
- `data-testid="dropdown-country"`
- `data-testid="table-row-0"`
- `data-testid="error-msg-email"`

Every interactive element and every result/feedback element MUST have a `data-testid`.

---

## Authentication

### `login.html`

- Visible at `/login.html`
- After successful login redirect to `index.html`
- Hardcoded credentials: `admin` / `admin123`
- If wrong credentials: show inline error message
- Session stored in `sessionStorage` as `{ loggedIn: true }`
- Protected pages redirect to `/login.html` if not logged in (check on page load)
- `index.html` and all `/pages/*.html` are protected

Elements and test IDs:
```
data-testid="login-form"
data-testid="username-input"
data-testid="password-input"
data-testid="login-btn"
data-testid="login-error-msg"       ← hidden by default, shown on wrong credentials
```

---

## Pages

---

### `index.html` — Home / Navigation Hub

- Grid of cards, one per section
- Each card: icon, section title, short description of what can be practiced
- Click on card navigates to that page
- `data-testid="home-grid"`
- Each card: `data-testid="nav-card-{section}"` e.g. `nav-card-inputs`, `nav-card-tables`

---

### `pages/inputs.html` — Inputs

**Purpose:** Practice all input types, locator strategies, attribute assertions.

Sections on the page:

**1. Text Inputs**
```html
<!-- Standard text input -->
<input type="text" data-testid="input-text" placeholder="Enter text" />

<!-- Disabled input -->
<input type="text" data-testid="input-disabled" disabled value="Cannot edit" />

<!-- Readonly input -->
<input type="text" data-testid="input-readonly" readonly value="Read only value" />

<!-- Input with aria-label -->
<input type="text" aria-label="Search field" data-testid="input-aria-label" />

<!-- Input with visible label (for getByLabel) -->
<label for="email-field">Email address</label>
<input type="email" id="email-field" data-testid="input-email" placeholder="Enter email" />

<!-- Input with placeholder only -->
<input type="text" data-testid="input-placeholder" placeholder="Type your name here" />
```

**2. Number, Password, Tel, URL inputs**
```
data-testid="input-number"
data-testid="input-password"
data-testid="input-tel"
data-testid="input-url"
```

**3. Textarea**
```
data-testid="textarea-basic"        ← resizable
data-testid="textarea-max-length"   ← maxlength="100", show character counter
data-testid="textarea-counter"      ← live character count display
```

**4. Range slider**
```
data-testid="input-range"
data-testid="range-value-display"   ← shows current value live
```

**5. Color picker**
```
data-testid="input-color"
data-testid="color-value-display"   ← shows hex value
```

**6. Search input (with clear button)**
```
data-testid="input-search"
data-testid="search-clear-btn"
data-testid="search-result-count"
```

**7. Input with autocomplete suggestions (datalist)**
```
data-testid="input-datalist"
<!-- datalist with 10 country names -->
```

---

### `pages/buttons.html` — Buttons

**Purpose:** Practice click, double-click, right-click, dynamic states, visibility.

**1. Basic button variants**
```
data-testid="btn-primary"
data-testid="btn-secondary"
data-testid="btn-danger"
data-testid="btn-disabled"          ← disabled attribute
data-testid="btn-click-counter"     ← shows click count: "Clicked: 0 times"
data-testid="btn-click-result"      ← text updates on click
```

**2. Double-click button**
```
data-testid="btn-double-click"
data-testid="dbl-click-result"      ← shows "Double clicked!" after dblclick
```

**3. Right-click button**
```
data-testid="btn-right-click"
data-testid="right-click-result"    ← shows "Right clicked!" after contextmenu event
```

**4. Dynamic button (START/STOP)**
- Button starts as "START", click changes to "STOP", click again back to "START"
```
data-testid="btn-dynamic-toggle"    ← text alternates between START and STOP
data-testid="dynamic-btn-state"     ← shows current state text
```

**5. Loading button**
- Click triggers 2s loading state, then shows success
```
data-testid="btn-loading"
data-testid="loading-spinner"       ← visible only during loading
data-testid="loading-result"        ← shows result after loading
```

**6. Button that becomes visible after 3 seconds**
```
data-testid="btn-delayed"           ← hidden on load, appears after 3s
data-testid="delayed-countdown"     ← shows "Appears in 3s... 2s... 1s..."
```

---

### `pages/checkboxes.html` — Checkboxes & Radio Buttons

**Purpose:** Practice check/uncheck, check all, indeterminate state, radio groups.

**1. Single checkboxes**
```
data-testid="checkbox-terms"
data-testid="checkbox-newsletter"
data-testid="checkbox-notifications"
```

**2. Checkbox group with "Check All"**
- 6 items (fruits: Apple, Banana, Cherry, Date, Elderberry, Fig)
```
data-testid="checkbox-check-all"
data-testid="checkbox-item-apple"
data-testid="checkbox-item-banana"
data-testid="checkbox-item-cherry"
data-testid="checkbox-item-date"
data-testid="checkbox-item-elderberry"
data-testid="checkbox-item-fig"
data-testid="checked-count-display"     ← "Selected: 0 / 6"
```

**3. Indeterminate checkbox**
- Parent checkbox becomes indeterminate when some (not all) children are checked
```
data-testid="checkbox-parent"
data-testid="checkbox-child-1"
data-testid="checkbox-child-2"
data-testid="checkbox-child-3"
```

**4. Radio button groups**
- Group 1: Gender (Male, Female, Other, Prefer not to say)
- Group 2: Priority (Low, Medium, High, Critical)
```
data-testid="radio-gender-male"
data-testid="radio-gender-female"
data-testid="radio-gender-other"
data-testid="radio-gender-prefer-not"
data-testid="radio-priority-low"
data-testid="radio-priority-medium"
data-testid="radio-priority-high"
data-testid="radio-priority-critical"
data-testid="radio-gender-result"       ← shows selected value
data-testid="radio-priority-result"     ← shows selected value
```

---

### `pages/selects.html` — Dropdowns & Selects

**Purpose:** Practice native select, multi-select, custom dropdown, searchable dropdown.

**1. Native single select**
- 10 countries
```
data-testid="select-country"
data-testid="select-country-result"
```

**2. Native multi-select**
- 7 colors (Red, Green, Blue, Yellow, Orange, Purple, Pink)
```
data-testid="select-colors"
data-testid="select-colors-result"     ← shows all selected
```

**3. Native select — sorted verification**
- Days of week in correct order
```
data-testid="select-days"
```

**4. Custom dropdown (div-based, not native select)**
- Opened by clicking trigger, closed by clicking outside
- 8 programming languages
```
data-testid="custom-dropdown-trigger"
data-testid="custom-dropdown-list"     ← hidden/visible
data-testid="custom-dropdown-option-javascript"
data-testid="custom-dropdown-option-typescript"
data-testid="custom-dropdown-option-python"
data-testid="custom-dropdown-option-java"
data-testid="custom-dropdown-option-csharp"
data-testid="custom-dropdown-option-go"
data-testid="custom-dropdown-option-rust"
data-testid="custom-dropdown-option-php"
data-testid="custom-dropdown-selected"    ← shows selected option text
```

**5. Searchable dropdown**
- Type to filter options (list of 20 cities worldwide)
```
data-testid="searchable-dropdown-input"
data-testid="searchable-dropdown-list"
data-testid="searchable-dropdown-no-results"   ← shown when no match
data-testid="searchable-dropdown-result"
```

**6. Cascading dropdowns (dependent)**
- Country → State/Region (changes based on country)
- Include: USA (states: California, Texas, New York, Florida), Germany (states: Bavaria, Berlin, Hamburg), Czech Republic (regions: Prague, Brno, Ostrava)
```
data-testid="cascade-country"
data-testid="cascade-region"
data-testid="cascade-result"
```

---

### `pages/forms.html` — Forms & Validation

**Purpose:** Practice form submission, validation, error messages, success states.

**Complete registration form** with full client-side validation:

Fields:
- First name (required, min 2 chars)
- Last name (required, min 2 chars)  
- Email (required, valid email format)
- Phone (required, digits only, 9 chars)
- Password (required, min 8 chars)
- Confirm password (must match password)
- Date of birth (required, must be 18+)
- Website URL (optional, valid URL format)
- Bio / notes (optional, max 500 chars)
- Gender (radio: Male / Female / Other)
- Interests (checkboxes: min 1 required — Sports, Music, Travel, Tech, Food)
- Country (select, required)
- File upload (optional, accepts .pdf .doc .docx .jpg .png, max 5MB)
- Terms agreement (checkbox, required)

Each field has:
- `data-testid="{fieldname}-input"` for the input
- `data-testid="{fieldname}-error"` for error message (hidden until triggered)

Buttons:
```
data-testid="form-submit-btn"
data-testid="form-reset-btn"
```

Result modals:
```
data-testid="validation-error-modal"        ← shown if form submitted with errors
data-testid="validation-error-modal-close"
data-testid="success-modal"                 ← shown on successful submit
data-testid="success-modal-close"
data-testid="success-modal-summary"         ← displays submitted values
```

Validation triggers:
- On blur (field loses focus)
- On submit (all fields)
- Error message disappears when field becomes valid

---

### `pages/tables.html` — Tables

**Purpose:** Practice table traversal, filtering, sorting, pagination, dynamic data.

Use this dataset (10 employees):
```
Name, Department, Position, Salary, Start Date, Status
Alice Johnson, Engineering, Senior Dev, 95000, 2020-03-15, Active
Bob Smith, Marketing, Manager, 72000, 2019-07-22, Active
Carol White, Engineering, Junior Dev, 58000, 2022-01-10, Active
David Brown, HR, Specialist, 61000, 2021-05-18, Inactive
Eve Davis, Engineering, Lead Dev, 110000, 2018-11-03, Active
Frank Wilson, Marketing, Analyst, 65000, 2020-09-14, Active
Grace Lee, Finance, Accountant, 70000, 2019-02-28, Active
Henry Taylor, HR, Director, 90000, 2017-06-05, Inactive
Iris Martinez, Finance, Analyst, 63000, 2021-11-20, Active
Jack Anderson, Engineering, Architect, 125000, 2016-04-11, Active
```

**Table 1: Static table (read-only)**
```
data-testid="static-table"
data-testid="static-table-row-{0..9}"      ← 0-indexed
data-testid="static-table-cell-{row}-{col}"
```

**Table 2: Sortable table**
- Click column header to sort ASC, click again DESC
- Sort indicator (▲/▼) in header
```
data-testid="sortable-table"
data-testid="sort-header-name"
data-testid="sort-header-department"
data-testid="sort-header-salary"
data-testid="sort-indicator-name"
data-testid="sortable-table-body"
```

**Table 3: Filterable + searchable table**
```
data-testid="filter-table-search"          ← text search across all columns
data-testid="filter-table-dept"            ← filter by department (select)
data-testid="filter-table-status"          ← filter by status (select: All/Active/Inactive)
data-testid="filter-table-results-count"   ← "Showing X of 10 results"
data-testid="filter-table-body"
data-testid="filter-no-results"            ← shown when 0 results
```

**Table 4: Paginated table**
- 3 rows per page
```
data-testid="paged-table-body"
data-testid="paged-table-prev"
data-testid="paged-table-next"
data-testid="paged-table-page-info"        ← "Page 1 of 4"
data-testid="paged-table-first"
data-testid="paged-table-last"
data-testid="paged-rows-select"            ← select rows per page: 3 / 5 / 10
```

**Table 5: Dynamic table**
- "Reload data" button fetches random order every time (shuffles array client-side)
- Column order is fixed but row order changes
```
data-testid="dynamic-table-reload"
data-testid="dynamic-table-body"
data-testid="dynamic-table-status"         ← "Loading..." / "Loaded"
```

---

### `pages/alerts.html` — JS Dialogs & Custom Modals

**Purpose:** Practice page.on('dialog'), dialog.accept(), dialog.dismiss(), dialog.message().

**1. JS Alert**
```
data-testid="trigger-alert-btn"
data-testid="alert-result"                 ← "Alert accepted" after dismiss
```

**2. JS Confirm**
```
data-testid="trigger-confirm-btn"
data-testid="confirm-result"               ← "You pressed OK" or "You pressed Cancel"
```

**3. JS Prompt**
- Default value: "John Doe"
```
data-testid="trigger-prompt-btn"
data-testid="prompt-result"                ← shows entered value
```

**4. Custom modal dialog (not JS dialog)**
```
data-testid="open-modal-btn"
data-testid="custom-modal"
data-testid="modal-title"
data-testid="modal-body"
data-testid="modal-confirm-btn"
data-testid="modal-cancel-btn"
data-testid="modal-close-x"               ← X button in corner
data-testid="modal-result"                ← result text after action
```

**5. Nested modals**
- Modal A opens Modal B
```
data-testid="open-modal-a-btn"
data-testid="modal-a"
data-testid="open-modal-b-btn"            ← inside modal A
data-testid="modal-b"
data-testid="modal-b-close"
data-testid="modal-a-close"
```

**6. Auto-close modal**
- Appears after clicking button, auto-closes after 3 seconds
```
data-testid="trigger-timed-modal-btn"
data-testid="timed-modal"
data-testid="timed-modal-countdown"        ← "Closing in 3... 2... 1..."
```

---

### `pages/iframes.html` — Frames

**Purpose:** Practice page.frame(), page.frameLocator(), nested frames.

**Frame 1: Simple iframe**
- Inline HTML via `srcdoc`
- Contains: text input, button, paragraph
```
data-testid="iframe-simple"                ← the iframe element
<!-- inside frame: -->
data-testid="frame1-input"
data-testid="frame1-btn"
data-testid="frame1-result"
```

**Frame 2: Iframe with form**
- Contains a small login-like form
```
data-testid="iframe-form"
<!-- inside: -->
data-testid="frame2-username"
data-testid="frame2-password"
data-testid="frame2-submit"
data-testid="frame2-result"
```

**Frame 3: Nested iframes**
- Outer iframe contains inner iframe
```
data-testid="iframe-outer"
<!-- outer frame contains: -->
data-testid="frame3-outer-input"
data-testid="iframe-inner"                 ← nested inside outer
<!-- inner frame contains: -->
data-testid="frame3-inner-checkbox"
data-testid="frame3-inner-result"
```

All iframes use `srcdoc` attribute so no external dependencies.

---

### `pages/dragdrop.html` — Drag & Drop

**Purpose:** Practice HTML5 drag events, drag to reorder, drag between containers.

**1. Drag items between two lists**
- Left list: "Available Items" (5 items: Item A through Item E)
- Right list: "Selected Items" (empty initially)
- Drag from left to right and back
```
data-testid="dnd-available-list"
data-testid="dnd-selected-list"
data-testid="dnd-item-a"
data-testid="dnd-item-b"
data-testid="dnd-item-c"
data-testid="dnd-item-d"
data-testid="dnd-item-e"
data-testid="dnd-available-count"          ← "Available: 5"
data-testid="dnd-selected-count"           ← "Selected: 0"
```

**2. Reorderable list (drag to sort)**
- 5 tasks that can be reordered by drag
```
data-testid="sortable-list"
data-testid="sortable-item-{1..5}"
data-testid="sortable-order-display"       ← shows current order: "1,2,3,4,5"
```

**3. Drag to a drop zone**
- 4 draggable cards, 1 drop zone
- Drop zone shows count of dropped items
```
data-testid="drop-zone"
data-testid="draggable-card-{1..4}"
data-testid="drop-zone-count"              ← "Dropped: 0 items"
data-testid="dnd-reset-btn"
```

---

### `pages/hover.html` — Hover, Tooltips, Context Menu

**Purpose:** Practice hover states, tooltip visibility, right-click menus.

**1. Hover to reveal tooltip**
- Multiple elements with different tooltip positions (top, right, bottom, left)
```
data-testid="hover-tooltip-top"
data-testid="tooltip-top-content"          ← hidden, visible on hover
data-testid="hover-tooltip-right"
data-testid="tooltip-right-content"
data-testid="hover-tooltip-bottom"
data-testid="tooltip-bottom-content"
data-testid="hover-tooltip-left"
data-testid="tooltip-left-content"
```

**2. Hover to reveal hidden button**
- Card that reveals action buttons only on hover
```
data-testid="hover-card"
data-testid="hover-card-edit-btn"          ← hidden, visible on card hover
data-testid="hover-card-delete-btn"        ← hidden, visible on card hover
```

**3. Right-click context menu**
- Custom context menu appears on right-click
- Menu items: Edit, Copy, Delete, Share
```
data-testid="right-click-area"
data-testid="context-menu"                 ← hidden, shown on contextmenu event
data-testid="context-menu-edit"
data-testid="context-menu-copy"
data-testid="context-menu-delete"
data-testid="context-menu-share"
data-testid="context-menu-result"          ← shows which option was clicked
```

**4. Hover to change image (before/after)**
```
data-testid="hover-image-container"
data-testid="hover-image-before"
data-testid="hover-image-after"            ← shown on hover
```

---

### `pages/keyboard.html` — Keyboard Interactions

**Purpose:** Practice keyboard.press(), keyboard.type(), keyboard shortcuts, tab order.

**1. Key press logger**
- Input that logs every key pressed
```
data-testid="keypress-input"
data-testid="keypress-log"                 ← shows last pressed key
data-testid="keypress-count"               ← total keypresses
data-testid="keypress-clear"
```

**2. Keyboard shortcuts**
- Pressing defined shortcut triggers action
- Ctrl+S → "Saved!", Ctrl+Z → "Undone!", Escape → close panel
```
data-testid="shortcut-focus-area"          ← must be focused for shortcuts to work
data-testid="shortcut-save-result"         ← "Saved!" on Ctrl+S
data-testid="shortcut-undo-result"         ← "Undone!" on Ctrl+Z
data-testid="shortcut-panel"               ← panel closed by Escape
data-testid="shortcut-open-panel-btn"
```

**3. Tab order verification**
- Form with 5 fields in specific tab order
- Visual indicator shows which field is focused
```
data-testid="tab-field-1"
data-testid="tab-field-2"
data-testid="tab-field-3"
data-testid="tab-field-4"
data-testid="tab-field-5"
data-testid="tab-focus-indicator"          ← shows "Currently focused: field-X"
```

**4. Arrow key navigation**
- List navigable with up/down arrow keys
```
data-testid="arrow-nav-list"
data-testid="arrow-nav-item-{1..5}"
data-testid="arrow-nav-selected"           ← shows selected item
```

---

### `pages/scroll.html` — Scroll & Lazy Loading

**Purpose:** Practice scrollIntoView, infinite scroll, scroll position detection.

**1. Scroll to element**
- Page with many sections, buttons to jump to each
```
data-testid="scroll-to-top-btn"
data-testid="scroll-to-section-2-btn"
data-testid="scroll-to-section-5-btn"
data-testid="scroll-to-bottom-btn"
data-testid="scroll-section-1"
data-testid="scroll-section-2"
data-testid="scroll-section-3"
data-testid="scroll-section-4"
data-testid="scroll-section-5"
```

**2. Infinite scroll list**
- Initial 10 items, loads 10 more when scrolled to bottom
- Maximum 50 items total
```
data-testid="infinite-scroll-container"
data-testid="infinite-scroll-item-{n}"     ← numbered from 1
data-testid="infinite-scroll-loading"      ← "Loading more..." indicator
data-testid="infinite-scroll-end"          ← "All items loaded" shown at max
data-testid="infinite-scroll-count"        ← "Showing X items"
```

**3. Sticky element**
- Element that becomes fixed when scrolled past it
```
data-testid="sticky-bar"                   ← becomes fixed after scroll
data-testid="sticky-status"                ← "Sticky: yes/no"
```

**4. Scroll position tracker**
```
data-testid="scroll-position-display"      ← "Scroll Y: 0px"
data-testid="scroll-percent-display"       ← "0% of page"
```

---

### `pages/dynamic.html` — Dynamic Content

**Purpose:** Practice waiting for elements, loading states, conditional visibility.

**1. Element appears after delay**
- Button triggers element to appear after 2s
```
data-testid="trigger-delayed-element"
data-testid="delayed-element"              ← not in DOM until triggered, then appears after 2s
```

**2. Element disappears after delay**
```
data-testid="trigger-disappear"
data-testid="disappearing-element"         ← visible, disappears after 2s on click
```

**3. Loading skeleton → content**
- Simulates API loading: skeleton for 2s then real content
```
data-testid="load-content-btn"
data-testid="content-skeleton"             ← shown during loading
data-testid="content-loaded"               ← shown after load
data-testid="content-title"
data-testid="content-body"
```

**4. Progress bar**
- Starts on button click, fills over 3 seconds
```
data-testid="start-progress-btn"
data-testid="progress-bar"
data-testid="progress-value"               ← 0–100
data-testid="progress-status"             ← "In progress..." / "Complete!"
```

**5. Element that changes text every 2 seconds (rotating)**
- Cycles through 5 different status messages
```
data-testid="rotating-text"
data-testid="rotation-index"               ← current index 0–4
```

**6. Conditional section**
- Toggle checkbox shows/hides a section
```
data-testid="toggle-section-checkbox"
data-testid="conditional-section"         ← hidden/visible based on checkbox
```

---

### `pages/tabs.html` — Browser Tabs & Windows

**Purpose:** Practice page context, new tabs, switching between pages.

**1. Open new tab**
- Link that opens in new tab (`target="_blank"`)
```
data-testid="open-new-tab-link"            ← href to /pages/inputs.html, target=_blank
data-testid="open-new-tab-btn"             ← button that does window.open(...)
```

**2. Popup window**
- Opens a small popup (width 400, height 300)
```
data-testid="open-popup-btn"
data-testid="popup-result"                 ← "Popup opened" / "Popup was closed"
```

**3. Tab communication**
- Button sends message to all tabs via BroadcastChannel
- Other open QACanvas tabs display the message
```
data-testid="broadcast-input"
data-testid="broadcast-send-btn"
data-testid="broadcast-received"           ← shows last received message
```

---

### `pages/shadow-dom.html` — Shadow DOM

**Purpose:** Practice locating elements inside shadow roots.

**1. Simple shadow root**
- Custom element `<my-widget>` with shadow DOM
- Shadow contains: input, button, output text
```
data-testid="shadow-host-1"               ← the host element
<!-- inside shadow root: -->
data-testid="shadow-input"
data-testid="shadow-btn"
data-testid="shadow-result"
```

**2. Nested shadow DOM**
- Outer shadow host contains inner shadow host
```
data-testid="shadow-host-outer"
<!-- outer shadow: contains inner host -->
data-testid="shadow-host-inner"
<!-- inner shadow: -->
data-testid="shadow-inner-checkbox"
data-testid="shadow-inner-label"
```

**3. Shadow DOM form**
- Entire form inside shadow root
```
data-testid="shadow-form-host"
<!-- shadow: -->
data-testid="shadow-form-name"
data-testid="shadow-form-email"
data-testid="shadow-form-submit"
data-testid="shadow-form-result"
```

Implement shadow roots using `customElements.define()` and `attachShadow({ mode: 'open' })`.

---

### `pages/network.html` — Network Interception Targets

**Purpose:** Provide endpoints and UI triggers designed for `page.route()` practice.

**1. Fake API fetch buttons**
Each button calls a specific fake endpoint (handled client-side via fetch to relative paths that will be intercepted in tests):

```
GET /api/users          → returns array of 5 users
GET /api/products       → returns array of 5 products
POST /api/login         → returns token
GET /api/slow           → responds after 3 second delay
GET /api/error          → returns HTTP 500
```

UI elements:
```
data-testid="fetch-users-btn"
data-testid="fetch-products-btn"
data-testid="fetch-login-btn"
data-testid="fetch-slow-btn"
data-testid="fetch-error-btn"
data-testid="api-response-display"        ← shows JSON response
data-testid="api-status-display"          ← "200 OK" / "500 Error" etc.
data-testid="api-loading-indicator"
```

**2. Request counter**
```
data-testid="request-count-display"       ← "Requests made: 0"
data-testid="reset-counter-btn"
```

**Note for Claude Code:** The actual fetch calls go to `/api/*` paths which will 404 by default. This is intentional — in Playwright tests, `page.route('/api/**', ...)` will intercept them. For manual browser usage, show a friendly message: "These buttons are designed to be intercepted by page.route() in Playwright tests."

---

### `pages/storage.html` — Cookies & Web Storage

**Purpose:** Practice cookies, localStorage, sessionStorage via Playwright.

**1. localStorage**
```
data-testid="ls-key-input"
data-testid="ls-value-input"
data-testid="ls-set-btn"
data-testid="ls-get-btn"
data-testid="ls-remove-btn"
data-testid="ls-clear-btn"
data-testid="ls-result"
data-testid="ls-all-items"                 ← table of all localStorage items
```

**2. sessionStorage**
```
data-testid="ss-key-input"
data-testid="ss-value-input"
data-testid="ss-set-btn"
data-testid="ss-get-btn"
data-testid="ss-result"
```

**3. Cookies**
```
data-testid="cookie-name-input"
data-testid="cookie-value-input"
data-testid="cookie-set-btn"
data-testid="cookie-get-btn"
data-testid="cookie-delete-btn"
data-testid="cookie-result"
data-testid="cookie-all-display"           ← shows all current cookies as text
```

**4. Storage persistence test**
- Set value → reload page → verify value survived
```
data-testid="persist-input"
data-testid="persist-save-btn"
data-testid="persist-reload-btn"           ← reloads the page
data-testid="persist-result"               ← shows value on load if it was saved
```

---

## Vite Configuration

Configure Vite for multi-page app (MPA):

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/qacanvas/',   // for GitHub Pages deployment
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        inputs: resolve(__dirname, 'pages/inputs.html'),
        buttons: resolve(__dirname, 'pages/buttons.html'),
        checkboxes: resolve(__dirname, 'pages/checkboxes.html'),
        selects: resolve(__dirname, 'pages/selects.html'),
        forms: resolve(__dirname, 'pages/forms.html'),
        tables: resolve(__dirname, 'pages/tables.html'),
        alerts: resolve(__dirname, 'pages/alerts.html'),
        iframes: resolve(__dirname, 'pages/iframes.html'),
        dragdrop: resolve(__dirname, 'pages/dragdrop.html'),
        hover: resolve(__dirname, 'pages/hover.html'),
        keyboard: resolve(__dirname, 'pages/keyboard.html'),
        scroll: resolve(__dirname, 'pages/scroll.html'),
        dynamic: resolve(__dirname, 'pages/dynamic.html'),
        tabs: resolve(__dirname, 'pages/tabs.html'),
        shadowDom: resolve(__dirname, 'pages/shadow-dom.html'),
        network: resolve(__dirname, 'pages/network.html'),
        storage: resolve(__dirname, 'pages/storage.html'),
      }
    }
  }
})
```

---

## package.json

```json
{
  "name": "qacanvas",
  "version": "1.0.0",
  "description": "Playwright practice app — QACanvas",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

---

## CSS Design System

Use these CSS custom properties (defined in `styles/base.css`):

```css
:root {
  --color-bg: #ffffff;
  --color-bg-secondary: #f5f7fa;
  --color-bg-card: #ffffff;
  --color-text: #1a1a2e;
  --color-text-secondary: #6b7280;
  --color-primary: #6366f1;       /* indigo */
  --color-primary-hover: #4f46e5;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-border: #e5e7eb;
  --color-shadow: rgba(0,0,0,0.08);
  --radius: 8px;
  --radius-lg: 12px;
  --font-sans: 'Inter', system-ui, sans-serif;
  --transition: 0.2s ease;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-card: #1e293b;
  --color-text: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-border: #334155;
  --color-shadow: rgba(0,0,0,0.3);
}
```

Load Inter font from Google Fonts in every HTML file.

---

## Navigation Structure

Every page includes the shared navbar with these links:

| Label | URL |
|---|---|
| Home | `/index.html` |
| Inputs | `/pages/inputs.html` |
| Buttons | `/pages/buttons.html` |
| Checkboxes | `/pages/checkboxes.html` |
| Selects | `/pages/selects.html` |
| Forms | `/pages/forms.html` |
| Tables | `/pages/tables.html` |
| Alerts | `/pages/alerts.html` |
| Iframes | `/pages/iframes.html` |
| Drag & Drop | `/pages/dragdrop.html` |
| Hover | `/pages/hover.html` |
| Keyboard | `/pages/keyboard.html` |
| Scroll | `/pages/scroll.html` |
| Dynamic | `/pages/dynamic.html` |
| Tabs | `/pages/tabs.html` |
| Shadow DOM | `/pages/shadow-dom.html` |
| Network | `/pages/network.html` |
| Storage | `/pages/storage.html` |

Navbar also includes:
- `data-testid="theme-toggle"` button
- `data-testid="logout-btn"` — clears sessionStorage and redirects to login
- Active link highlighted based on current page

---

## Auth Guard

Add to the top of each page's TypeScript file:

```typescript
// Check auth on every protected page
if (!sessionStorage.getItem('loggedIn')) {
  window.location.href = '/login.html';
}
```

---

## Deployment Notes

For GitHub Pages:
1. Build: `npm run build`
2. Output folder: `dist/`
3. Push `dist/` to `gh-pages` branch
4. GitHub Pages serves from `gh-pages` branch
5. Base URL in vite config: `/qacanvas/` — update to match actual repo name

---

## Important Implementation Notes

1. **Every interactive element MUST have a `data-testid`** — no exceptions
2. All result/feedback elements must also have `data-testid`
3. Hidden elements should use CSS (`display: none` or `visibility: hidden`), not HTML `hidden` attribute — both work with Playwright but CSS is more realistic
4. Dynamic elements that don't exist yet should be injected into the DOM when triggered (not just toggled with CSS) — this forces use of `waitForSelector`
5. Iframes must use `srcdoc` — no external URLs
6. Shadow DOM must use `mode: 'open'`
7. The login page `/login.html` is the only unprotected page
8. Fake API calls on the Network page should use `fetch('/api/...')` exactly as specified — do not add base URL handling
9. Include a `README.md` with: project description, how to run (`npm run dev`), how to build, list of all pages with their URLs and what they test
