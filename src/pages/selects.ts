import { init } from '../main';

init({ active: 'selects' });

// Native single
const country = document.querySelector<HTMLSelectElement>('[data-testid="select-country"]')!;
const countryResult = document.querySelector<HTMLElement>('[data-testid="select-country-result"]')!;
country.addEventListener('change', () => {
  countryResult.innerHTML = `Selected: <strong>${country.value || '—'}</strong>`;
});

// Native multi
const colors = document.querySelector<HTMLSelectElement>('[data-testid="select-colors"]')!;
const colorsResult = document.querySelector<HTMLElement>('[data-testid="select-colors-result"]')!;
colors.addEventListener('change', () => {
  const selected = Array.from(colors.selectedOptions).map((o) => o.value);
  colorsResult.innerHTML = `Selected: <strong>${selected.length ? selected.join(', ') : 'none'}</strong>`;
});

// Custom dropdown
const trigger = document.querySelector<HTMLButtonElement>('[data-testid="custom-dropdown-trigger"]')!;
const list = document.querySelector<HTMLElement>('[data-testid="custom-dropdown-list"]')!;
const selectedLabel = document.querySelector<HTMLElement>('[data-testid="custom-dropdown-selected"]')!;

function closeCustom(): void {
  list.classList.add('hidden');
  trigger.setAttribute('aria-expanded', 'false');
}

function openCustom(): void {
  list.classList.remove('hidden');
  trigger.setAttribute('aria-expanded', 'true');
}

trigger.addEventListener('click', (e) => {
  e.stopPropagation();
  list.classList.contains('hidden') ? openCustom() : closeCustom();
});

list.querySelectorAll<HTMLButtonElement>('button[data-value]').forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedLabel.textContent = btn.dataset.value || '';
    closeCustom();
  });
});

document.addEventListener('click', (e) => {
  if (!list.contains(e.target as Node) && e.target !== trigger) closeCustom();
});

// Searchable dropdown
const CITIES = [
  'Prague',
  'Berlin',
  'Paris',
  'London',
  'Madrid',
  'Rome',
  'Vienna',
  'Warsaw',
  'Amsterdam',
  'Brussels',
  'New York',
  'Los Angeles',
  'Chicago',
  'Tokyo',
  'Seoul',
  'Sydney',
  'Toronto',
  'Dubai',
  'Singapore',
  'Cairo',
];

const searchInput = document.querySelector<HTMLInputElement>('[data-testid="searchable-dropdown-input"]')!;
const searchList = document.querySelector<HTMLElement>('[data-testid="searchable-dropdown-list"]')!;
const searchResult = document.querySelector<HTMLElement>('[data-testid="searchable-dropdown-result"]')!;

function renderCities(): void {
  const q = searchInput.value.trim().toLowerCase();
  const matches = CITIES.filter((c) => c.toLowerCase().includes(q));
  if (matches.length === 0) {
    searchList.innerHTML = `<div data-testid="searchable-dropdown-no-results" style="padding: 8px 12px; color: var(--color-text-secondary)">No matches</div>`;
  } else {
    searchList.innerHTML = matches
      .map((c) => `<button type="button" data-value="${c}">${c}</button>`)
      .join('');
    searchList.querySelectorAll<HTMLButtonElement>('button[data-value]').forEach((btn) => {
      btn.addEventListener('click', () => {
        searchInput.value = btn.dataset.value || '';
        searchResult.innerHTML = `Selected: <strong>${btn.dataset.value}</strong>`;
        searchList.classList.add('hidden');
      });
    });
  }
  searchList.classList.remove('hidden');
}

searchInput.addEventListener('focus', renderCities);
searchInput.addEventListener('input', renderCities);

document.addEventListener('click', (e) => {
  if (!searchList.contains(e.target as Node) && e.target !== searchInput) {
    searchList.classList.add('hidden');
  }
});

// Cascading dropdowns
const REGIONS: Record<string, string[]> = {
  USA: ['California', 'Texas', 'New York', 'Florida'],
  Germany: ['Bavaria', 'Berlin', 'Hamburg'],
  CzechRepublic: ['Prague', 'Brno', 'Ostrava'],
};

const cascadeCountry = document.querySelector<HTMLSelectElement>('[data-testid="cascade-country"]')!;
const cascadeRegion = document.querySelector<HTMLSelectElement>('[data-testid="cascade-region"]')!;
const cascadeResult = document.querySelector<HTMLElement>('[data-testid="cascade-result"]')!;

function refreshCascade(): void {
  const value = cascadeCountry.value;
  if (!value) {
    cascadeRegion.innerHTML = '<option value="">-- Select country first --</option>';
    cascadeRegion.disabled = true;
  } else {
    const list = REGIONS[value] || [];
    cascadeRegion.innerHTML =
      '<option value="">-- Select --</option>' +
      list.map((r) => `<option value="${r}">${r}</option>`).join('');
    cascadeRegion.disabled = false;
  }
  cascadeResult.innerHTML = `Selection: <strong>—</strong>`;
}

cascadeCountry.addEventListener('change', refreshCascade);
cascadeRegion.addEventListener('change', () => {
  if (cascadeRegion.value) {
    cascadeResult.innerHTML = `Selection: <strong>${cascadeCountry.options[cascadeCountry.selectedIndex].text} → ${cascadeRegion.value}</strong>`;
  }
});
