import { init } from '../main';

init({ active: 'checkboxes' });

// Check-all group
const checkAll = document.querySelector<HTMLInputElement>('[data-testid="checkbox-check-all"]')!;
const fruitItems = Array.from(
  document.querySelectorAll<HTMLInputElement>('.fruit-item'),
);
const checkedCount = document.querySelector<HTMLElement>('[data-testid="checked-count-display"]')!;

function updateCheckedCount(): void {
  const n = fruitItems.filter((c) => c.checked).length;
  checkedCount.innerHTML = `Selected: <strong>${n} / ${fruitItems.length}</strong>`;
  checkAll.checked = n === fruitItems.length;
  checkAll.indeterminate = n > 0 && n < fruitItems.length;
}

checkAll.addEventListener('change', () => {
  fruitItems.forEach((c) => (c.checked = checkAll.checked));
  updateCheckedCount();
});
fruitItems.forEach((c) => c.addEventListener('change', updateCheckedCount));
updateCheckedCount();

// Indeterminate parent
const parent = document.querySelector<HTMLInputElement>('[data-testid="checkbox-parent"]')!;
const children = Array.from(
  document.querySelectorAll<HTMLInputElement>('.indet-child'),
);

function syncParent(): void {
  const n = children.filter((c) => c.checked).length;
  parent.checked = n === children.length;
  parent.indeterminate = n > 0 && n < children.length;
}

parent.addEventListener('change', () => {
  children.forEach((c) => (c.checked = parent.checked));
  parent.indeterminate = false;
});
children.forEach((c) => c.addEventListener('change', syncParent));
syncParent();

// Radio groups
function bindRadio(name: string, resultSelector: string): void {
  const result = document.querySelector<HTMLElement>(resultSelector)!;
  const radios = document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`);
  radios.forEach((r) =>
    r.addEventListener('change', () => {
      if (r.checked) result.innerHTML = `Selected: <strong>${r.value}</strong>`;
    }),
  );
}
bindRadio('gender', '[data-testid="radio-gender-result"]');
bindRadio('priority', '[data-testid="radio-priority-result"]');
