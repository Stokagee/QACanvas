import { init } from '../main';

init({ active: 'tabs' });

const BASE = import.meta.env.BASE_URL;
const $ = <T extends HTMLElement>(testid: string): T =>
  document.querySelector<T>(`[data-testid="${testid}"]`)!;

// 1. Open new tab via window.open
$<HTMLButtonElement>('open-new-tab-btn').addEventListener('click', () => {
  window.open(`${BASE}pages/inputs.html`, '_blank', 'noopener');
});

// 2. Popup
const popupResult = $('popup-result');
$<HTMLButtonElement>('open-popup-btn').addEventListener('click', () => {
  const popup = window.open(
    `${BASE}pages/inputs.html`,
    'qacanvasPopup',
    'width=400,height=300,resizable=yes',
  );
  if (!popup) {
    popupResult.textContent = 'Popup was blocked by the browser';
    return;
  }
  popupResult.textContent = 'Popup opened';
  const checker = window.setInterval(() => {
    if (popup.closed) {
      popupResult.textContent = 'Popup was closed';
      window.clearInterval(checker);
    }
  }, 500);
});

// 3. BroadcastChannel
const channel = new BroadcastChannel('qacanvas-tabs');
const bcInput = $<HTMLInputElement>('broadcast-input');
const bcReceived = $('broadcast-received');

$<HTMLButtonElement>('broadcast-send-btn').addEventListener('click', () => {
  const msg = bcInput.value.trim();
  if (msg) {
    channel.postMessage(msg);
    bcInput.value = '';
  }
});

channel.addEventListener('message', (e: MessageEvent) => {
  bcReceived.innerHTML = `Last received: <strong>${String(e.data)}</strong>`;
});
