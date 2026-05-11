import { init } from '../main';

init({ active: 'storage' });

const $ = <T extends HTMLElement>(testid: string): T =>
  document.querySelector<T>(`[data-testid="${testid}"]`)!;

// ---- localStorage ----
const lsKey = $<HTMLInputElement>('ls-key-input');
const lsVal = $<HTMLInputElement>('ls-value-input');
const lsResult = $('ls-result');
const lsItems = $('ls-all-items');

function renderLsItems(): void {
  const rows: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const k = localStorage.key(i)!;
    const v = localStorage.getItem(k) ?? '';
    rows.push(
      `<tr><td><code>${k}</code></td><td><code>${escapeHtml(v)}</code></td></tr>`,
    );
  }
  lsItems.innerHTML = rows.length
    ? rows.join('')
    : '<tr><td colspan="2" style="color: var(--color-text-secondary); text-align: center">No items</td></tr>';
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c] as string);
}

$<HTMLButtonElement>('ls-set-btn').addEventListener('click', () => {
  if (!lsKey.value) {
    lsResult.textContent = 'Key required';
    return;
  }
  localStorage.setItem(lsKey.value, lsVal.value);
  lsResult.textContent = `Set ${lsKey.value} = ${lsVal.value}`;
  renderLsItems();
});

$<HTMLButtonElement>('ls-get-btn').addEventListener('click', () => {
  const v = localStorage.getItem(lsKey.value);
  lsResult.textContent = v === null ? `Key "${lsKey.value}" not found` : `Got: ${v}`;
});

$<HTMLButtonElement>('ls-remove-btn').addEventListener('click', () => {
  localStorage.removeItem(lsKey.value);
  lsResult.textContent = `Removed key "${lsKey.value}"`;
  renderLsItems();
});

$<HTMLButtonElement>('ls-clear-btn').addEventListener('click', () => {
  localStorage.clear();
  lsResult.textContent = 'Cleared all localStorage';
  renderLsItems();
});

renderLsItems();

// ---- sessionStorage ----
const ssKey = $<HTMLInputElement>('ss-key-input');
const ssVal = $<HTMLInputElement>('ss-value-input');
const ssResult = $('ss-result');

$<HTMLButtonElement>('ss-set-btn').addEventListener('click', () => {
  if (!ssKey.value) {
    ssResult.textContent = 'Key required';
    return;
  }
  sessionStorage.setItem(ssKey.value, ssVal.value);
  ssResult.textContent = `Set ${ssKey.value} = ${ssVal.value}`;
});

$<HTMLButtonElement>('ss-get-btn').addEventListener('click', () => {
  const v = sessionStorage.getItem(ssKey.value);
  ssResult.textContent = v === null ? `Key "${ssKey.value}" not found` : `Got: ${v}`;
});

// ---- Cookies ----
const cookieName = $<HTMLInputElement>('cookie-name-input');
const cookieValue = $<HTMLInputElement>('cookie-value-input');
const cookieResult = $('cookie-result');
const cookieAll = $('cookie-all-display');

function renderCookies(): void {
  const all = document.cookie;
  cookieAll.textContent = all || 'No cookies';
}

$<HTMLButtonElement>('cookie-set-btn').addEventListener('click', () => {
  if (!cookieName.value) {
    cookieResult.textContent = 'Name required';
    return;
  }
  document.cookie = `${encodeURIComponent(cookieName.value)}=${encodeURIComponent(cookieValue.value)}; path=/; max-age=86400`;
  cookieResult.textContent = `Set ${cookieName.value}`;
  renderCookies();
});

$<HTMLButtonElement>('cookie-get-btn').addEventListener('click', () => {
  const m = document.cookie.match(
    new RegExp('(?:^|; )' + encodeURIComponent(cookieName.value) + '=([^;]*)'),
  );
  cookieResult.textContent = m
    ? `Got: ${decodeURIComponent(m[1])}`
    : `Cookie "${cookieName.value}" not found`;
});

$<HTMLButtonElement>('cookie-delete-btn').addEventListener('click', () => {
  document.cookie = `${encodeURIComponent(cookieName.value)}=; path=/; max-age=0`;
  cookieResult.textContent = `Deleted ${cookieName.value}`;
  renderCookies();
});

renderCookies();

// ---- Persistence ----
const PERSIST_KEY = 'qacanvas-persist';
const persistInput = $<HTMLInputElement>('persist-input');
const persistResult = $('persist-result');

const persisted = localStorage.getItem(PERSIST_KEY);
persistResult.innerHTML = `On load: <strong>${persisted ?? '—'}</strong>`;

$<HTMLButtonElement>('persist-save-btn').addEventListener('click', () => {
  localStorage.setItem(PERSIST_KEY, persistInput.value);
  persistResult.innerHTML = `Saved: <strong>${persistInput.value}</strong> (reload to verify)`;
  renderLsItems();
});

$<HTMLButtonElement>('persist-reload-btn').addEventListener('click', () => {
  window.location.reload();
});
