import { init } from '../main';

init({ active: 'keyboard' });

const $ = <T extends HTMLElement>(testid: string): T =>
  document.querySelector<T>(`[data-testid="${testid}"]`)!;

// ---- 1. Key press logger ----
const kpInput = $<HTMLInputElement>('keypress-input');
const kpLog = $('keypress-log');
const kpCount = $('keypress-count');
const kpClear = $<HTMLButtonElement>('keypress-clear');
let total = 0;

kpInput.addEventListener('keydown', (e) => {
  total += 1;
  kpLog.innerHTML = `Last key: <strong>${e.key}</strong>`;
  kpCount.textContent = `Total: ${total}`;
});

kpClear.addEventListener('click', () => {
  total = 0;
  kpInput.value = '';
  kpLog.innerHTML = 'Last key: <strong>—</strong>';
  kpCount.textContent = 'Total: 0';
});

// ---- 2. Shortcuts ----
const shortcutArea = $('shortcut-focus-area');
const saveResult = $('shortcut-save-result');
const undoResult = $('shortcut-undo-result');
const openPanelBtn = $<HTMLButtonElement>('shortcut-open-panel-btn');
const panel = $('shortcut-panel');

shortcutArea.addEventListener('keydown', (e) => {
  const ke = e as KeyboardEvent;
  if ((ke.ctrlKey || ke.metaKey) && ke.key.toLowerCase() === 's') {
    ke.preventDefault();
    saveResult.textContent = 'Saved!';
  } else if ((ke.ctrlKey || ke.metaKey) && ke.key.toLowerCase() === 'z') {
    ke.preventDefault();
    undoResult.textContent = 'Undone!';
  } else if (ke.key === 'Escape') {
    panel.classList.add('hidden');
  }
});

openPanelBtn.addEventListener('click', () => {
  panel.classList.remove('hidden');
  shortcutArea.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !panel.classList.contains('hidden')) {
    panel.classList.add('hidden');
  }
});

// ---- 3. Tab order indicator ----
const focusIndicator = $('tab-focus-indicator');
document.querySelectorAll<HTMLInputElement>('.tab-form input').forEach((inp) => {
  inp.addEventListener('focus', () => {
    const id = inp.getAttribute('data-testid')?.replace('tab-', '') || '';
    focusIndicator.innerHTML = `Currently focused: <strong>${id}</strong>`;
  });
  inp.addEventListener('blur', () => {
    focusIndicator.innerHTML = 'Currently focused: <strong>none</strong>';
  });
});

// ---- 4. Arrow navigation ----
const arrowList = $<HTMLUListElement>('arrow-nav-list');
const arrowItems = Array.from(arrowList.querySelectorAll<HTMLElement>('li'));
const arrowSelected = $('arrow-nav-selected');
let arrowIdx = 0;

function renderArrowSelection(): void {
  arrowItems.forEach((it, i) => it.classList.toggle('selected', i === arrowIdx));
  arrowSelected.innerHTML = `Selected: <strong>${arrowItems[arrowIdx].textContent}</strong>`;
}

arrowList.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    arrowIdx = Math.min(arrowItems.length - 1, arrowIdx + 1);
    renderArrowSelection();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    arrowIdx = Math.max(0, arrowIdx - 1);
    renderArrowSelection();
  }
});

arrowItems.forEach((it, i) => {
  it.addEventListener('click', () => {
    arrowIdx = i;
    renderArrowSelection();
    arrowList.focus();
  });
});

renderArrowSelection();
