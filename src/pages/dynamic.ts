import { init } from '../main';

init({ active: 'dynamic' });

const $ = <T extends HTMLElement>(testid: string): T =>
  document.querySelector<T>(`[data-testid="${testid}"]`)!;

// ---- 1. Element appears after delay ----
const delayBtn = $<HTMLButtonElement>('trigger-delayed-element');
const delaySlot = document.getElementById('delayed-slot')!;
const delayStatus = document.getElementById('delayed-status')!;

delayBtn.addEventListener('click', () => {
  delayStatus.textContent = 'Loading… element will appear in 2s.';
  delaySlot.innerHTML = '';
  delayBtn.disabled = true;
  setTimeout(() => {
    const el = document.createElement('div');
    el.setAttribute('data-testid', 'delayed-element');
    el.className = 'badge badge-success';
    el.textContent = '👋 I appeared!';
    delaySlot.appendChild(el);
    delayStatus.textContent = 'Done.';
    delayBtn.disabled = false;
  }, 2000);
});

// ---- 2. Disappear ----
const disappearBtn = $<HTMLButtonElement>('trigger-disappear');
const disappearEl = $('disappearing-element');
disappearBtn.addEventListener('click', () => {
  disappearBtn.disabled = true;
  setTimeout(() => {
    disappearEl.classList.add('hidden');
    disappearBtn.disabled = false;
  }, 2000);
});

// ---- 3. Skeleton → content ----
const loadBtn = $<HTMLButtonElement>('load-content-btn');
const skel = $('content-skeleton');
const loaded = $('content-loaded');
loadBtn.addEventListener('click', () => {
  loaded.classList.add('hidden');
  skel.classList.remove('hidden');
  loadBtn.disabled = true;
  setTimeout(() => {
    skel.classList.add('hidden');
    loaded.classList.remove('hidden');
    loadBtn.disabled = false;
  }, 2000);
});

// ---- 4. Progress bar ----
const startBtn = $<HTMLButtonElement>('start-progress-btn');
const fill = document.getElementById('progress-fill')!;
const value = $('progress-value');
const status = $('progress-status');

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  status.textContent = 'In progress…';
  let v = 0;
  const step = window.setInterval(() => {
    v += 5;
    if (v >= 100) {
      v = 100;
      window.clearInterval(step);
      status.textContent = 'Complete!';
      startBtn.disabled = false;
    }
    fill.style.width = `${v}%`;
    value.textContent = String(v);
  }, 150);
});

// ---- 5. Rotating text ----
const MESSAGES = ['Connecting…', 'Authenticating…', 'Fetching data…', 'Processing…', 'Ready'];
const rotText = $('rotating-text');
const rotIdx = $('rotation-index');
let idx = 0;

function tick(): void {
  rotText.innerHTML = `<strong>${MESSAGES[idx]}</strong>`;
  rotIdx.textContent = String(idx);
}

tick();
window.setInterval(() => {
  idx = (idx + 1) % MESSAGES.length;
  tick();
}, 2000);

// ---- 6. Conditional section ----
const toggle = $<HTMLInputElement>('toggle-section-checkbox');
const cond = $('conditional-section');
toggle.addEventListener('change', () => {
  cond.classList.toggle('hidden', !toggle.checked);
});
