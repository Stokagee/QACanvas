import { init } from '../main';

init({ active: 'hover' });

// Context menu
const rcArea = document.getElementById('rc-area')!;
const rcMenu = document.getElementById('rc-menu')!;
const rcResult = document.querySelector<HTMLElement>('[data-testid="context-menu-result"]')!;

rcArea.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const areaRect = rcArea.getBoundingClientRect();
  rcMenu.style.left = `${e.clientX - areaRect.left + window.scrollX}px`;
  rcMenu.style.top = `${e.clientY - areaRect.top + window.scrollY}px`;
  rcMenu.style.position = 'absolute';
  // place menu relative to area
  rcArea.appendChild(rcMenu);
  rcMenu.classList.remove('hidden');
});

document.addEventListener('click', (e) => {
  if (!rcMenu.contains(e.target as Node)) rcMenu.classList.add('hidden');
});

rcMenu.querySelectorAll<HTMLButtonElement>('button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const label = btn.textContent?.trim() || '';
    rcResult.innerHTML = `Last action: <strong>${label}</strong>`;
    rcMenu.classList.add('hidden');
  });
});

// Hover card action buttons (just feedback to confirm clicks work)
document
  .querySelector<HTMLButtonElement>('[data-testid="hover-card-edit-btn"]')
  ?.addEventListener('click', () => alert('Edit clicked'));
document
  .querySelector<HTMLButtonElement>('[data-testid="hover-card-delete-btn"]')
  ?.addEventListener('click', () => alert('Delete clicked'));
