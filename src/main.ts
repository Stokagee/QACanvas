/**
 * Shared bootstrap for protected pages.
 * Handles auth guard, theme persistence, navbar injection, footer, logout.
 */

const THEME_KEY = 'qacanvas-theme';
const AUTH_KEY = 'loggedIn';

const BASE = import.meta.env.BASE_URL;

export interface NavItem {
  label: string;
  href: string;
  key: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: 'index.html', key: 'home' },
  { label: 'Inputs', href: 'pages/inputs.html', key: 'inputs' },
  { label: 'Buttons', href: 'pages/buttons.html', key: 'buttons' },
  { label: 'Checkboxes', href: 'pages/checkboxes.html', key: 'checkboxes' },
  { label: 'Selects', href: 'pages/selects.html', key: 'selects' },
  { label: 'Forms', href: 'pages/forms.html', key: 'forms' },
  { label: 'Tables', href: 'pages/tables.html', key: 'tables' },
  { label: 'Alerts', href: 'pages/alerts.html', key: 'alerts' },
  { label: 'Iframes', href: 'pages/iframes.html', key: 'iframes' },
  { label: 'Drag & Drop', href: 'pages/dragdrop.html', key: 'dragdrop' },
  { label: 'Hover', href: 'pages/hover.html', key: 'hover' },
  { label: 'Keyboard', href: 'pages/keyboard.html', key: 'keyboard' },
  { label: 'Scroll', href: 'pages/scroll.html', key: 'scroll' },
  { label: 'Dynamic', href: 'pages/dynamic.html', key: 'dynamic' },
  { label: 'Tabs', href: 'pages/tabs.html', key: 'tabs' },
  { label: 'Shadow DOM', href: 'pages/shadow-dom.html', key: 'shadow-dom' },
  { label: 'Network', href: 'pages/network.html', key: 'network' },
  { label: 'Storage', href: 'pages/storage.html', key: 'storage' },
];

export function isLoggedIn(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function requireAuth(): boolean {
  if (!isLoggedIn()) {
    window.location.href = BASE + 'login.html';
    return false;
  }
  return true;
}

export function getTheme(): 'light' | 'dark' {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: 'light' | 'dark'): void {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem(THEME_KEY, theme);
}

export function toggleTheme(): void {
  applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

function buildNavbar(activeKey: string): string {
  const links = NAV_ITEMS.map((item) => {
    const href = BASE + item.href;
    const cls = item.key === activeKey ? 'active' : '';
    const dt = `nav-link-${item.key}`;
    return `<a href="${href}" class="${cls}" data-testid="${dt}">${item.label}</a>`;
  }).join('');

  return `
    <div class="navbar-inner">
      <a href="${BASE}index.html" class="navbar-brand" data-testid="navbar-brand">
        <span class="navbar-brand-dot"></span>
        QACanvas
      </a>
      <button
        type="button"
        class="navbar-toggle"
        data-testid="navbar-menu-toggle"
        aria-label="Toggle navigation"
      >☰</button>
      <nav class="navbar-links" data-testid="navbar-links">${links}</nav>
      <div class="navbar-actions">
        <button
          type="button"
          class="btn btn-ghost btn-icon"
          data-testid="theme-toggle"
          aria-label="Toggle theme"
          title="Toggle light/dark"
        >🌓</button>
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          data-testid="logout-btn"
        >Logout</button>
      </div>
    </div>
  `;
}

function buildFooter(): string {
  return `<span>QACanvas — Playwright practice playground · <code>v1.0.0</code></span>`;
}

export interface InitOptions {
  active: string;
}

export function init(options: InitOptions): void {
  if (!requireAuth()) return;

  applyTheme(getTheme());

  let header = document.querySelector('header.navbar') as HTMLElement | null;
  if (!header) {
    header = document.createElement('header');
    header.className = 'navbar';
    document.body.prepend(header);
  }
  header.setAttribute('data-testid', 'navbar');
  header.innerHTML = buildNavbar(options.active);

  let footer = document.querySelector('footer[data-testid="page-footer"]') as HTMLElement | null;
  if (!footer) {
    footer = document.createElement('footer');
    footer.setAttribute('data-testid', 'page-footer');
    document.body.appendChild(footer);
  }
  footer.innerHTML = buildFooter();

  header.querySelector('[data-testid="theme-toggle"]')?.addEventListener('click', () => {
    toggleTheme();
  });

  header.querySelector('[data-testid="logout-btn"]')?.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = BASE + 'login.html';
  });

  const toggle = header.querySelector('[data-testid="navbar-menu-toggle"]');
  const links = header.querySelector('[data-testid="navbar-links"]');
  toggle?.addEventListener('click', () => {
    links?.classList.toggle('is-open');
  });
}
