import { init } from '../main';

init({ active: 'network' });

const $ = <T extends HTMLElement>(testid: string): T =>
  document.querySelector<T>(`[data-testid="${testid}"]`)!;

const status = $('api-status-display');
const loading = $('api-loading-indicator');
const display = $('api-response-display');
const counter = $('request-count-display');
let count = 0;

function bumpCount(): void {
  count += 1;
  counter.innerHTML = `Requests made: <strong>${count}</strong>`;
}

async function call(url: string, init?: RequestInit): Promise<void> {
  status.textContent = '…';
  status.className = 'badge';
  loading.classList.remove('hidden');
  display.textContent = '';
  bumpCount();
  try {
    const res = await fetch(url, init);
    const text = await res.text();
    let body: unknown = text;
    try {
      body = JSON.parse(text);
    } catch {
      // not JSON, keep as text
    }
    status.textContent = `${res.status} ${res.statusText || ''}`.trim();
    status.className = `badge ${res.ok ? 'badge-success' : 'badge-danger'}`;
    display.textContent =
      typeof body === 'string' ? body || '(empty body)' : JSON.stringify(body, null, 2);
  } catch (err) {
    status.textContent = 'Network error';
    status.className = 'badge badge-danger';
    display.textContent = `Fetch failed: ${
      err instanceof Error ? err.message : String(err)
    }\n\nNote: in a real browser this URL is not routed, so this is expected. Use Playwright's page.route() to intercept.`;
  } finally {
    loading.classList.add('hidden');
  }
}

$<HTMLButtonElement>('fetch-users-btn').addEventListener('click', () => call('/api/users'));
$<HTMLButtonElement>('fetch-products-btn').addEventListener('click', () =>
  call('/api/products'),
);
$<HTMLButtonElement>('fetch-login-btn').addEventListener('click', () =>
  call('/api/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  }),
);
$<HTMLButtonElement>('fetch-slow-btn').addEventListener('click', () => call('/api/slow'));
$<HTMLButtonElement>('fetch-error-btn').addEventListener('click', () => call('/api/error'));

$<HTMLButtonElement>('reset-counter-btn').addEventListener('click', () => {
  count = 0;
  counter.innerHTML = 'Requests made: <strong>0</strong>';
});
