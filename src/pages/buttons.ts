import { init } from '../main';

init({ active: 'buttons' });

// Click counter
const clickBtn = document.querySelector<HTMLButtonElement>('[data-testid="btn-click-counter"]')!;
const clickResult = document.querySelector<HTMLElement>('[data-testid="btn-click-result"]')!;
let clicks = 0;
clickBtn.addEventListener('click', () => {
  clicks += 1;
  clickResult.innerHTML = `Clicked: <strong>${clicks}</strong> ${clicks === 1 ? 'time' : 'times'}`;
});

// Double click
const dblBtn = document.querySelector<HTMLButtonElement>('[data-testid="btn-double-click"]')!;
const dblResult = document.querySelector<HTMLElement>('[data-testid="dbl-click-result"]')!;
dblBtn.addEventListener('dblclick', () => {
  dblResult.textContent = 'Double clicked!';
});

// Right click
const rcBtn = document.querySelector<HTMLButtonElement>('[data-testid="btn-right-click"]')!;
const rcResult = document.querySelector<HTMLElement>('[data-testid="right-click-result"]')!;
rcBtn.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  rcResult.textContent = 'Right clicked!';
});

// Dynamic toggle (START <-> STOP)
const toggleBtn = document.querySelector<HTMLButtonElement>('[data-testid="btn-dynamic-toggle"]')!;
const toggleState = document.querySelector<HTMLElement>('[data-testid="dynamic-btn-state"]')!;
toggleBtn.addEventListener('click', () => {
  const isStart = toggleBtn.textContent?.trim() === 'START';
  toggleBtn.textContent = isStart ? 'STOP' : 'START';
  toggleState.innerHTML = `State: <strong>${isStart ? 'running' : 'idle'}</strong>`;
});

// Loading button (2s)
const loadBtn = document.querySelector<HTMLButtonElement>('[data-testid="btn-loading"]')!;
const spinner = document.querySelector<HTMLElement>('[data-testid="loading-spinner"]')!;
const loadResult = document.querySelector<HTMLElement>('[data-testid="loading-result"]')!;
loadBtn.addEventListener('click', () => {
  loadBtn.disabled = true;
  spinner.classList.remove('hidden');
  loadResult.textContent = '—';
  setTimeout(() => {
    spinner.classList.add('hidden');
    loadResult.textContent = '✅ Task complete';
    loadBtn.disabled = false;
  }, 2000);
});

// Delayed button (appears after 3s)
const countdown = document.querySelector<HTMLElement>('[data-testid="delayed-countdown"]')!;
const slot = document.getElementById('delayed-slot')!;
let remaining = 3;
const interval = window.setInterval(() => {
  remaining -= 1;
  if (remaining > 0) {
    countdown.textContent = `Appears in ${remaining}s…`;
  } else {
    countdown.textContent = 'Here it is!';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn';
    btn.setAttribute('data-testid', 'btn-delayed');
    btn.textContent = 'I am delayed';
    btn.addEventListener('click', () => {
      btn.textContent = 'Clicked!';
    });
    slot.appendChild(btn);
    window.clearInterval(interval);
  }
}, 1000);
