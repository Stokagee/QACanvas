import { init } from '../main';

init({ active: 'alerts' });

const $ = <T extends HTMLElement>(testid: string): T =>
  document.querySelector<T>(`[data-testid="${testid}"]`)!;

// JS alert
$('trigger-alert-btn').addEventListener('click', () => {
  alert('Hello from QACanvas!');
  $('alert-result').textContent = 'Alert accepted';
});

// JS confirm
$('trigger-confirm-btn').addEventListener('click', () => {
  const ok = confirm('Do you confirm this action?');
  $('confirm-result').textContent = ok ? 'You pressed OK' : 'You pressed Cancel';
});

// JS prompt
$('trigger-prompt-btn').addEventListener('click', () => {
  const value = prompt('What is your name?', 'John Doe');
  $('prompt-result').textContent =
    value === null ? 'Prompt dismissed' : `Hello, ${value || '(empty)'}`;
});

// Custom modal
const customModal = $('custom-modal');
$('open-modal-btn').addEventListener('click', () => {
  customModal.classList.remove('hidden');
  $('modal-result').textContent = '—';
});
$('modal-close-x').addEventListener('click', () => customModal.classList.add('hidden'));
$('modal-cancel-btn').addEventListener('click', () => {
  customModal.classList.add('hidden');
  $('modal-result').textContent = 'Cancelled';
});
$('modal-confirm-btn').addEventListener('click', () => {
  customModal.classList.add('hidden');
  $('modal-result').textContent = 'Confirmed';
});

// Nested modals
const modalA = $('modal-a');
const modalB = $('modal-b');
$('open-modal-a-btn').addEventListener('click', () => modalA.classList.remove('hidden'));
$('modal-a-close').addEventListener('click', () => modalA.classList.add('hidden'));
$('open-modal-b-btn').addEventListener('click', () => modalB.classList.remove('hidden'));
$('modal-b-close').addEventListener('click', () => modalB.classList.add('hidden'));

// Timed modal
const timed = $('timed-modal');
const countdown = $('timed-modal-countdown');
$('trigger-timed-modal-btn').addEventListener('click', () => {
  timed.classList.remove('hidden');
  let secs = 3;
  countdown.textContent = `Closing in ${secs}…`;
  const iv = window.setInterval(() => {
    secs -= 1;
    if (secs > 0) {
      countdown.textContent = `Closing in ${secs}…`;
    } else {
      window.clearInterval(iv);
      timed.classList.add('hidden');
    }
  }, 1000);
});
