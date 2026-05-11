import { init } from '../main';

init({ active: 'tables' });

interface Employee {
  name: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  status: 'Active' | 'Inactive';
}

const EMPLOYEES: Employee[] = [
  { name: 'Alice Johnson', department: 'Engineering', position: 'Senior Dev', salary: 95000, startDate: '2020-03-15', status: 'Active' },
  { name: 'Bob Smith', department: 'Marketing', position: 'Manager', salary: 72000, startDate: '2019-07-22', status: 'Active' },
  { name: 'Carol White', department: 'Engineering', position: 'Junior Dev', salary: 58000, startDate: '2022-01-10', status: 'Active' },
  { name: 'David Brown', department: 'HR', position: 'Specialist', salary: 61000, startDate: '2021-05-18', status: 'Inactive' },
  { name: 'Eve Davis', department: 'Engineering', position: 'Lead Dev', salary: 110000, startDate: '2018-11-03', status: 'Active' },
  { name: 'Frank Wilson', department: 'Marketing', position: 'Analyst', salary: 65000, startDate: '2020-09-14', status: 'Active' },
  { name: 'Grace Lee', department: 'Finance', position: 'Accountant', salary: 70000, startDate: '2019-02-28', status: 'Active' },
  { name: 'Henry Taylor', department: 'HR', position: 'Director', salary: 90000, startDate: '2017-06-05', status: 'Inactive' },
  { name: 'Iris Martinez', department: 'Finance', position: 'Analyst', salary: 63000, startDate: '2021-11-20', status: 'Active' },
  { name: 'Jack Anderson', department: 'Engineering', position: 'Architect', salary: 125000, startDate: '2016-04-11', status: 'Active' },
];

// ---- Static table ----
const staticTbody = document.getElementById('static-tbody')!;
staticTbody.innerHTML = EMPLOYEES.map(
  (e, i) => `
  <tr data-testid="static-table-row-${i}">
    <td data-testid="static-table-cell-${i}-0">${e.name}</td>
    <td data-testid="static-table-cell-${i}-1">${e.department}</td>
    <td data-testid="static-table-cell-${i}-2">${e.position}</td>
    <td data-testid="static-table-cell-${i}-3">${e.salary.toLocaleString()}</td>
    <td data-testid="static-table-cell-${i}-4">${e.startDate}</td>
    <td data-testid="static-table-cell-${i}-5">
      <span class="badge ${e.status === 'Active' ? 'badge-success' : 'badge-danger'}">${e.status}</span>
    </td>
  </tr>`,
).join('');

// ---- Sortable table ----
type SortKey = 'name' | 'department' | 'salary';
let sortKey: SortKey | null = null;
let sortDir: 'asc' | 'desc' = 'asc';
const sortableBody = document.querySelector<HTMLElement>('[data-testid="sortable-table-body"]')!;

function renderSortable(): void {
  const rows = [...EMPLOYEES];
  if (sortKey) {
    rows.sort((a, b) => {
      const av = a[sortKey!];
      const bv = b[sortKey!];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }
  sortableBody.innerHTML = rows
    .map(
      (e) => `
    <tr>
      <td>${e.name}</td>
      <td>${e.department}</td>
      <td>${e.salary.toLocaleString()}</td>
      <td><span class="badge ${e.status === 'Active' ? 'badge-success' : 'badge-danger'}">${e.status}</span></td>
    </tr>`,
    )
    .join('');

  ['name', 'department', 'salary'].forEach((k) => {
    const indicator = document.querySelector<HTMLElement>(`[data-testid="sort-indicator-${k}"]`);
    if (!indicator) return;
    indicator.textContent = sortKey === k ? (sortDir === 'asc' ? '▲' : '▼') : '';
  });
}

document.querySelectorAll<HTMLElement>('th.sortable').forEach((th) => {
  th.addEventListener('click', () => {
    const key = th.dataset.key as SortKey;
    if (sortKey === key) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDir = 'asc';
    }
    renderSortable();
  });
});
renderSortable();

// ---- Filterable table ----
const filterSearch = document.querySelector<HTMLInputElement>('[data-testid="filter-table-search"]')!;
const filterDept = document.querySelector<HTMLSelectElement>('[data-testid="filter-table-dept"]')!;
const filterStatus = document.querySelector<HTMLSelectElement>('[data-testid="filter-table-status"]')!;
const filterBody = document.querySelector<HTMLElement>('[data-testid="filter-table-body"]')!;
const filterCount = document.querySelector<HTMLElement>('[data-testid="filter-table-results-count"]')!;
const filterEmpty = document.querySelector<HTMLElement>('[data-testid="filter-no-results"]')!;

function renderFiltered(): void {
  const q = filterSearch.value.trim().toLowerCase();
  const dept = filterDept.value;
  const status = filterStatus.value;
  const rows = EMPLOYEES.filter((e) => {
    if (dept && e.department !== dept) return false;
    if (status && e.status !== status) return false;
    if (q) {
      const hay = `${e.name} ${e.department} ${e.position} ${e.salary} ${e.startDate} ${e.status}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  filterCount.textContent = `Showing ${rows.length} of ${EMPLOYEES.length}`;
  if (rows.length === 0) {
    filterBody.innerHTML = '';
    filterEmpty.classList.remove('hidden');
  } else {
    filterEmpty.classList.add('hidden');
    filterBody.innerHTML = rows
      .map(
        (e) => `
      <tr>
        <td>${e.name}</td>
        <td>${e.department}</td>
        <td>${e.position}</td>
        <td>${e.salary.toLocaleString()}</td>
        <td><span class="badge ${e.status === 'Active' ? 'badge-success' : 'badge-danger'}">${e.status}</span></td>
      </tr>`,
      )
      .join('');
  }
}

[filterSearch, filterDept, filterStatus].forEach((el) =>
  el.addEventListener('input', renderFiltered),
);
filterDept.addEventListener('change', renderFiltered);
filterStatus.addEventListener('change', renderFiltered);
renderFiltered();

// ---- Paginated table ----
let page = 1;
let perPage = 3;
const pagedBody = document.querySelector<HTMLElement>('[data-testid="paged-table-body"]')!;
const pageInfo = document.querySelector<HTMLElement>('[data-testid="paged-table-page-info"]')!;
const pagedFirst = document.querySelector<HTMLButtonElement>('[data-testid="paged-table-first"]')!;
const pagedPrev = document.querySelector<HTMLButtonElement>('[data-testid="paged-table-prev"]')!;
const pagedNext = document.querySelector<HTMLButtonElement>('[data-testid="paged-table-next"]')!;
const pagedLast = document.querySelector<HTMLButtonElement>('[data-testid="paged-table-last"]')!;
const pagedSelect = document.querySelector<HTMLSelectElement>('[data-testid="paged-rows-select"]')!;

function renderPaged(): void {
  const totalPages = Math.max(1, Math.ceil(EMPLOYEES.length / perPage));
  if (page > totalPages) page = totalPages;
  const start = (page - 1) * perPage;
  const slice = EMPLOYEES.slice(start, start + perPage);
  pagedBody.innerHTML = slice
    .map(
      (e) => `
    <tr>
      <td>${e.name}</td>
      <td>${e.department}</td>
      <td>${e.position}</td>
      <td><span class="badge ${e.status === 'Active' ? 'badge-success' : 'badge-danger'}">${e.status}</span></td>
    </tr>`,
    )
    .join('');
  pageInfo.textContent = `Page ${page} of ${totalPages}`;
  pagedFirst.disabled = page === 1;
  pagedPrev.disabled = page === 1;
  pagedNext.disabled = page === totalPages;
  pagedLast.disabled = page === totalPages;
}

pagedFirst.addEventListener('click', () => {
  page = 1;
  renderPaged();
});
pagedPrev.addEventListener('click', () => {
  page = Math.max(1, page - 1);
  renderPaged();
});
pagedNext.addEventListener('click', () => {
  page += 1;
  renderPaged();
});
pagedLast.addEventListener('click', () => {
  page = Math.ceil(EMPLOYEES.length / perPage);
  renderPaged();
});
pagedSelect.addEventListener('change', () => {
  perPage = Number(pagedSelect.value) || 3;
  page = 1;
  renderPaged();
});
renderPaged();

// ---- Dynamic table ----
const dynBody = document.querySelector<HTMLElement>('[data-testid="dynamic-table-body"]')!;
const dynStatus = document.querySelector<HTMLElement>('[data-testid="dynamic-table-status"]')!;
const dynReload = document.querySelector<HTMLButtonElement>('[data-testid="dynamic-table-reload"]')!;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderDynamic(): void {
  const rows = shuffle(EMPLOYEES);
  dynBody.innerHTML = rows
    .map(
      (e) => `
    <tr>
      <td>${e.name}</td>
      <td>${e.department}</td>
      <td>${e.salary.toLocaleString()}</td>
    </tr>`,
    )
    .join('');
}

dynReload.addEventListener('click', () => {
  dynStatus.textContent = 'Loading…';
  dynReload.disabled = true;
  setTimeout(() => {
    renderDynamic();
    dynStatus.textContent = 'Loaded';
    dynReload.disabled = false;
  }, 600);
});
renderDynamic();
