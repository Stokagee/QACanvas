(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const i="qacanvas-theme",d="loggedIn",l="/qacanvas/",b=[{label:"Home",href:"index.html",key:"home"},{label:"Inputs",href:"pages/inputs.html",key:"inputs"},{label:"Buttons",href:"pages/buttons.html",key:"buttons"},{label:"Checkboxes",href:"pages/checkboxes.html",key:"checkboxes"},{label:"Selects",href:"pages/selects.html",key:"selects"},{label:"Forms",href:"pages/forms.html",key:"forms"},{label:"Tables",href:"pages/tables.html",key:"tables"},{label:"Alerts",href:"pages/alerts.html",key:"alerts"},{label:"Iframes",href:"pages/iframes.html",key:"iframes"},{label:"Drag & Drop",href:"pages/dragdrop.html",key:"dragdrop"},{label:"Hover",href:"pages/hover.html",key:"hover"},{label:"Keyboard",href:"pages/keyboard.html",key:"keyboard"},{label:"Scroll",href:"pages/scroll.html",key:"scroll"},{label:"Dynamic",href:"pages/dynamic.html",key:"dynamic"},{label:"Tabs",href:"pages/tabs.html",key:"tabs"},{label:"Shadow DOM",href:"pages/shadow-dom.html",key:"shadow-dom"},{label:"Network",href:"pages/network.html",key:"network"},{label:"Storage",href:"pages/storage.html",key:"storage"}];function h(){return sessionStorage.getItem(d)==="true"}function m(){return h()?!0:(window.location.href=l+"login.html",!1)}function c(){return localStorage.getItem(i)==="dark"?"dark":"light"}function u(n){n==="dark"?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.removeAttribute("data-theme"),localStorage.setItem(i,n)}function g(){u(c()==="dark"?"light":"dark")}function f(n){const t=b.map(r=>{const o=l+r.href,e=r.key===n?"active":"",a=`nav-link-${r.key}`;return`<a href="${o}" class="${e}" data-testid="${a}">${r.label}</a>`}).join("");return`
    <div class="navbar-inner">
      <a href="${l}index.html" class="navbar-brand" data-testid="navbar-brand">
        <span class="navbar-brand-dot"></span>
        QACanvas
      </a>
      <button
        type="button"
        class="navbar-toggle"
        data-testid="navbar-menu-toggle"
        aria-label="Toggle navigation"
      >☰</button>
      <nav class="navbar-links" data-testid="navbar-links">${t}</nav>
      <div class="navbar-actions">
        <button
          type="button"
          class="btn btn-ghost btn-icon"
          data-testid="theme-toggle"
          aria-label="Toggle theme"
          title="Toggle light/dark"
        >🌓</button>
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          data-testid="logout-btn"
        >Logout</button>
      </div>
    </div>
  `}function p(){return"<span>QACanvas — Playwright practice playground · <code>v1.0.0</code></span>"}function y(n){var a,s;if(!m())return;u(c());let t=document.querySelector("header.navbar");t||(t=document.createElement("header"),t.className="navbar",document.body.prepend(t)),t.setAttribute("data-testid","navbar"),t.innerHTML=f(n.active);let r=document.querySelector('footer[data-testid="page-footer"]');r||(r=document.createElement("footer"),r.setAttribute("data-testid","page-footer"),document.body.appendChild(r)),r.innerHTML=p(),(a=t.querySelector('[data-testid="theme-toggle"]'))==null||a.addEventListener("click",()=>{g()}),(s=t.querySelector('[data-testid="logout-btn"]'))==null||s.addEventListener("click",()=>{sessionStorage.removeItem(d),window.location.href=l+"login.html"});const o=t.querySelector('[data-testid="navbar-menu-toggle"]'),e=t.querySelector('[data-testid="navbar-links"]');o==null||o.addEventListener("click",()=>{e==null||e.classList.toggle("is-open")})}export{u as a,c as g,y as i,g as t};
