import { init } from '../main';

init({ active: 'dragdrop' });

// ---- 1. Drag between two lists ----
const AVAIL = ['a', 'b', 'c', 'd', 'e'];
const availList = document.getElementById('dnd-available')!;
const selectedList = document.getElementById('dnd-selected')!;
const availCount = document.querySelector<HTMLElement>('[data-testid="dnd-available-count"]')!;
const selectedCount = document.querySelector<HTMLElement>('[data-testid="dnd-selected-count"]')!;

function renderDndLists(available: string[], selected: string[]): void {
  const make = (k: string) => `
    <div class="dnd-item" draggable="true" data-testid="dnd-item-${k}" data-id="${k}">
      Item ${k.toUpperCase()}
    </div>`;
  availList.innerHTML = available.map(make).join('');
  selectedList.innerHTML = selected.map(make).join('');
  availCount.textContent = `Available: ${available.length}`;
  selectedCount.textContent = `Selected: ${selected.length}`;
  attachDndItemHandlers();
}

let availItems = [...AVAIL];
let selectedItems: string[] = [];

function attachDndItemHandlers(): void {
  document
    .querySelectorAll<HTMLElement>('.dnd-item')
    .forEach((el) => {
      el.addEventListener('dragstart', (e) => {
        el.classList.add('dragging');
        (e.dataTransfer as DataTransfer).setData('text/plain', el.dataset.id || '');
        (e.dataTransfer as DataTransfer).effectAllowed = 'move';
      });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
    });
}

[availList, selectedList].forEach((zone) => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('drag-over');
    (e.dataTransfer as DataTransfer).dropEffect = 'move';
  });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const id = (e.dataTransfer as DataTransfer).getData('text/plain');
    if (!id) return;
    if (zone === selectedList && availItems.includes(id)) {
      availItems = availItems.filter((x) => x !== id);
      selectedItems.push(id);
    } else if (zone === availList && selectedItems.includes(id)) {
      selectedItems = selectedItems.filter((x) => x !== id);
      availItems.push(id);
    }
    renderDndLists(availItems, selectedItems);
  });
});

renderDndLists(availItems, selectedItems);

// ---- 2. Reorderable list ----
const sortableList = document.getElementById('sortable-list')!;
const orderDisplay = document.querySelector<HTMLElement>('[data-testid="sortable-order-display"]')!;
let dragSrc: HTMLElement | null = null;

function updateOrderDisplay(): void {
  const ids = Array.from(sortableList.children).map(
    (li) => (li as HTMLElement).dataset.id || '?',
  );
  orderDisplay.innerHTML = `Order: <strong>${ids.join(',')}</strong>`;
}

sortableList.querySelectorAll<HTMLElement>('li').forEach((li) => {
  li.addEventListener('dragstart', () => {
    dragSrc = li;
    li.classList.add('dragging');
  });
  li.addEventListener('dragend', () => li.classList.remove('dragging'));
  li.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!dragSrc || dragSrc === li) return;
    const rect = li.getBoundingClientRect();
    const before = e.clientY < rect.top + rect.height / 2;
    if (before) {
      sortableList.insertBefore(dragSrc, li);
    } else {
      sortableList.insertBefore(dragSrc, li.nextSibling);
    }
  });
  li.addEventListener('drop', (e) => {
    e.preventDefault();
    updateOrderDisplay();
  });
});

// ---- 3. Drop zone ----
const dropZone = document.getElementById('drop-zone')!;
const dropCount = document.querySelector<HTMLElement>('[data-testid="drop-zone-count"]')!;
const resetBtn = document.querySelector<HTMLButtonElement>('[data-testid="dnd-reset-btn"]')!;

let dropped = 0;

document.querySelectorAll<HTMLElement>('.draggable-card').forEach((card) => {
  card.addEventListener('dragstart', (e) => {
    (e.dataTransfer as DataTransfer).setData('text/plain', card.dataset.id || '');
  });
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const id = (e.dataTransfer as DataTransfer).getData('text/plain');
  const card = document.querySelector<HTMLElement>(`[data-testid="draggable-card-${id}"]`);
  if (card && !card.classList.contains('dropped')) {
    card.classList.add('dropped');
    card.setAttribute('draggable', 'false');
    dropped += 1;
    dropCount.innerHTML = `Dropped: <strong>${dropped}</strong> items`;
  }
});

resetBtn.addEventListener('click', () => {
  dropped = 0;
  dropCount.innerHTML = 'Dropped: <strong>0</strong> items';
  document.querySelectorAll<HTMLElement>('.draggable-card').forEach((c) => {
    c.classList.remove('dropped');
    c.setAttribute('draggable', 'true');
  });
  availItems = [...AVAIL];
  selectedItems = [];
  renderDndLists(availItems, selectedItems);
});
