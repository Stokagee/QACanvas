import{i as t}from"./main-DhNBx2QF.js";t({active:"iframes"});const e=`
  body { font-family: system-ui, sans-serif; margin: 12px; color: #1a1a2e; }
  input, button { font-family: inherit; font-size: 0.9rem; padding: 6px 10px; border-radius: 6px; border: 1px solid #d1d5db; }
  button { background: #6366f1; color: white; border: none; cursor: pointer; }
  button:hover { background: #4f46e5; }
  .result { margin-top: 8px; color: #6b7280; font-family: ui-monospace, monospace; font-size: 0.85rem; }
`,a=`
<!doctype html>
<html><head><meta charset="utf-8"><style>${e}</style></head>
<body>
  <p>I am a simple iframe.</p>
  <input type="text" data-testid="frame1-input" placeholder="Type here…" />
  <button type="button" data-testid="frame1-btn">Show value</button>
  <p class="result" data-testid="frame1-result">—</p>
  <script>
    var inp = document.querySelector('[data-testid="frame1-input"]');
    var btn = document.querySelector('[data-testid="frame1-btn"]');
    var res = document.querySelector('[data-testid="frame1-result"]');
    btn.addEventListener('click', function () { res.textContent = 'You typed: ' + inp.value; });
  <\/script>
</body></html>
`,r=`
<!doctype html>
<html><head><meta charset="utf-8"><style>${e} .field{margin-bottom:8px;display:flex;flex-direction:column;gap:2px;max-width:240px}</style></head>
<body>
  <h3 style="margin-top:0">Frame login</h3>
  <form data-testid="frame2-form">
    <div class="field"><label>Username</label><input data-testid="frame2-username" type="text"></div>
    <div class="field"><label>Password</label><input data-testid="frame2-password" type="password"></div>
    <button data-testid="frame2-submit" type="submit">Sign in</button>
  </form>
  <p class="result" data-testid="frame2-result">—</p>
  <script>
    var form = document.querySelector('[data-testid="frame2-form"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = document.querySelector('[data-testid="frame2-username"]').value;
      var p = document.querySelector('[data-testid="frame2-password"]').value;
      var res = document.querySelector('[data-testid="frame2-result"]');
      if (u && p) res.textContent = 'Signed in as ' + u;
      else res.textContent = 'Missing credentials';
    });
  <\/script>
</body></html>
`,d=`
<!doctype html>
<html><head><meta charset="utf-8"><style>${e}</style></head>
<body>
  <p>Inner (deeply nested) frame.</p>
  <label><input type="checkbox" data-testid="frame3-inner-checkbox"> I agree</label>
  <p class="result" data-testid="frame3-inner-result">Not agreed</p>
  <script>
    var cb = document.querySelector('[data-testid="frame3-inner-checkbox"]');
    var res = document.querySelector('[data-testid="frame3-inner-result"]');
    cb.addEventListener('change', function () { res.textContent = cb.checked ? 'Agreed' : 'Not agreed'; });
  <\/script>
</body></html>
`,o=`
<!doctype html>
<html><head><meta charset="utf-8"><style>${e} iframe{width:100%;height:160px;border:1px solid #e5e7eb;border-radius:6px;margin-top:8px}</style></head>
<body>
  <p>Outer frame containing another frame.</p>
  <input type="text" data-testid="frame3-outer-input" placeholder="Outer input" />
  <iframe data-testid="iframe-inner" srcdoc='${d.replace(/'/g,"&apos;")}'></iframe>
</body></html>
`;document.getElementById("iframe-simple").srcdoc=a;document.getElementById("iframe-form").srcdoc=r;document.getElementById("iframe-outer").srcdoc=o;
