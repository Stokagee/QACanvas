import { init } from '../main';

init({ active: 'inputs' });

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
