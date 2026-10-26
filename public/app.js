(() => {
'use strict';
const cfg=window.CELIA,$=s=>document.querySelector(s),storageKey='celia-beauty-selection-v1';
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const wa=message=>'https://wa.me/'+cfg.phone+'?text='+encodeURIComponent(message);
document.querySelectorAll('.wa-link').forEach(a=>{a.href=wa(a.dataset.message||'Hola, Celia Beauty. Quisiera hacer una consulta.');a.target='_blank';a.rel='noopener noreferrer'});
let filter='Todos',query='',detailId=null,cart={},toastTimer;
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved)){for(const p of cfg.products){const q=Number(saved[p.id]);if(Number.isInteger(q)&&q>0)cart[p.id]=Math.min(q,9)}}}catch{}
const menu=$('.menu-toggle'),nav=$('#nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.header')&&!e.target.closest('.nav'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
function openDialog(dialog){dialog.showModal();document.body.classList.add('modal-open')}
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
 dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close()});
});
function notify(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2800)}
function saveCart(){try{localStorage.setItem(storageKey,JSON.stringify(cart))}catch{}updateBag()}
function add(id){const p=cfg.products.find(p=>p.id===id);if(!p)return;if((cart[id]||0)>=9){notify('Máximo 9 referencias de este producto.');return}cart[id]=(cart[id]||0)+1;saveCart();notify('Añadido a tu selección ✦')}
function element(tag,className,text){const e=document.createElement(tag);if(className)e.className=className;if(text!==undefined)e.textContent=text;return e}
function updateBag(){
 const total=Object.values(cart).reduce((a,b)=>a+b,0);$('#bag-count').textContent=String(total);$('#bag-open').setAttribute('aria-label','Ver mi selección de productos ('+total+')');
 const items=$('#bag-items');items.replaceChildren();const lines=[];
 cfg.products.filter(p=>cart[p.id]).forEach(p=>{
 const row=element('div','bag-row'),img=element('img');img.src=p.image;img.alt=p.name;row.append(img);
 const body=element('div');body.append(element('h3','',p.name),element('small','',p.category+' · Referencia'));
 const controls=element('div','quantity-controls');
 const minus=element('button','','−');minus.setAttribute('aria-label','Restar una unidad de '+p.name);minus.disabled=cart[p.id]===1;minus.onclick=()=>{if(cart[p.id]>1){cart[p.id]--;saveCart()}};
 const quantity=element('span','',String(cart[p.id]));quantity.setAttribute('aria-label','Cantidad de '+p.name);
 const plus=element('button','','+');plus.setAttribute('aria-label','Añadir una unidad de '+p.name);plus.disabled=cart[p.id]>=9;plus.onclick=()=>{if(cart[p.id]<9){cart[p.id]++;saveCart()}};
 const remove=element('button','remove-item','Quitar');remove.setAttribute('aria-label','Quitar '+p.name);remove.onclick=()=>{delete cart[p.id];saveCart()};
 controls.append(minus,quantity,plus,remove);body.append(controls);row.append(body);items.append(row);lines.push('- '+p.name+' ('+p.category+'): '+cart[p.id]);
 });
 $('#bag-empty').hidden=total>0;$('#bag-summary').hidden=total===0;
 $('#bag-wa').href=wa('Hola, Celia Beauty. Me interesan estas referencias:\n'+lines.join('\n')+'\n¿Podrían indicarme los productos disponibles, sus presentaciones y precios?');
}
function showProduct(id){const p=cfg.products.find(p=>p.id===id);if(!p)return;detailId=id;$('#detail-image').src=p.image;$('#detail-image').alt='Imagen ilustrativa: '+p.name;$('#detail-category').textContent=p.category.toUpperCase();$('#detail-title').textContent=p.name;$('#detail-description').textContent=p.description;$('#detail-wa').href=wa('Hola, Celia Beauty. Me interesa la referencia "'+p.name+'". ¿Qué opciones y precios tienen disponibles?');openDialog($('#detail-dialog'))}
function render(){
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 const list=cfg.products.filter(p=>(filter==='Todos'||p.category===filter)&&normalize(p.name+' '+p.subtitle+' '+p.category+' '+p.keywords).includes(normalize(query)));
 const grid=$('#products-grid');grid.replaceChildren();list.forEach(p=>{
 const card=element('article','product-card'),visual=element('button','product-visual');visual.setAttribute('aria-label','Ver detalles de '+p.name);visual.onclick=()=>showProduct(p.id);
 const img=element('img');img.src=p.image;img.alt='Imagen ilustrativa: '+p.subtitle;img.width=1024;img.height=1024;img.loading='lazy';img.decoding='async';visual.append(img,element('span','product-tag','BEAUTY INSPIRATION'));const zoom=element('span','product-zoom','+');zoom.setAttribute('aria-hidden','true');visual.append(zoom);card.append(visual);
 const info=element('div','product-info');info.append(element('small','',p.category.toUpperCase()),element('h3','',p.name),element('p','',p.subtitle));
 const bottom=element('div','product-bottom'),button=element('button','add-product','Lo quiero +');button.setAttribute('aria-label','Añadir '+p.name+' a mi selección');button.onclick=()=>add(p.id);bottom.append(element('span','','Consultar precio'),button);info.append(bottom);card.append(info);grid.append(card);
 });
 $('#results').textContent=list.length+' '+(list.length===1?'referencia':'referencias');$('#empty').hidden=list.length!==0;$('#search-summary').hidden=!query;$('#search-summary span').textContent='Resultados para “'+query+'”';
}
function reset(){filter='Todos';query='';$('#search-input').value='';render()}
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render()});
document.querySelectorAll('[data-category-link]').forEach(a=>a.addEventListener('click',()=>{filter=a.dataset.categoryLink;query='';$('#search-input').value='';render();closeMenu()}));
$('#search-input').addEventListener('input',e=>{query=e.target.value.trim();render()});
$('#search-form').addEventListener('submit',e=>{e.preventDefault();query=$('#search-input').value.trim();filter='Todos';render();$('#productos').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
$('#clear-search').onclick=()=>{query='';$('#search-input').value='';render()};
$('#reset-products').onclick=reset;
$('#bag-open').onclick=()=>{updateBag();openDialog($('#bag-dialog'))};
$('#continue-shopping').onclick=()=>{$('#bag-dialog').close();$('#productos').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
$('#detail-add').onclick=()=>{add(detailId);$('#detail-dialog').close()};
document.querySelectorAll('.booking').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.service)$('#service-choice').value=b.dataset.service;openDialog($('#booking-dialog'))}));
const dateParts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Lima',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const datePart=type=>dateParts.find(p=>p.type===type).value;
$('#preferred-date').min=datePart('year')+'-'+datePart('month')+'-'+datePart('day');
$('#booking-form').onsubmit=e=>{e.preventDefault();if(!e.target.reportValidity())return;const service=$('#service-choice').value,date=$('#preferred-date').value,notes=$('#booking-notes').value.trim();const message='Hola, Celia Beauty. Quisiera consultar una cita para '+service+'.'+(date?'\nFecha que me gustaría: '+date.split('-').reverse().join('/')+'.':'')+(notes?'\nMi idea: '+notes:'')+'\n¿Podrían confirmarme disponibilidad y precio?';window.open(wa(message),'_blank','noopener,noreferrer')};
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.section-heading,.promo-card,.about,.contact-panel').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
render();updateBag();
})();
