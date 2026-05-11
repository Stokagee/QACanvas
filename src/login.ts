import { applyTheme, getTheme, toggleTheme } from './main';

const BASE = import.meta.env.BASE_URL;
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin123';

applyTheme(getTheme());

const form = document.getElementById('login-form') as HTMLFormElement;
const usernameInput = document.querySelector<HTMLInputElement>('[data-testid="username-input"]')!;
const passwordInput = document.querySelector<HTMLInputElement>('[data-testid="password-input"]')!;
const errorEl = document.querySelector<HTMLElement>('[data-testid="login-error-msg"]')!;
const themeBtn = document.querySelector<HTMLButtonElement>('[data-testid="theme-toggle"]')!;

themeBtn.addEventListener('click', () => toggleTheme());

if (sessionStorage.getItem('loggedIn') === 'true') {
  window.location.href = BASE + 'index.html';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const u = usernameInput.value.trim();
  const p = passwordInput.value;

  if (u === VALID_USERNAME && p === VALID_PASSWORD) {
    errorEl.classList.add('hidden');
    sessionStorage.setItem('loggedIn', 'true');
    window.location.href = BASE + 'index.html';
  } else {
    errorEl.classList.remove('hidden');
    passwordInput.value = '';
    passwordInput.focus();
  }
});

[usernameInput, passwordInput].forEach((el) => {
  el.addEventListener('input', () => errorEl.classList.add('hidden'));
});
