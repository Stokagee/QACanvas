import { init } from '../main';

init({ active: 'inputs' });

// 234-character limit warning
const CHAR_LIMIT = 234;

function attachLimitWarning(
  input: HTMLInputElement | HTMLTextAreaElement,
  msgEl: HTMLElement
): void {
  input.addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (input.value.length >= CHAR_LIMIT && ke.key.length === 1 && !ke.ctrlKey && !ke.metaKey) {
      msgEl.classList.add('visible');
    }
  });
  input.addEventListener('input', () => {
    if (input.value.length < CHAR_LIMIT) {
      msgEl.classList.remove('visible');
    }
  });
}

const limitPairs: Array<[string, string]> = [
  ['input-text', 'input-text-limit-msg'],
  ['input-aria-label', 'input-aria-label-limit-msg'],
  ['input-email', 'input-email-limit-msg'],
  ['input-placeholder', 'input-placeholder-limit-msg'],
  ['input-password', 'input-password-limit-msg'],
  ['input-tel', 'input-tel-limit-msg'],
  ['input-url', 'input-url-limit-msg'],
  ['textarea-basic', 'textarea-basic-limit-msg'],
  ['input-search', 'input-search-limit-msg'],
  ['input-datalist', 'input-datalist-limit-msg'],
];

for (const [inputId, msgId] of limitPairs) {
  const inputEl = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    `[data-testid="${inputId}"]`
  )!;
  const msgEl = document.querySelector<HTMLElement>(`[data-testid="${msgId}"]`)!;
  attachLimitWarning(inputEl, msgEl);
}

// Character-type validation helpers
function isNavKey(key: string): boolean {
  return [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    'Tab', 'Home', 'End', 'Enter', 'Escape',
  ].includes(key);
}

// Number input — digits and decimal separator only (blocks e, E, -, +)
const numberInput = document.querySelector<HTMLInputElement>('[data-testid="input-number"]')!;

numberInput.addEventListener('keydown', (e) => {
  const ke = e as KeyboardEvent;
  if (ke.ctrlKey || ke.metaKey || isNavKey(ke.key)) return;
  if (/^[0-9.,]$/.test(ke.key)) return;
  ke.preventDefault();
});

numberInput.addEventListener('paste', (e) => {
  const text = (e as ClipboardEvent).clipboardData?.getData('text') ?? '';
  if (!/^[0-9.,]*$/.test(text)) e.preventDefault();
});

// Tel input — + only at position 0, then digits only
const telInput = document.querySelector<HTMLInputElement>('[data-testid="input-tel"]')!;

telInput.addEventListener('keydown', (e) => {
  const ke = e as KeyboardEvent;
  if (ke.ctrlKey || ke.metaKey || isNavKey(ke.key)) return;
  if (/^[0-9]$/.test(ke.key)) return;
  if (ke.key === '+' && (telInput.selectionStart ?? 0) === 0 && !telInput.value.startsWith('+')) return;
  ke.preventDefault();
});

telInput.addEventListener('input', () => {
  const v = telInput.value;
  const cleaned = v.replace(/[^+0-9]/g, '').replace(/(?!^)\+/g, '');
  if (v !== cleaned) {
    const pos = telInput.selectionStart ?? cleaned.length;
    telInput.value = cleaned;
    telInput.setSelectionRange(pos, pos);
  }
});

// Textarea char counter
const ta = document.querySelector<HTMLTextAreaElement>('[data-testid="textarea-max-length"]')!;
const counter = document.querySelector<HTMLElement>('[data-testid="textarea-counter"]')!;
const max = Number(ta.getAttribute('maxlength')) || 100;
ta.addEventListener('input', () => {
  counter.textContent = `${ta.value.length} / ${max} characters`;
});

// Range
const range = document.querySelector<HTMLInputElement>('[data-testid="input-range"]')!;
const rangeDisplay = document.querySelector<HTMLElement>('[data-testid="range-value-display"]')!;
range.addEventListener('input', () => {
  rangeDisplay.textContent = range.value;
});

// Color
const color = document.querySelector<HTMLInputElement>('[data-testid="input-color"]')!;
const colorDisplay = document.querySelector<HTMLElement>('[data-testid="color-value-display"]')!;
color.addEventListener('input', () => {
  colorDisplay.textContent = color.value;
});

// Search
const searchData = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
];
const search = document.querySelector<HTMLInputElement>('[data-testid="input-search"]')!;
const searchClear = document.querySelector<HTMLButtonElement>('[data-testid="search-clear-btn"]')!;
const searchCount = document.querySelector<HTMLElement>('[data-testid="search-result-count"]')!;
const searchList = document.getElementById('search-list')!;

function renderSearch(): void {
  const q = search.value.trim().toLowerCase();
  const matches = searchData.filter((item) => item.toLowerCase().includes(q));
  searchList.innerHTML = matches.map((m) => `<li>${m}</li>`).join('');
  searchCount.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'}`;
}

search.addEventListener('input', renderSearch);
searchClear.addEventListener('click', () => {
  search.value = '';
  renderSearch();
});
renderSearch();
