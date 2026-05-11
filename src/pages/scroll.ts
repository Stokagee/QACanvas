import { init } from '../main';

init({ active: 'scroll' });

// ---- 1. Scroll to element ----
const scrollTo = (testid: string) =>
  document
    .querySelector<HTMLElement>(`[data-testid="${testid}"]`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

document
  .querySelector<HTMLButtonElement>('[data-testid="scroll-to-top-btn"]')!
  .addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document
  .querySelector<HTMLButtonElement>('[data-testid="scroll-to-section-2-btn"]')!
  .addEventListener('click', () => scrollTo('scroll-section-2'));

document
  .querySelector<HTMLButtonElement>('[data-testid="scroll-to-section-5-btn"]')!
  .addEventListener('click', () => scrollTo('scroll-section-5'));

document
  .querySelector<HTMLButtonElement>('[data-testid="scroll-to-bottom-btn"]')!
  .addEventListener('click', () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
  );

// ---- 2. Infinite scroll ----
const MAX = 50;
const PER_LOAD = 10;
const list = document.getElementById('infinite-list')!;
const loadingEl = document.querySelector<HTMLElement>('[data-testid="infinite-scroll-loading"]')!;
const endEl = document.querySelector<HTMLElement>('[data-testid="infinite-scroll-end"]')!;
const countEl = document.querySelector<HTMLElement>('[data-testid="infinite-scroll-count"]')!;
let count = 0;
let loading = false;

function appendItems(n: number): void {
  const start = count + 1;
  const end = Math.min(MAX, count + n);
  const items: string[] = [];
  for (let i = start; i <= end; i += 1) {
    items.push(
      `<li data-testid="infinite-scroll-item-${i}">Item ${i} — generated content</li>`,
    );
  }
  list.insertAdjacentHTML('beforeend', items.join(''));
  count = end;
  countEl.textContent = `Showing ${count} items`;
  if (count >= MAX) {
    endEl.classList.remove('hidden');
  }
}

appendItems(PER_LOAD);

list.addEventListener('scroll', () => {
  if (loading || count >= MAX) return;
  const remaining = list.scrollHeight - list.scrollTop - list.clientHeight;
  if (remaining < 40) {
    loading = true;
    loadingEl.classList.remove('hidden');
    setTimeout(() => {
      appendItems(PER_LOAD);
      loadingEl.classList.add('hidden');
      loading = false;
    }, 500);
  }
});

// ---- 3. Sticky bar ----
const stickyBar = document.getElementById('sticky-bar')!;
const stickyStatus = document.querySelector<HTMLElement>('[data-testid="sticky-status"]')!;
const stickyOriginalTop = stickyBar.getBoundingClientRect().top + window.scrollY;

function updateSticky(): void {
  const stuck = window.scrollY > stickyOriginalTop;
  stickyBar.classList.toggle('is-stuck', stuck);
  stickyStatus.innerHTML = `Sticky: <strong>${stuck ? 'yes' : 'no'}</strong>`;
}

// ---- 4. Scroll position tracker ----
const posDisplay = document.querySelector<HTMLElement>('[data-testid="scroll-position-display"]')!;
const percentDisplay = document.querySelector<HTMLElement>(
  '[data-testid="scroll-percent-display"]',
)!;

function updateScrollDisplay(): void {
  const y = Math.round(window.scrollY);
  posDisplay.innerHTML = `Scroll Y: <strong>${y}px</strong>`;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const pct = Math.round((window.scrollY / maxScroll) * 100);
  percentDisplay.innerHTML = `<strong>${pct}%</strong> of page`;
}

window.addEventListener('scroll', () => {
  updateSticky();
  updateScrollDisplay();
});
updateScrollDisplay();
updateSticky();
