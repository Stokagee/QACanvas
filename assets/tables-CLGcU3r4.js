import{i as A}from"./main-DhNBx2QF.js";A({active:"tables"});const r=[{name:"Alice Johnson",department:"Engineering",position:"Senior Dev",salary:95e3,startDate:"2020-03-15",status:"Active"},{name:"Bob Smith",department:"Marketing",position:"Manager",salary:72e3,startDate:"2019-07-22",status:"Active"},{name:"Carol White",department:"Engineering",position:"Junior Dev",salary:58e3,startDate:"2022-01-10",status:"Active"},{name:"David Brown",department:"HR",position:"Specialist",salary:61e3,startDate:"2021-05-18",status:"Inactive"},{name:"Eve Davis",department:"Engineering",position:"Lead Dev",salary:11e4,startDate:"2018-11-03",status:"Active"},{name:"Frank Wilson",department:"Marketing",position:"Analyst",salary:65e3,startDate:"2020-09-14",status:"Active"},{name:"Grace Lee",department:"Finance",position:"Accountant",salary:7e4,startDate:"2019-02-28",status:"Active"},{name:"Henry Taylor",department:"HR",position:"Director",salary:9e4,startDate:"2017-06-05",status:"Inactive"},{name:"Iris Martinez",department:"Finance",position:"Analyst",salary:63e3,startDate:"2021-11-20",status:"Active"},{name:"Jack Anderson",department:"Engineering",position:"Architect",salary:125e3,startDate:"2016-04-11",status:"Active"}],M=document.getElementById("static-tbody");M.innerHTML=r.map((e,t)=>`
  <tr data-testid="static-table-row-${t}">
    <td data-testid="static-table-cell-${t}-0">${e.name}</td>
    <td data-testid="static-table-cell-${t}-1">${e.department}</td>
    <td data-testid="static-table-cell-${t}-2">${e.position}</td>
    <td data-testid="static-table-cell-${t}-3">${e.salary.toLocaleString()}</td>
    <td data-testid="static-table-cell-${t}-4">${e.startDate}</td>
    <td data-testid="static-table-cell-${t}-5">
      <span class="badge ${e.status==="Active"?"badge-success":"badge-danger"}">${e.status}</span>
    </td>
  </tr>`).join("");let i=null,o="asc";const k=document.querySelector('[data-testid="sortable-table-body"]');function v(){const e=[...r];i&&e.sort((t,s)=>{const n=t[i],a=s[i];return typeof n=="number"&&typeof a=="number"?o==="asc"?n-a:a-n:o==="asc"?String(n).localeCompare(String(a)):String(a).localeCompare(String(n))}),k.innerHTML=e.map(t=>`
    <tr>
      <td>${t.name}</td>
      <td>${t.department}</td>
      <td>${t.salary.toLocaleString()}</td>
      <td><span class="badge ${t.status==="Active"?"badge-success":"badge-danger"}">${t.status}</span></td>
    </tr>`).join(""),["name","department","salary"].forEach(t=>{const s=document.querySelector(`[data-testid="sort-indicator-${t}"]`);s&&(s.textContent=i===t?o==="asc"?"▲":"▼":"")})}document.querySelectorAll("th.sortable").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.key;i===t?o=o==="asc"?"desc":"asc":(i=t,o="asc"),v()})});v();const S=document.querySelector('[data-testid="filter-table-search"]'),p=document.querySelector('[data-testid="filter-table-dept"]'),g=document.querySelector('[data-testid="filter-table-status"]'),y=document.querySelector('[data-testid="filter-table-body"]'),C=document.querySelector('[data-testid="filter-table-results-count"]'),b=document.querySelector('[data-testid="filter-no-results"]');function u(){const e=S.value.trim().toLowerCase(),t=p.value,s=g.value,n=r.filter(a=>!(t&&a.department!==t||s&&a.status!==s||e&&!`${a.name} ${a.department} ${a.position} ${a.salary} ${a.startDate} ${a.status}`.toLowerCase().includes(e)));C.textContent=`Showing ${n.length} of ${r.length}`,n.length===0?(y.innerHTML="",b.classList.remove("hidden")):(b.classList.add("hidden"),y.innerHTML=n.map(a=>`
      <tr>
        <td>${a.name}</td>
        <td>${a.department}</td>
        <td>${a.position}</td>
        <td>${a.salary.toLocaleString()}</td>
        <td><span class="badge ${a.status==="Active"?"badge-success":"badge-danger"}">${a.status}</span></td>
      </tr>`).join(""))}[S,p,g].forEach(e=>e.addEventListener("input",u));p.addEventListener("change",u);g.addEventListener("change",u);u();let d=1,l=3;const w=document.querySelector('[data-testid="paged-table-body"]'),x=document.querySelector('[data-testid="paged-table-page-info"]'),h=document.querySelector('[data-testid="paged-table-first"]'),L=document.querySelector('[data-testid="paged-table-prev"]'),E=document.querySelector('[data-testid="paged-table-next"]'),D=document.querySelector('[data-testid="paged-table-last"]'),f=document.querySelector('[data-testid="paged-rows-select"]');function c(){const e=Math.max(1,Math.ceil(r.length/l));d>e&&(d=e);const t=(d-1)*l,s=r.slice(t,t+l);w.innerHTML=s.map(n=>`
    <tr>
      <td>${n.name}</td>
      <td>${n.department}</td>
      <td>${n.position}</td>
      <td><span class="badge ${n.status==="Active"?"badge-success":"badge-danger"}">${n.status}</span></td>
    </tr>`).join(""),x.textContent=`Page ${d} of ${e}`,h.disabled=d===1,L.disabled=d===1,E.disabled=d===e,D.disabled=d===e}h.addEventListener("click",()=>{d=1,c()});L.addEventListener("click",()=>{d=Math.max(1,d-1),c()});E.addEventListener("click",()=>{d+=1,c()});D.addEventListener("click",()=>{d=Math.ceil(r.length/l),c()});f.addEventListener("change",()=>{l=Number(f.value)||3,d=1,c()});c();const H=document.querySelector('[data-testid="dynamic-table-body"]'),$=document.querySelector('[data-testid="dynamic-table-status"]'),m=document.querySelector('[data-testid="dynamic-table-reload"]');function T(e){const t=[...e];for(let s=t.length-1;s>0;s-=1){const n=Math.floor(Math.random()*(s+1));[t[s],t[n]]=[t[n],t[s]]}return t}function q(){const e=T(r);H.innerHTML=e.map(t=>`
    <tr>
      <td>${t.name}</td>
      <td>${t.department}</td>
      <td>${t.salary.toLocaleString()}</td>
    </tr>`).join("")}m.addEventListener("click",()=>{$.textContent="Loading…",m.disabled=!0,setTimeout(()=>{q(),$.textContent="Loaded",m.disabled=!1},600)});q();
