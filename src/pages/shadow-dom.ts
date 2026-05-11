import { init } from '../main';

init({ active: 'shadow-dom' });

const SHARED_STYLE = `
  :host { display: block; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; max-width: 420px; font-family: system-ui, sans-serif; }
  input, button { font-family: inherit; font-size: 0.9rem; padding: 6px 10px; border-radius: 6px; border: 1px solid #d1d5db; }
  button { background: #6366f1; color: white; border: none; cursor: pointer; }
  button:hover { background: #4f46e5; }
  .row { display: flex; gap: 8px; align-items: center; }
  .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
  label { font-size: 0.85rem; font-weight: 500; }
  .result { color: #6b7280; font-family: ui-monospace, monospace; font-size: 0.85rem; margin-top: 8px; }
`;

class MyWidget extends HTMLElement {
  connectedCallback(): void {
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>${SHARED_STYLE}</style>
      <div class="row">
        <input data-testid="shadow-input" type="text" placeholder="Type here…" />
        <button data-testid="shadow-btn" type="button">Submit</button>
      </div>
      <div class="result" data-testid="shadow-result">—</div>
    `;
    const input = root.querySelector<HTMLInputElement>('[data-testid="shadow-input"]')!;
    const btn = root.querySelector<HTMLButtonElement>('[data-testid="shadow-btn"]')!;
    const result = root.querySelector<HTMLElement>('[data-testid="shadow-result"]')!;
    btn.addEventListener('click', () => {
      result.textContent = `You said: ${input.value || '(empty)'}`;
    });
  }
}

class NestedInner extends HTMLElement {
  connectedCallback(): void {
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>${SHARED_STYLE}</style>
      <label class="row">
        <input data-testid="shadow-inner-checkbox" type="checkbox" />
        <span data-testid="shadow-inner-label">Subscribe to inner notifications</span>
      </label>
    `;
    const cb = root.querySelector<HTMLInputElement>('[data-testid="shadow-inner-checkbox"]')!;
    const label = root.querySelector<HTMLElement>('[data-testid="shadow-inner-label"]')!;
    cb.addEventListener('change', () => {
      label.textContent = cb.checked
        ? 'Subscribed (inner)'
        : 'Subscribe to inner notifications';
    });
  }
}

class NestedOuter extends HTMLElement {
  connectedCallback(): void {
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>${SHARED_STYLE} :host { background: #f5f7fa; }</style>
      <p style="margin: 0 0 8px">Outer shadow host</p>
      <nested-inner data-testid="shadow-host-inner"></nested-inner>
    `;
  }
}

class ShadowForm extends HTMLElement {
  connectedCallback(): void {
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>${SHARED_STYLE}</style>
      <form data-testid="shadow-form">
        <div class="field">
          <label>Name</label>
          <input data-testid="shadow-form-name" type="text" />
        </div>
        <div class="field">
          <label>Email</label>
          <input data-testid="shadow-form-email" type="email" />
        </div>
        <button data-testid="shadow-form-submit" type="submit">Submit</button>
        <div class="result" data-testid="shadow-form-result">—</div>
      </form>
    `;
    const form = root.querySelector<HTMLFormElement>('[data-testid="shadow-form"]')!;
    const name = root.querySelector<HTMLInputElement>('[data-testid="shadow-form-name"]')!;
    const email = root.querySelector<HTMLInputElement>('[data-testid="shadow-form-email"]')!;
    const result = root.querySelector<HTMLElement>('[data-testid="shadow-form-result"]')!;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!name.value.trim() || !email.value.trim()) {
        result.textContent = 'Please fill in both fields';
        return;
      }
      result.textContent = `Submitted: ${name.value} <${email.value}>`;
    });
  }
}

customElements.define('my-widget', MyWidget);
customElements.define('nested-inner', NestedInner);
customElements.define('nested-outer', NestedOuter);
customElements.define('shadow-form', ShadowForm);
