'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const icon = name => `<svg class="ic" aria-hidden="true"><use href="#${name}"/></svg>`;
const palettes = [
  {id:'blush', name:'Пудровая',color:'#d6a0a9'},
  {id:'berry', name:'Ягодная',color:'#94384a'},
  {id:'meadow', name:'Бело-зелёная',color:'#acb59b'}
];
const filters = {all:'Все букеты',pastel:'Нежные',bright:'Яркие',light:'Светлые'};
const storageKey = 'rozmarin.favoriteIds.v1';
let favorites = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if(Array.isArray(stored)) favorites = new Set(stored.filter(id => bouquets.some(item => item.id === id)));
} catch {}
let activeFilter = 'all';
let visible = 3;
let activePalette = palettes[0];
let order = {};
let restoreFocus;
const modal = $('#modal');
const modalBody = $('#modal-body');
const safe = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const bouquetById = id => bouquets.find(item => item.id === Number(id));

function updateFavCount() {
  const count = $('#fav-count');
  count.textContent = favorites.size;
  count.hidden = favorites.size === 0;
  $('.fav-head').classList.toggle('has-saved', favorites.size > 0);
  $('.fav-head').setAttribute('aria-label', 'Избранные букеты, ' + favorites.size);
}
function favoriteLabel(item) {
  return (favorites.has(item.id) ? 'Убрать из избранного' : 'Добавить в избранное') + ' — ' + item.title;
}
function renderCatalog() {
  $('#filters').innerHTML = Object.entries(filters).map(([key,label]) => `<button class="filter" data-filter="${key}" aria-pressed="${key === activeFilter}">${label}</button>`).join('');
  const matches = bouquets.filter(item => activeFilter === 'all' || item.palette === activeFilter);
  const shown = matches.slice(0,visible);
  $('#products').innerHTML = shown.map(item => `<article class="product">
    <button class="card-open" data-product="${item.id}" aria-label="Рассмотреть букет — ${safe(item.title)}">
      <div class="card-photo"><img src="${item.photo.replace('.jpg', '-card.webp')}" loading="lazy" width="768" height="1024" alt="${safe(item.description)}"></div>
      <span class="card-title">${safe(item.title)}</span><span class="card-caption">Фото из карточки салона</span>
    </button>
    <button class="iconbtn favorite" data-favorite="${item.id}" aria-label="${safe(favoriteLabel(item))}" aria-pressed="${favorites.has(item.id)}">${icon('heart')}</button></article>`).join('');
  $('#more').hidden = matches.length <= visible;
  $('#catalog-status').textContent = 'Показано букетов: ' + shown.length + ' из ' + matches.length;
}
function showModal(content, className='') {
  if(!modal.open) restoreFocus = document.activeElement;
  modal.className = className;
  modalBody.innerHTML = content;
  if(!modal.open) modal.showModal();
  modal.scrollTop = 0;
  $('.dialog-close').focus({preventScroll:true});
}
function closeModal() { modal.close(); }
modal.addEventListener('close', () => {
  if(restoreFocus?.isConnected) restoreFocus.focus({preventScroll:true});
});
modal.addEventListener('click', event => {
  if(event.target !== modal) return;
  const box = modal.getBoundingClientRect();
  if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeModal();
});
function productDetails(item, fromSaved) {
  showModal(`<img class="product-large" src="${item.photo}" alt="${safe(item.description)}"><div class="dialog-inner">
    ${fromSaved?'<button data-saved class="textbtn back-link">К избранному</button>':''}
    <h2 id="modal-title">${safe(item.title)}</h2><p class="desc">${safe(item.description)}</p>
    <p class="note">Флорист уточнит наличие цветов и стоимость похожего букета на вашу дату.</p><a class="source-credit" href="https://yandex.ru/maps/org/rozmarin/36440959505/gallery/" target="_blank" rel="noopener">Фото из карточки салона на Яндекс Картах</a>
    <button class="btn primary" data-order-product="${item.id}">Заказать похожий</button></div>`);
}
function savedList() {
  const saved = bouquets.filter(item => favorites.has(item.id));
  showModal(`<div class="dialog-inner"><h2 id="modal-title">Избранные букеты</h2>${saved.length ? '<div class="mini-list">' + saved.map(item => `<button class="mini-product" data-saved-product="${item.id}"><img src="${item.photo}" alt=""><span>${safe(item.title)}</span></button>`).join('') + '</div>' : '<p>Нажмите на сердечко рядом с букетом, чтобы вернуться к нему позже.</p><button class="btn primary" data-browse>Посмотреть букеты</button>'}</div>`);
}
function displayPalette() {
  const image = $('#palette-img');
  image.src = 'assets/' + activePalette.id + '.webp';
  image.alt = 'Пример оттенков для букета. Палитра «' + activePalette.name + '»';
  $('#swatches').innerHTML = palettes.map(p => `<button class="swatch" type="button" style="--color:${p.color}" data-palette="${p.id}" aria-label="${p.name} палитра" aria-pressed="${activePalette.id === p.id}"><span></span></button>`).join('')+`<span class="swatch-name" aria-live="polite">${activePalette.name}</span>`;
}
function startOrder(item=null, palette='', method='Самовывоз') {
  order = {item, palette, method, date:'',address:'',budget:'',note:''};
  orderForm();
}
function orderForm() {
  const today = new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Novosibirsk'}).format(new Date());
  const subject = order.item?.title || (order.palette ? 'Палитра «'+order.palette+'»' : 'Индивидуальный букет');
  showModal(`<div class="dialog-inner"><h2 id="modal-title">Написать флористу</h2><form class="order-form" id="order-form">
    <p>${safe(subject)}</p>
    <div class="form-row"><label class="form-field">Получение<select name="method"><option${order.method==='Самовывоз'?' selected':''}>Самовывоз</option><option${order.method==='Доставка'?' selected':''}>Доставка</option></select></label>
    <label class="form-field">Желаемая дата<input type="date" name="date" min="${today}" value="${safe(order.date)}"></label></div>
    <label class="form-field" id="address-field" ${order.method==='Доставка'?'':'hidden'}>Адрес в Бердске<input name="address" autocomplete="off" placeholder="Улица, дом" maxlength="200" value="${safe(order.address)}"></label>
    <label class="form-field">Бюджет, ₽<input type="number" min="1" max="10000000" step="1" inputmode="numeric" name="budget" placeholder="По желанию" value="${safe(order.budget)}"></label>
    <label class="form-field">Пожелания<textarea name="note" rows="3" placeholder="Любимые цветы, повод или вопросы" maxlength="1000">${safe(order.note)}</textarea></label>
    <p class="form-note">Подготовим текст для Telegram или почты. Состав и цену подтвердит флорист в переписке.</p><button class="btn primary" type="submit">Подготовить сообщение</button></form></div>`);
}
function messageText() {
  const lines = ['Здравствуйте! Хочу заказать букет в «Розмарине».'];
  if(order.item) lines.push('Понравился букет «'+order.item.title+'».', 'Фото: '+order.item.source);
  if(order.palette) lines.push('Палитра: '+order.palette+'.');
  lines.push('Получение: '+order.method+'.');
  if(order.method === 'Доставка' && order.address) lines.push('Адрес: '+order.address);
  if(order.date) lines.push('Желаемая дата: '+order.date.split('-').reverse().join('.'));
  if(order.budget) lines.push('Бюджет: '+order.budget+' ₽.');
  if(order.note) lines.push(order.note);
  lines.push('Подскажите, какие цветы есть в наличии и сколько будет стоить заказ?');
  return lines.join('\n');
}
function orderPreview() {
  const message = messageText();
  const body = encodeURIComponent(message);
  showModal(`<div class="dialog-inner"><button class="textbtn back-link" data-edit>Изменить детали</button>
    <h2 id="modal-title">Сообщение флористу</h2><p>Откройте черновик и отправьте его в Telegram или по почте.</p>
    <div class="draft">${safe(message)}</div>
    <div class="send-actions"><a class="btn primary" href="https://t.me/+79139102024?text=${body}" target="_blank" rel="noopener">В Telegram</a>
    <a class="btn outline" href="mailto:mashk88@mail.ru?subject=${encodeURIComponent('Заказ букета в Розмарине')}&amp;body=${body}">По почте</a></div>
    <button class="textbtn" data-copy>Скопировать текст</button><span class="feedback" role="status"></span></div>`);
}
async function copyDraft() {
  try {
    await navigator.clipboard.writeText(messageText());
    $('.feedback').textContent = 'Текст скопирован';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents($('.draft'));
    selection.removeAllRanges();selection.addRange(range);
    $('.feedback').textContent = 'Текст выделен. Выберите «Копировать».';
  }
}
function setMenu(open) {
  $('#mobile-nav').hidden = !open;
  $('.menu-toggle').setAttribute('aria-expanded', String(open));
  $('.menu-toggle').setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  $('.menu-toggle').innerHTML = icon(open ? 'close' : 'menu');
}
document.addEventListener('click', event => {
  const el = event.target.closest('button, a');
  if(!$('#mobile-nav').hidden && (!event.target.closest('#mobile-nav, .menu-toggle') || event.target.closest('#mobile-nav a'))) setMenu(false);
  if(!el) return;
  const data = el.dataset;
  if(el.matches('.menu-toggle')) return setMenu($('#mobile-nav').hidden);
  if(el.matches('.dialog-close')) return closeModal();
  if('filter' in data){
    activeFilter = data.filter;visible = 3;renderCatalog();$('#filters [aria-pressed="true"]').focus({preventScroll:true});return;
  }
  if(el.id==='more'){
    const firstNew = $('#products').children.length;
    visible += 6;renderCatalog();$('#products').children[firstNew]?.querySelector('.card-open').focus({preventScroll:true});return;
  }
  if('favorite' in data){
    const item = bouquetById(data.favorite);
    if(favorites.has(item.id)) favorites.delete(item.id);else favorites.add(item.id);
    try { localStorage.setItem(storageKey,JSON.stringify([...favorites])); } catch {}
    el.setAttribute('aria-pressed',String(favorites.has(item.id)));el.setAttribute('aria-label',favoriteLabel(item));updateFavCount();return;
  }
  if('product' in data || 'savedProduct' in data) return productDetails(bouquetById(data.product || data.savedProduct),'savedProduct' in data);
  if('saved' in data) return savedList();
  if('browse' in data){closeModal();$('#catalog').scrollIntoView();return;}
  if('palette' in data){activePalette = palettes.find(p=>p.id===data.palette);displayPalette();$('#swatches [aria-pressed="true"]').focus({preventScroll:true});return;}
  if(el.id==='palette-order') return startOrder(null,activePalette.name);
  if('delivery' in data) return startOrder(null,'','Доставка');
  if('order' in data || 'orderProduct' in data) return startOrder(bouquetById(data.orderProduct));
  if('edit' in data) return orderForm();
  if('copy' in data) return copyDraft();
  if('zoom' in data) return showModal('<img src="assets/hero.webp" alt="Композиция из садовых роз, георгинов и космей крупным планом"><h2 id="modal-title">Садовые розы и георгины · иллюстрация</h2>','full-photo');
  if('prices' in data) return showModal(`<div class="dialog-inner"><h2 id="modal-title">Прайс салона</h2><p class="note">Цены из <a class="source-inline" href="https://yandex.ru/maps/org/rozmarin/36440959505/prices/" target="_blank" rel="noopener">прайса салона</a> от 16 января 2026 года. Флорист уточнит стоимость на дату заказа.</p><ul class="price-list">${priceList.map(p=>`<li><span>${safe(p.title)}</span><b>${Number(p.price).toLocaleString('ru-RU')} ₽</b></li>`).join('')}</ul><button class="btn primary" data-order>Уточнить стоимость</button></div>`);
});
document.addEventListener('change', event => {
  if(event.target.matches('#order-form [name=method]')) $('#address-field').hidden = event.target.value !== 'Доставка';
});
document.addEventListener('submit', event => {
  if(event.target.id !== 'order-form') return;
  event.preventDefault();
  for(const [key,value] of new FormData(event.target)) order[key] = String(value).trim();
  orderPreview();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && !$('#mobile-nav').hidden){setMenu(false);$('.menu-toggle').focus();}
});
renderCatalog();updateFavCount();displayPalette();
