import{i as r}from"./main-DFFTVTx1.js";r({active:"shadow-dom"});const a=`
  :host { display: block; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; max-width: 420px; font-family: system-ui, sans-serif; }
  input, button { font-family: inherit; font-size: 0.9rem; padding: 6px 10px; border-radius: 6px; border: 1px solid #d1d5db; }
  button { background: #6366f1; color: white; border: none; cursor: pointer; }
  button:hover { background: #4f46e5; }
  .row { display: flex; gap: 8px; align-items: center; }
  .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
  label { font-size: 0.85rem; font-weight: 500; }
  .result { color: #6b7280; font-family: ui-monospace, monospace; font-size: 0.85rem; margin-top: 8px; }
`;class l extends HTMLElement{connectedCallback(){const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>${a}</style>
      <div class="row">
        <input data-testid="shadow-input" type="text" placeholder="Type here…" />
        <button data-testid="shadow-btn" type="button">Submit</button>
      </div>
      <div class="result" data-testid="shadow-result">—</div>
    `;const t=e.querySelector('[data-testid="shadow-input"]'),o=e.querySelector('[data-testid="shadow-btn"]'),s=e.querySelector('[data-testid="shadow-result"]');o.addEventListener("click",()=>{s.textContent=`You said: ${t.value||"(empty)"}`})}}class c extends HTMLElement{connectedCallback(){const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>${a}</style>
      <label class="row">
        <input data-testid="shadow-inner-checkbox" type="checkbox" />
        <span data-testid="shadow-inner-label">Subscribe to inner notifications</span>
      </label>
    `;const t=e.querySelector('[data-testid="shadow-inner-checkbox"]'),o=e.querySelector('[data-testid="shadow-inner-label"]');t.addEventListener("change",()=>{o.textContent=t.checked?"Subscribed (inner)":"Subscribe to inner notifications"})}}class m extends HTMLElement{connectedCallback(){const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>${a} :host { background: #f5f7fa; }</style>
      <p style="margin: 0 0 8px">Outer shadow host</p>
      <nested-inner data-testid="shadow-host-inner"></nested-inner>
    `}}class u extends HTMLElement{connectedCallback(){const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>${a}</style>
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
    `;const t=e.querySelector('[data-testid="shadow-form"]'),o=e.querySelector('[data-testid="shadow-form-name"]'),s=e.querySelector('[data-testid="shadow-form-email"]'),d=e.querySelector('[data-testid="shadow-form-result"]');t.addEventListener("submit",i=>{if(i.preventDefault(),!o.value.trim()||!s.value.trim()){d.textContent="Please fill in both fields";return}d.textContent=`Submitted: ${o.value} <${s.value}>`})}}customElements.define("my-widget",l);customElements.define("nested-inner",c);customElements.define("nested-outer",m);customElements.define("shadow-form",u);
