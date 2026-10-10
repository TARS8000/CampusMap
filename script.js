const defaultCenter = [35.6257964, 139.3423068];
const map = L.map('map', { zoomControl: false }).setView(defaultCenter, 16);
const mapPanel = document.querySelector('.map-panel');

map.on('popupopen', () => mapPanel.classList.add('has-popup'));
map.on('popupclose', () => mapPanel.classList.remove('has-popup'));

L.control.zoom({ position: 'bottomright' }).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'
}).addTo(map);

const campusLocations = [
  { number: 1, name: '体育館', point: [35.625723942352074, 139.3450713157654] },
  { number: 2, name: '研究棟C', point: [35.62495795439345, 139.3437194824219] },
  { number: 3, name: '講義棟D', point: [35.624914036810964, 139.34270024299624] },
  { number: 4, name: '実験棟A', point: [35.6254975763758, 139.34397697448733] },
  { number: 5, name: '講義実験棟', point: [35.62532314364194, 139.34315085411075] },
  { number: 6, name: '研究棟A', point: [35.62529705930999, 139.34238910675052] },
  { number: 7, name: 'メディアホール', point: [35.62430298392684, 139.34041500091556] },
  { number: 8, name: '講義棟A', point: [35.62574101615574, 139.3427807092667] },
  { number: 9, name: '厚生棟', point: [35.62610764967885, 139.34217453002933] },
  { number: 10, name: '図書館棟', point: [35.62544449605463, 139.34091925621036] },
  { number: 11, name: 'FOODS FUU', point: [35.62670076995041, 139.3420779705048] },
  { number: 12, name: '本部棟', point: [35.626403795576365, 139.3393421173096] },
  { number: 13, name: '片柳研究所棟', point: [35.62784344914419, 139.33998584747317] }
];
const campusLayer = L.layerGroup().addTo(map);
const lcIcon = L.divIcon({
  className: 'lc-map-pin-wrapper',
  html: '<span class="lc-map-pin"><img src="https://koukasai.jp/2026/images/uploads/LinuxClub.jpg" alt="LC"></span>',
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  popupAnchor: [0, -24]
});
const festivalEvents = []; const legacyFestivalEvents = [
  { name: '紅華祭会場 01', point: [35.62428300816012, 139.34041626176355], count: 2 },
  { name: '紅華祭会場 02', point: [35.62439411663992, 139.341538139576], count: 4 },
  { name: '紅華祭会場 03', point: [35.624465084031165, 139.3426767980478], count: 3 },
  {
    name: '模擬店Eエリア',
    point: [35.624722750831275, 139.3414202228718],
    count: 17,
    events: [
      '名画座「Churros」（チュロス）',
      'ぱちだ商店（フランクフルト）',
      '縁結び焼きそば',
      '肉マッチョおにぎり（肉巻きおにぎり串）',
      '東京工科大生が本気で作った超精密チキンステーキ',
      'POPCORN-STUDIO',
      'KONAMON SPIKE（はしまき）',
      'Creators（オリジナルグッズ）',
      'ふ茶（フルーツティー）',
      'あげたま（揚げたこ焼き）',
      'パンタスティック！！ あげぱん',
      'チョコチョコバナこ',
      '射的',
      'Wand Churros 魔法の杖チュロス',
      'ワクテル モクテル（ノンアルコールカクテル）',
      '餃子一筋35年',
      '海外ヌードルフライ（東南アジア焼きそば）'
    ]
  },
  { name: '紅華祭会場 05', point: [35.62484745168971, 139.34019367253512], count: 6 },
  { name: '紅華祭会場 06', point: [35.62485558034341, 139.342717343866], count: 1 },
  { name: '紅華祭会場 07', point: [35.62499865170694, 139.34187758782753], count: 4 },
  { name: '紅華祭会場 08', point: [35.625169158559004, 139.34403352722063], count: 4 },
  { name: '紅華祭会場 09', point: [35.625211121365865, 139.3420478597819], count: 6 },
  { name: '紅華祭会場 10', point: [35.625278910512634, 139.34303552466167], count: 6 },
  { name: '紅華祭会場 11', point: [35.62533592873059, 139.34233758667145], count: 3 },
  { name: '紅華祭会場 12', point: [35.62542654657374, 139.33991713639014], count: 3 },
  { name: 'Dエリア 講義実験棟1階', point: [35.62552725248436, 139.3428766623677], count: 18, events: ['模擬店総選挙（10/11・10/12）'] },
  { name: '図書館棟1階', point: [35.62556867203001, 139.34102126080174], count: 2, events: ['高校生受付・入学相談', '入学希望者向けキャンパスツアー'] },
  { name: '紅華祭会場 15', point: [35.62570820973914, 139.3413907185733], count: 2 },
  { name: '体育館 稽古場AB', point: [35.62571266678547, 139.34503618763955], count: 3, events: ['声優コース成果発表 朗読劇（10/11）'] },
  { name: '紅華祭会場 17', point: [35.62573128843004, 139.34270351221915], count: 4 },
  { name: 'メインステージ', point: [35.62586892996602, 139.34148859795766], count: 10, events: ['メインステージ企画・ライブ・公演・抽選会'] },
  { name: '厚生棟2F 出口前広場', point: [35.62605869896041, 139.3419923650103], count: 4, events: ['若きつくりびとSHOP', '学科成果発表・イラスト展示'] },
  { name: '紅華祭会場 20', point: [35.62611571316914, 139.34458116086884], count: 3 },
  { name: '紅華祭会場 21', point: [35.626450815498394, 139.34527634716463], count: 1 },
  { name: '紅華祭会場 22', point: [35.626779899325484, 139.34223594930157], count: 2 },
  { name: '紅華祭会場 23', point: [35.626817322059665, 139.34364340804825], count: 2 },
  { name: '紅華祭会場 24', point: [35.62718082174156, 139.34187285209848], count: 2 },
  { name: '紅華祭会場 25', point: [35.627217595950924, 139.34153646040488], count: 1 },
  { name: '片柳研究所・前', point: [35.62777007037087, 139.339915745552], count: 11, events: ['KOUKA QUEST スペシャルトーク', '山寺宏一 HACHIOJI SPECIAL SESSION', '紅華祭 秋のお笑いクエスト', '自動運転バス車両の展示'] }
];

const festivalLayer = L.layerGroup().addTo(map);
const schoolBusLayer = L.layerGroup().addTo(map);
const schoolBusIcon = L.divIcon({
  className: 'school-bus-map-pin-wrapper',
  html: '<span class="school-bus-map-pin" aria-hidden="true">🚌</span>',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -24]
});
[
  { point: [35.627075, 139.339485], label: '八王子駅行きスクールバス' },
  { point: [35.625081, 139.341018], label: '八王子みなみ野駅行きスクールバス' }
].forEach((stop) => {
  L.marker(stop.point, { icon: schoolBusIcon, zIndexOffset: 1200 })
    .addTo(schoolBusLayer)
    .bindPopup(`<strong>${stop.label}</strong>`)
    .bindTooltip(stop.label, { direction: 'top', offset: [0, -20] });
});
const eventListElement = document.querySelector('#event-list');
const eventCountLabel = document.querySelector('#event-count-label');
const eventSearchInput = document.querySelector('#event-search-input');
const eventSearchClear = document.querySelector('#event-search-clear');
const eventSchoolFilter = document.querySelector('#event-school-filter');
const eventDayFilter = document.querySelector('#event-day-filter');
festivalEvents.forEach((venue) => {
  const icon = L.divIcon({
    className: 'festival-map-pin-wrapper',
    html: '<span class="festival-map-pin">祭</span>',
    iconSize: [32, 32],
    iconAnchor: [16, 30],
    popupAnchor: [0, -28]
  });
  const eventList = venue.events
    ? venue.events.map((event) => `<li>${event}</li>`).join('')
    : `<li>登録イベント ${venue.count}件</li>`;
  L.marker(venue.point, { icon })
    .addTo(festivalLayer)
    .bindPopup(`<strong>紅華祭｜${venue.name}</strong><ul class="festival-popup-list">${eventList}</ul>`)
    .bindTooltip(`紅華祭：${venue.name}`, { direction: 'top', offset: [0, -24] });
});

fetch('events.json')
  .then((response) => response.json())
  .then((festivalData) => {
    window.festivalData = festivalData;
    renderEventList(festivalData, '', '', '');
    festivalData.venues.forEach((venue) => {
      const point = [venue.coordinates.latitude, venue.coordinates.longitude];
      const icon = venue.events.some(isFeaturedEvent) ? lcIcon : L.divIcon({
        className: 'festival-map-pin-wrapper',
        html: '<span class="festival-map-pin">祭</span>',
        iconSize: [32, 32],
        iconAnchor: [16, 30],
        popupAnchor: [0, -28]
      });
      const eventList = venue.events.map((event) => {
        const metadata = [event.organization, ...event.categories, event.schedule || event.dates.join('・')].filter(Boolean).join(' / ');
        return `<li>${eventImageMarkup(event, 'festival-event-icon')}<span><strong>${event.title}</strong><br><small>${metadata}</small></span></li>`;
      }).join('');
      L.marker(point, { icon, zIndexOffset: venue.events.some(isFeaturedEvent) ? 1000 : 0 })
        .addTo(festivalLayer)
        .bindPopup(`<strong>紅華祭｜${venue.name}</strong><ul class="festival-popup-list">${eventList}</ul>`)
        .bindTooltip(`紅華祭：${venue.name}`, { direction: 'top', offset: [0, -24] });
    });
  })
  .catch(() => {
    statusDetail.textContent = '紅華祭イベントデータを読み込めませんでした。';
  });

function renderEventList(festivalData, query, schoolFilter, dayFilter) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchedVenues = festivalData.venues.map((venue) => ({
    ...venue,
    events: venue.events.filter((event) => {
      const searchableText = [
        venue.name,
        event.title,
        event.organization,
        ...(event.categories || []),
        ...(event.dates || []),
        event.schedule
      ].filter(Boolean).join(' ').toLocaleLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesSchool = !schoolFilter || getEventSchoolType(event, venue) === schoolFilter;
      const matchesDay = !dayFilter || matchesEventDay(event, dayFilter);
      return matchesQuery && matchesSchool && matchesDay;
    })
  })).filter((venue) => venue.events.length > 0);
  const matchedEvents = matchedVenues.reduce((total, venue) => total + venue.events.length, 0);
  const totalEvents = festivalData.venues.reduce((total, venue) => total + venue.events.length, 0);
  const hasFilter = normalizedQuery || schoolFilter || dayFilter;
  eventCountLabel.textContent = hasFilter
    ? `絞り込み結果 ${matchedVenues.length}会場 / ${matchedEvents}件（全${totalEvents}件）`
    : `${festivalData.venues.length}会場 / ${totalEvents}イベント`;
  eventSearchClear.disabled = !normalizedQuery;
  eventListElement.innerHTML = matchedVenues.length
    ? matchedVenues.map((venue) => `
      <article class="event-venue">
        <div class="event-venue-heading">
          <h3>${venue.name}</h3>
          <span>${venue.events.length}件</span>
        </div>
        <ul>${venue.events.map((event) => `<li class="event-item">${eventImageMarkup(event, 'event-item-icon')}<span><strong>${event.title}</strong><small>${[event.organization, ...(event.categories || []), event.schedule || (event.dates || []).join('・')].filter(Boolean).join(' / ')}</small></span></li>`).join('')}</ul>
      </article>
    `).join('')
    : '<p class="event-empty">条件に一致するイベントがありません。</p>';
}

function eventImageMarkup(event, className) {
  return event.image ? `<img class="${className}" src="${event.image}" alt="" loading="lazy">` : '';
}

function getEventSchoolType(event, venue) {
  const searchableText = [event.title, event.organization, venue.name, ...(event.categories || [])].filter(Boolean).join(' ');
  return /専門学校|日本工学院|カレッジ|科(?:・|／|（|$)/.test(searchableText) ? 'specialized' : 'university';
}

function matchesEventDay(event, dayFilter) {
  const dates = event.dates || [];
  if (dayFilter === 'day1') return dates.includes('10/11');
  if (dayFilter === 'day2') return dates.includes('10/12');
  if (dayFilter === 'both') return dates.includes('10/11') && dates.includes('10/12');
  return true;
}

function isFeaturedEvent(event) {
  return event.title === '成果物展示会' && event.organization === 'Linux Club';
}

eventSearchInput.addEventListener('input', () => {
  if (window.festivalData) {
    renderEventList(window.festivalData, eventSearchInput.value, eventSchoolFilter.value, eventDayFilter.value);
  }
});
eventSchoolFilter.addEventListener('change', () => {
  if (window.festivalData) {
    renderEventList(window.festivalData, eventSearchInput.value, eventSchoolFilter.value, eventDayFilter.value);
  }
});
eventDayFilter.addEventListener('change', () => {
  if (window.festivalData) {
    renderEventList(window.festivalData, eventSearchInput.value, eventSchoolFilter.value, eventDayFilter.value);
  }
});
eventSearchClear.addEventListener('click', () => {
  eventSearchInput.value = '';
  eventSearchInput.focus();
  if (window.festivalData) {
    renderEventList(window.festivalData, '', eventSchoolFilter.value, eventDayFilter.value);
  }
});

campusLocations.forEach((facility) => {
  const point = facility.point;
  facility.point = point;
  const icon = L.divIcon({
    className: 'campus-map-pin-wrapper',
    html: `<span class="campus-map-pin"><span>${facility.number}</span></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 26],
    popupAnchor: [0, -24]
  });
  L.marker(point, { icon })
    .addTo(campusLayer)
    .bindPopup(`<strong>${facility.number}. ${facility.name}</strong><br><small>緯度 ${point[0].toFixed(6)} / 経度 ${point[1].toFixed(6)}</small>`)
    .bindTooltip(facility.name, { direction: 'top', offset: [0, -20] });
});

let mapLocateButton;
let mapDefaultButton;
const locateControl = L.control({ position: 'bottomleft' });
locateControl.onAdd = () => {
  const container = L.DomUtil.create('div', 'leaflet-bar map-locate-control');
  mapLocateButton = L.DomUtil.create('button', 'map-locate-button', container);
  mapLocateButton.type = 'button';
  mapLocateButton.title = '現在地へ移動';
  mapLocateButton.setAttribute('aria-label', '現在地へ移動');
  mapLocateButton.innerHTML = '<span class="location-triangle" aria-hidden="true"></span>';
  mapDefaultButton = L.DomUtil.create('button', 'map-default-button', container);
  mapDefaultButton.type = 'button';
  mapDefaultButton.title = '初期位置へ戻す';
  mapDefaultButton.setAttribute('aria-label', '初期位置へ戻す');
  mapDefaultButton.innerHTML = '<span aria-hidden="true">↺</span>';
  L.DomEvent.disableClickPropagation(container);
  mapLocateButton.addEventListener('click', locateUser);
  mapDefaultButton.addEventListener('click', () => {
    map.closePopup();
    map.setView(defaultCenter, 16);
  });
  return container;
};
locateControl.addTo(map);

const button = document.querySelector('#locate-button');
const statusTitle = document.querySelector('#status-title');
const statusDetail = document.querySelector('#status-detail');
const locationLabel = document.querySelector('#location-label');
const selectedFacility = document.querySelector('#selected-facility');
const campusPins = document.querySelectorAll('.campus-pin');
let locationMarker;
let accuracyCircle;

campusPins.forEach((pin) => {
  pin.addEventListener('click', () => {
    campusPins.forEach((item) => item.classList.remove('is-selected'));
    pin.classList.add('is-selected');
    selectedFacility.textContent = `選択中：${pin.dataset.facility}`;
  });
});

function showLocation(position) {
  const { latitude, longitude, accuracy } = position.coords;
  const point = [latitude, longitude];

  if (!locationMarker) {
    locationMarker = L.marker(point).addTo(map).bindPopup('現在地');
    accuracyCircle = L.circle(point, { radius: accuracy, color: '#0d5c63', fillColor: '#0d5c63', fillOpacity: 0.12, weight: 1 }).addTo(map);
  } else {
    locationMarker.setLatLng(point);
    accuracyCircle.setLatLng(point).setRadius(accuracy);
  }

  map.setView(point, 16);
  statusTitle.textContent = '現在地を表示中';
  statusDetail.textContent = `緯度 ${latitude.toFixed(5)} / 経度 ${longitude.toFixed(5)}（誤差 約${Math.round(accuracy)}m）`;
  locationLabel.textContent = '現在地を表示中';
  button.disabled = false;
  mapLocateButton.disabled = false;
  button.querySelector('span:last-child').textContent = '現在地を更新';
}

function showError(error) {
  const messages = {
    1: '位置情報の利用が許可されませんでした。',
    2: '現在地を取得できませんでした。',
    3: '位置情報の取得がタイムアウトしました。'
  };
  statusTitle.textContent = '現在地を取得できません';
  statusDetail.textContent = messages[error.code] || 'ブラウザの位置情報設定を確認してください。';
  locationLabel.textContent = '位置情報を待っています';
  button.disabled = false;
  mapLocateButton.disabled = false;
  button.querySelector('span:last-child').textContent = 'もう一度試す';
}

function locateUser() {
  if (!navigator.geolocation) {
    showError({ code: 0 });
    return;
  }

  button.disabled = true;
  mapLocateButton.disabled = true;
  statusTitle.textContent = '現在地を探しています';
  statusDetail.textContent = 'ブラウザの位置情報を確認中です。';
  locationLabel.textContent = '現在地を探しています';
  navigator.geolocation.getCurrentPosition(showLocation, showError, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  });
}

button.addEventListener('click', locateUser);