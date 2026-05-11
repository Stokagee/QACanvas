import { init } from '../main';

init({ active: 'forms' });

interface FieldRule {
  testid: string;
  validate: () => string | null; // returns error message or null
  events: ('blur' | 'change' | 'input')[];
}

const form = document.querySelector<HTMLFormElement>('[data-testid="registration-form"]')!;
const errorModal = document.querySelector<HTMLElement>('[data-testid="validation-error-modal"]')!;
const errorList = document.getElementById('error-list')!;
const successModal = document.querySelector<HTMLElement>('[data-testid="success-modal"]')!;
const summary = document.querySelector<HTMLElement>('[data-testid="success-modal-summary"]')!;

function get<T extends HTMLElement>(testid: string): T {
  return document.querySelector<T>(`[data-testid="${testid}"]`)!;
}

const firstName = get<HTMLInputElement>('first-name-input');
const lastName = get<HTMLInputElement>('last-name-input');
const email = get<HTMLInputElement>('email-input');
const phone = get<HTMLInputElement>('phone-input');
const password = get<HTMLInputElement>('password-input');
const confirmPwd = get<HTMLInputElement>('confirm-password-input');
const dob = get<HTMLInputElement>('dob-input');
const websiteUrl = get<HTMLInputElement>('website-url-input');
const bio = get<HTMLTextAreaElement>('bio-input');
const country = get<HTMLSelectElement>('country-input');
const fileInput = get<HTMLInputElement>('file-input');
const terms = get<HTMLInputElement>('terms-input');

const interestBoxes = Array.from(
  document.querySelectorAll<HTMLInputElement>('.interest'),
);

function ageInYears(isoDate: string): number {
  if (!isoDate) return -1;
  const dobD = new Date(isoDate);
  if (isNaN(dobD.getTime())) return -1;
  const now = new Date();
  let age = now.getFullYear() - dobD.getFullYear();
  const m = now.getMonth() - dobD.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dobD.getDate())) age -= 1;
  return age;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const rules: FieldRule[] = [
  {
    testid: 'first-name',
    events: ['blur', 'input'],
    validate: () => {
      const v = firstName.value.trim();
      if (!v) return 'First name is required';
      if (v.length < 2) return 'Must be at least 2 characters';
      return null;
    },
  },
  {
    testid: 'last-name',
    events: ['blur', 'input'],
    validate: () => {
      const v = lastName.value.trim();
      if (!v) return 'Last name is required';
      if (v.length < 2) return 'Must be at least 2 characters';
      return null;
    },
  },
  {
    testid: 'email',
    events: ['blur', 'input'],
    validate: () => {
      const v = email.value.trim();
      if (!v) return 'Email is required';
      if (!isValidEmail(v)) return 'Invalid email format';
      return null;
    },
  },
  {
    testid: 'phone',
    events: ['blur', 'input'],
    validate: () => {
      const v = phone.value.trim();
      if (!v) return 'Phone is required';
      if (!/^\d{9}$/.test(v)) return 'Must be exactly 9 digits';
      return null;
    },
  },
  {
    testid: 'password',
    events: ['blur', 'input'],
    validate: () => {
      if (!password.value) return 'Password is required';
      if (password.value.length < 8) return 'Must be at least 8 characters';
      return null;
    },
  },
  {
    testid: 'confirm-password',
    events: ['blur', 'input'],
    validate: () => {
      if (!confirmPwd.value) return 'Please confirm your password';
      if (confirmPwd.value !== password.value) return 'Passwords do not match';
      return null;
    },
  },
  {
    testid: 'dob',
    events: ['blur', 'change'],
    validate: () => {
      if (!dob.value) return 'Date of birth is required';
      const age = ageInYears(dob.value);
      if (age < 0) return 'Invalid date';
      if (age < 18) return 'You must be at least 18 years old';
      return null;
    },
  },
  {
    testid: 'website-url',
    events: ['blur', 'input'],
    validate: () => {
      const v = websiteUrl.value.trim();
      if (!v) return null;
      if (!isValidUrl(v)) return 'Invalid URL format';
      return null;
    },
  },
  {
    testid: 'bio',
    events: ['blur', 'input'],
    validate: () => {
      if (bio.value.length > 500) return 'Maximum 500 characters';
      return null;
    },
  },
  {
    testid: 'gender',
    events: ['change'],
    validate: () => {
      const checked = form.querySelector<HTMLInputElement>('input[name="gender"]:checked');
      if (!checked) return 'Please select a gender';
      return null;
    },
  },
  {
    testid: 'interests',
    events: ['change'],
    validate: () => {
      const n = interestBoxes.filter((b) => b.checked).length;
      if (n === 0) return 'Select at least one interest';
      return null;
    },
  },
  {
    testid: 'country',
    events: ['change', 'blur'],
    validate: () => {
      if (!country.value) return 'Country is required';
      return null;
    },
  },
  {
    testid: 'file',
    events: ['change'],
    validate: () => {
      const f = fileInput.files?.[0];
      if (!f) return null;
      if (f.size > 5 * 1024 * 1024) return 'File too large (max 5 MB)';
      const ok = ['.pdf', '.doc', '.docx', '.jpg', '.png'];
      const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase();
      if (!ok.includes(ext)) return 'Unsupported file type';
      return null;
    },
  },
  {
    testid: 'terms',
    events: ['change'],
    validate: () => {
      if (!terms.checked) return 'You must accept the terms';
      return null;
    },
  },
];

function setError(testid: string, message: string | null): void {
  const el = document.querySelector<HTMLElement>(`[data-testid="${testid}-error"]`);
  if (!el) return;
  if (message) {
    el.textContent = message;
    el.classList.remove('hidden');
  } else {
    el.textContent = '';
    el.classList.add('hidden');
  }
}

function runRule(rule: FieldRule): string | null {
  const msg = rule.validate();
  setError(rule.testid, msg);
  return msg;
}

// Wire up per-field listeners
rules.forEach((rule) => {
  const inputEl = document.querySelector<HTMLElement>(`[data-testid="${rule.testid}-input"]`);
  if (inputEl?.tagName === 'INPUT' || inputEl?.tagName === 'SELECT' || inputEl?.tagName === 'TEXTAREA') {
    rule.events.forEach((ev) => inputEl.addEventListener(ev, () => runRule(rule)));
  } else if (rule.testid === 'gender') {
    form.querySelectorAll<HTMLInputElement>('input[name="gender"]').forEach((r) =>
      r.addEventListener('change', () => runRule(rule)),
    );
  } else if (rule.testid === 'interests') {
    interestBoxes.forEach((b) => b.addEventListener('change', () => runRule(rule)));
  }
});

// On submit, validate all
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const errors: string[] = [];
  for (const rule of rules) {
    const msg = runRule(rule);
    if (msg) errors.push(`${rule.testid}: ${msg}`);
  }

  if (errors.length > 0) {
    errorList.innerHTML = errors.map((e) => `<li>${e}</li>`).join('');
    errorModal.classList.remove('hidden');
    return;
  }

  const data: Record<string, unknown> = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    password: '••••••••',
    dob: dob.value,
    websiteUrl: websiteUrl.value.trim() || null,
    bio: bio.value || null,
    gender: form.querySelector<HTMLInputElement>('input[name="gender"]:checked')?.value,
    interests: interestBoxes.filter((b) => b.checked).map((b) => b.value),
    country: country.value,
    file: fileInput.files?.[0]?.name || null,
    termsAccepted: terms.checked,
  };
  summary.textContent = JSON.stringify(data, null, 2);
  successModal.classList.remove('hidden');
});

form.addEventListener('reset', () => {
  setTimeout(() => {
    // Clear all error messages after reset processes
    rules.forEach((r) => setError(r.testid, null));
  }, 0);
});

// Modal close handlers
document
  .querySelectorAll<HTMLElement>(
    '[data-testid="validation-error-modal-close"], [data-testid="validation-error-modal-ok"]',
  )
  .forEach((b) => b.addEventListener('click', () => errorModal.classList.add('hidden')));

document
  .querySelectorAll<HTMLElement>(
    '[data-testid="success-modal-close"], [data-testid="success-modal-ok"]',
  )
  .forEach((b) =>
    b.addEventListener('click', () => {
      successModal.classList.add('hidden');
      form.reset();
      rules.forEach((r) => setError(r.testid, null));
    }),
  );
