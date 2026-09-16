// Fictional street map: draw address ranges; compare location and dates.
const plannerCopy = {
  de: {
    label:'INTERAKTIVE DEMO', title:'Wo wird gebaut?', help:'Straße antippen oder einen Bauabschnitt ziehen.', note:'Fiktive Karte',
    main:'Musterstraße', park:'Parkstraße', water:'Wasserleitung · W2–3', fibre:'Deine Glasfaser-Baustelle', dates:'Glasfaser-Termin', same:'Woche 2–3', later:'Woche 4–5', reset:'Zurücksetzen',
    draw:'Bauabschnitt einzeichnen auf', numbers:'Nr.', week:'Woche', weeks:'Wochen',
    pending:'Wähle einen Bauabschnitt.', pendingDetail:'Die Wasserleitung ist bereits eingeplant.', conflict:'Konflikt erkannt', clear:'Kein Konflikt',
    occupied:'gleichzeitig belegt. Abschnitt oder Termin ändern.', otherRoad:'Andere Straße: Die Baustellen liegen räumlich getrennt.', otherSection:'Die Straßenabschnitte überschneiden sich nicht.', otherTime:'Gleicher Abschnitt, anderer Zeitraum: Die Arbeiten sind abgestimmt.',
  },
  en: {
    label:'INTERACTIVE DEMO', title:'Where does the work go?', help:'Tap a street or drag to draw a work section.', note:'Fictional map',
    main:'Sample Street', park:'Park Street', water:'Water main · W2–3', fibre:'Your fibre installation', dates:'Fibre works dates', same:'Weeks 2–3', later:'Weeks 4–5', reset:'Reset',
    draw:'Draw a work section on', numbers:'Nos.', week:'Week', weeks:'Weeks',
    pending:'Choose a work section.', pendingDetail:'The water main works are already scheduled.', conflict:'Conflict detected', clear:'No conflict',
    occupied:'occupied at the same time. Change the section or dates.', otherRoad:'Different streets: The construction sites are separate.', otherSection:'The street sections do not overlap.', otherTime:'Same section, different dates: The works are coordinated.',
  }
};
const plannerWater = Object.freeze({road:'main',first:10,last:18,start:2,duration:2});
let plannerState = {selection:null,start:2};
function plannerConflict(selection = plannerState.selection, start = plannerState.start) {
  if (!selection || selection.road !== plannerWater.road) return null;
  const first = Math.max(selection.first,plannerWater.first), last = Math.min(selection.last,plannerWater.last);
  const from = Math.max(start,plannerWater.start), to = Math.min(start+1,plannerWater.start+plannerWater.duration-1);
  return first <= last && from <= to ? {first,last,from,to} : null;
}
function plannerSection(road,from,to = from) {
  if (!['main','park'].includes(road) || !Number.isFinite(from) || !Number.isFinite(to)) return null;
  const clamp = value=>Math.min(40,Math.max(1,Math.round(value)));
  let first = Math.min(clamp(from),clamp(to)), last = Math.max(clamp(from),clamp(to));
  // A tap places a short section; a drag snaps its endpoints to house numbers.
  if (last-first < 3) {first = Math.min(32,Math.max(1,clamp(from)-4));last = first+8;}
  return {road,first,last};
}
function plannerFeedbackMarkup() {
  const t = plannerCopy[lang], {selection,start} = plannerState, conflict = plannerConflict();
  let title = t.pending, detail = t.pendingDetail;
  if (selection) {
    title = conflict ? t.conflict : t.clear;
    if (conflict) detail = `${t.main}: ${t.numbers} ${conflict.first}–${conflict.last} ${t.occupied}`;
    else if (selection.road !== plannerWater.road) detail = t.otherRoad;
    else if (selection.last < plannerWater.first || selection.first > plannerWater.last) detail = t.otherSection;
    else detail = t.otherTime;
  }
  return `${icon(conflict ? 'alert' : selection ? 'check' : 'arrow')}<div><strong>${title}</strong><p>${detail}</p></div>`;
}
function plannerLayerMarkup(road) {
  const t = plannerCopy[lang], selected = plannerState.selection, selection = selected && selected.road === road ? selected : null;
  const conflict = plannerConflict();
  return `${road === 'main' ? '<span class="map-water-work" aria-hidden="true"></span>' : ''}
    <span class="map-new-work" data-work="${road}" ${selection ? '' : 'hidden'} style="--first:${selection ? selection.first-1 : 0};--length:${selection ? selection.last-selection.first+1 : 0}" aria-hidden="true"></span>
    <span class="map-overlap" data-overlap="${road}" ${road === 'main' && conflict ? '' : 'hidden'} style="--first:${conflict ? conflict.first-1 : 0};--length:${conflict ? conflict.last-conflict.first+1 : 0}" aria-hidden="true"></span>
    <span class="map-road-label">${t[road]}</span>
    <span class="map-address" data-address="${road}">${selection ? `${t.numbers} ${selection.first}–${selection.last}` : ''}</span>`;
}
function plannerMarkup() {
  const t = plannerCopy[lang], conflict = plannerConflict();
  return `<div class="map-demo" id="construction-demo">
    <div class="map-heading"><div><p class="eyebrow">${t.label}</p><h4>${t.title}</h4></div><span>${t.note}</span></div>
    <p class="map-instructions" id="map-instructions">${t.help}</p>
    <div class="map-toolbar"><div class="map-legend"><span><i class="water-key" aria-hidden="true"></i>${t.water}</span><span><i class="fibre-key" aria-hidden="true"></i>${t.fibre}</span></div><div class="map-actions"><label for="planner-period">${t.dates}</label><select id="planner-period"><option value="2" ${plannerState.start === 2 ? 'selected' : ''}>${t.same}</option><option value="4" ${plannerState.start === 4 ? 'selected' : ''}>${t.later}</option></select><button type="button" class="reset-button" id="reset-planner" aria-label="${t.reset}" title="${t.reset}">${icon('refresh')}</button></div></div>
    <div class="street-map">
      <svg class="map-connections" viewBox="0 0 600 190" preserveAspectRatio="none" aria-hidden="true"><path class="road-border" d="M150 8V182M450 8V182"/><path class="road-fill" d="M150 8V182M450 8V182"/><path class="road-center" d="M150 8V182M450 8V182"/></svg>
      ${['main','park'].map(road=>`<button type="button" class="map-road road-${road}" data-road="${road}" aria-label="${t.draw} ${t[road]}" aria-describedby="map-instructions" aria-pressed="${plannerState.selection?.road === road}"><span class="map-road-surface" aria-hidden="true"></span>${plannerLayerMarkup(road)}</button>`).join('')}
    </div>
    <div class="map-feedback ${conflict ? 'has-conflict' : plannerState.selection ? 'is-clear' : ''}" id="planner-feedback" role="status" aria-live="polite" aria-atomic="true">${plannerFeedbackMarkup()}</div>
  </div>`;
}
function paintPlannerMap(selection = plannerState.selection) {
  const t = plannerCopy[lang], conflict = plannerConflict(selection);
  for (const road of ['main','park']) {
    const active = selection && selection.road === road;
    const work = document.querySelector(`[data-work="${road}"]`), overlap = document.querySelector(`[data-overlap="${road}"]`);
    work.hidden = !active;
    if (active) {work.style.setProperty('--first',String(selection.first-1));work.style.setProperty('--length',String(selection.last-selection.first+1));}
    overlap.hidden = road !== 'main' || !conflict;
    if (conflict) {overlap.style.setProperty('--first',String(conflict.first-1));overlap.style.setProperty('--length',String(conflict.last-conflict.first+1));}
    document.querySelector(`[data-address="${road}"]`).textContent = active ? `${t.numbers} ${selection.first}–${selection.last}` : '';
    document.querySelector(`[data-road="${road}"]`).setAttribute('aria-pressed',String(Boolean(active)));
  }
}
function updatePlanner() {
  paintPlannerMap();
  const feedback = document.querySelector('#planner-feedback');
  feedback.className = `map-feedback ${plannerConflict() ? 'has-conflict' : plannerState.selection ? 'is-clear' : ''}`;
  feedback.innerHTML = plannerFeedbackMarkup();
  document.querySelector('#planner-period').value = String(plannerState.start);
}
function placePlannerSection(road,from,to = from) {
  const selection = plannerSection(road,from,to);
  if (!selection) return;
  plannerState.selection = selection;
  updatePlanner();
}
function setPlannerPeriod(value) {
  if (![2,4].includes(value)) return;
  plannerState.start = value;
  updatePlanner();
}
function resetPlanner() {plannerState = {selection:null,start:2};updatePlanner();}
function bindPlanner() {
  document.querySelector('#planner-period').addEventListener('change',event=>setPlannerPeriod(Number(event.target.value)));
  document.querySelector('#reset-planner').addEventListener('click',resetPlanner);
  document.querySelectorAll('[data-road]').forEach(button=>{
    let drawing = null;
    const address = event=>{const rect = button.getBoundingClientRect();return 1+(event.clientX-rect.left)/rect.width*39;};
    button.addEventListener('pointerdown',event=>{
      if (event.button !== 0 || !event.isPrimary) return;
      drawing = {pointer:event.pointerId,from:address(event)};
      button.setPointerCapture(event.pointerId);
      paintPlannerMap(plannerSection(button.dataset.road,drawing.from));
    });
    button.addEventListener('pointermove',event=>{
      if (drawing?.pointer === event.pointerId) paintPlannerMap(plannerSection(button.dataset.road,drawing.from,address(event)));
    });
    button.addEventListener('pointerup',event=>{
      if (drawing?.pointer !== event.pointerId) return;
      placePlannerSection(button.dataset.road,drawing.from,address(event));drawing = null;
      button.releasePointerCapture(event.pointerId);
    });
    const cancel = ()=>{drawing = null;paintPlannerMap();};
    button.addEventListener('pointercancel',cancel);
    button.addEventListener('lostpointercapture',cancel);
    // Native keyboard activation uses a sample section, with no drag required.
    button.addEventListener('click',event=>{if (event.detail === 0) placePlannerSection(button.dataset.road,14,22);});
  });
}
