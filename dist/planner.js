// Fictional example of Bauilify's location-and-time conflict check.
const plannerCopy = {
  de: {
    label:'INTERAKTIVE DEMO', title:'Drei Baustellen. Ein gemeinsamer Plan.', help:'Verschiebe den Glasfaserausbau und löse den Planungskonflikt.', note:'Fiktives Beispiel · vereinfachte Wochenplanung',
    street:'Musterstraße', section:'Hausnummern', water:'Wasserleitung', fibre:'Glasfaserausbau', power:'Stromleitung', fixed:'Termin steht', movable:'Deine Planung',
    start:'Startwoche für Glasfaser', startAt:'Start in Woche', duration:'Dauer: 2 Wochen', reset:'Zurücksetzen', week:'Woche', weeks:'Wochen', short:'W',
    conflict:'Ein Planungskonflikt', solved:'Konflikt gelöst', overlap:'Wasserleitung und Glasfaser überschneiden sich:', overlapAt:'bei den Hausnummern',
    solution:'Die Arbeiten im selben Abschnitt finden jetzt zu unterschiedlichen Zeiten statt.', next:'Wähle eine andere Startwoche für den Glasfaserausbau.',
    takeaway:'Die Stromleitung liegt bei Nr. 40–48. Sie darf zeitgleich geplant werden, weil sie einen anderen Abschnitt betrifft.', schedule:'Bauzeiten auf der Musterstraße, Woche 1 bis 6',
  },
  en: {
    label:'INTERACTIVE DEMO', title:'Three projects. One shared plan.', help:'Move the fibre installation to resolve the scheduling conflict.', note:'Fictional example · simplified weekly planning',
    street:'Sample Street', section:'House numbers', water:'Water main', fibre:'Fibre installation', power:'Power cable', fixed:'Fixed dates', movable:'Your plan',
    start:'Fibre installation start week', startAt:'Start in week', duration:'Duration: 2 weeks', reset:'Reset', week:'Week', weeks:'Weeks', short:'W',
    conflict:'One scheduling conflict', solved:'Conflict resolved', overlap:'The water main and fibre works overlap:', overlapAt:'at house numbers',
    solution:'Work on the same section now takes place at different times.', next:'Choose another start week for the fibre installation.',
    takeaway:'The power cable works cover nos. 40–48. They can take place at the same time because they affect a different section.', schedule:'Construction schedule on Sample Street, weeks 1 to 6',
  }
};
let plannerStart = 3;
const plannerInitialStart = 3;
function plannerProjects(start = plannerStart) {
  return [
    {id:'water', street:'sample', first:10, last:18, start:2, duration:2},
    {id:'fibre', street:'sample', first:14, last:22, start, duration:2},
    {id:'power', street:'sample', first:40, last:48, start:3, duration:2}
  ];
}
function plannerConflicts(start = plannerStart) {
  const projects = plannerProjects(start), conflicts = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i], b = projects[j];
      const first = Math.max(a.first,b.first), last = Math.min(a.last,b.last);
      const from = Math.max(a.start,b.start), to = Math.min(a.start+a.duration-1,b.start+b.duration-1);
      if (a.street === b.street && first <= last && from <= to) conflicts.push({a:a.id,b:b.id,first,last,from,to});
    }
  }
  return conflicts;
}
function plannerRange(t,from,to,short = false) {
  return `${short ? t.short : from === to ? t.week+' ' : t.weeks+' '}${from}${from === to ? '' : '–'+to}`;
}
function plannerFeedbackMarkup() {
  const t = plannerCopy[lang], conflict = plannerConflicts()[0];
  const detail = conflict ? `${t.overlap} ${plannerRange(t,conflict.from,conflict.to)} ${t.overlapAt} ${conflict.first}–${conflict.last}.` : t.solution;
  return `${icon(conflict ? 'alert' : 'check')}<div><strong>${conflict ? t.conflict : t.solved}</strong><p>${detail}</p>${conflict ? `<p class="planner-hint">${t.next}</p>` : ''}</div>`;
}
function plannerMarkup() {
  const t = plannerCopy[lang], conflict = plannerConflicts()[0];
  return `<div class="planner-demo" id="construction-demo">
    <div class="planner-heading"><div><p class="eyebrow">${t.label}</p><h4>${t.title}</h4><p>${t.help}</p></div><span class="planner-note">${t.note}</span></div>
    <div class="planner-layout"><div class="planner-controls">
      <p class="planner-street">${t.street}</p><p class="planner-section">${t.section} 14–22</p>
      <fieldset><legend>${t.start}</legend><div class="planner-options">${[1,2,3,4,5].map(week=>`<button type="button" data-start-week="${week}" aria-label="${t.startAt} ${week}" aria-pressed="${plannerStart === week}">${t.short}${week}</button>`).join('')}</div></fieldset>
      <p class="planner-duration">${t.duration}</p><button type="button" id="reset-planner" class="reset-button">${icon('refresh')}${t.reset}</button>
    </div><div class="planner-board" role="group" aria-label="${t.schedule}">
      <div class="planner-weeks" aria-hidden="true">${[1,2,3,4,5,6].map(week=>`<span>${t.short}${week}</span>`).join('')}</div>
      ${plannerProjects().map(project=>`<div class="planner-row"><div class="planner-row-label"><strong>${t[project.id]}</strong><span>${t.section} ${project.first}–${project.last}</span></div>
        <div class="planner-track"><div class="planner-bar ${project.id}" ${project.id === 'fibre' ? 'id="fibre-bar"' : ''} style="--start:${project.start-1};--duration:${project.duration}"><span ${project.id === 'fibre' ? 'id="fibre-range"' : ''}>${plannerRange(t,project.start,project.start+project.duration-1,true)}</span></div>${project.id !== 'power' ? `<span class="planner-overlap" data-overlap aria-hidden="true" ${conflict ? '' : 'hidden'} style="--start:${conflict ? conflict.from-1 : 0};--duration:${conflict ? conflict.to-conflict.from+1 : 0}"></span>` : ''}</div>
        <span class="planner-row-note">${project.id === 'fibre' ? t.movable : t.fixed}</span></div>`).join('')}
    </div></div>
    <div class="planner-feedback ${conflict ? 'has-conflict' : 'is-clear'}" id="planner-feedback" role="status" aria-live="polite" aria-atomic="true">${plannerFeedbackMarkup()}</div>
    <p class="planner-takeaway">${t.takeaway}</p>
  </div>`;
}
function updatePlanner(start) {
  if (!Number.isInteger(start) || start < 1 || start > 5) return;
  plannerStart = start;
  const t = plannerCopy[lang], conflict = plannerConflicts()[0];
  document.querySelectorAll('[data-start-week]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.startWeek) === start)));
  document.querySelector('#fibre-bar').style.setProperty('--start',String(start-1));
  document.querySelector('#fibre-range').textContent = plannerRange(t,start,start+1,true);
  document.querySelectorAll('[data-overlap]').forEach(band=>{
    band.hidden = !conflict;
    if (conflict) {band.style.setProperty('--start',String(conflict.from-1));band.style.setProperty('--duration',String(conflict.to-conflict.from+1));}
  });
  const feedback = document.querySelector('#planner-feedback');
  feedback.className = `planner-feedback ${conflict ? 'has-conflict' : 'is-clear'}`;
  feedback.innerHTML = plannerFeedbackMarkup();
}
function bindPlanner() {
  document.querySelectorAll('[data-start-week]').forEach(button=>button.addEventListener('click',()=>updatePlanner(Number(button.dataset.startWeek))));
  document.querySelector('#reset-planner').addEventListener('click',()=>updatePlanner(plannerInitialStart));
}
