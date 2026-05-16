// ===== UI HELPERS =====

let typeTimer = null;

function showScreen(id, cb) {
  const overlay = document.getElementById('transition-overlay');
  overlay.classList.add('active');
  setTimeout(() => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    overlay.classList.remove('active');
    if (cb) cb();
  }, 150);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

function typeText(text, cb) {
  const el     = document.getElementById('dialogue-text');
  const cursor = document.getElementById('dialogue-cursor');
  el.textContent = '';
  cursor.style.display = 'inline-block';
  let i = 0;
  if (typeTimer) clearInterval(typeTimer);
  typeTimer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i++];
    } else {
      clearInterval(typeTimer);
      cursor.style.display = 'none';
      if (cb) cb();
    }
  }, 11);
}

// Animate NPC pin headers to simulate serial TX activity
function activatePins() {
  const pins = document.querySelectorAll('.npc-pin');
  pins.forEach((pin, i) => {
    setTimeout(() => pin.classList.add('active'),    i * 60);
    setTimeout(() => pin.classList.remove('active'), i * 60 + 250);
  });
}

// Flash TX LED during transmission
function flashTxLed(on) {
  const led = document.getElementById('tx-led');
  if (!led) return;
  if (on) {
    led.style.background   = 'var(--led-amber)';
    led.style.boxShadow    = '0 0 6px var(--led-amber)';
    led.style.animation    = 'ledBlink 0.3s ease-in-out infinite';
  } else {
    led.style.background   = '';
    led.style.boxShadow    = '';
    led.style.animation    = '';
  }
}

function showTyping() {
  const area = document.getElementById('chat-area');
  const dot  = document.createElement('div');
  dot.id        = 'typing-ind';
  dot.className = 'typing-indicator';
  dot.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  area.appendChild(dot);
  area.scrollTop = area.scrollHeight;

  // Animate electronics elements
  flashTxLed(true);
  activatePins();
}

function hideTyping() {
  const el = document.getElementById('typing-ind');
  if (el) el.remove();
  flashTxLed(false);
}

function renderTimeline(zoneId) {
  const area = document.getElementById('timeline-area');
  if (!area) return;
  area.innerHTML = '';

  const timelines = {
    education: {
      fr: [
        { year: '2023', title: 'CPGE MP — Lycée Saint Rémi, Roubaix', desc: 'Option Info + SI · TIPE : Algo de Shor & RSA quantique', dot: '' },
        { year: '2026', title: 'Major de promotion — 19.17/20', desc: 'Résultat concours · Admission ISTP Mines Saint-Étienne confirmée', dot: 'now' },
        { year: '2026→', title: 'Recherche contrat d\'apprentissage', desc: 'Électronique & Systèmes Embarqués · 3 sem entreprise / 4 sem école', dot: 'now' },
        { year: '2029', title: 'Diplôme Ingénieur — ISTP Mines Saint-Étienne', desc: '', dot: 'future' }
      ],
      en: [
        { year: '2023', title: 'CPGE MP — Lycée Saint Rémi, Roubaix', desc: 'CS + Engineering options · Research: Shor Algorithm & quantum RSA', dot: '' },
        { year: '2026', title: 'Top of class — 19.17/20', desc: 'Competitive exams · ISTP Mines Saint-Étienne admission confirmed', dot: 'now' },
        { year: '2026→', title: 'Seeking apprenticeship contract', desc: 'Electronics & Embedded Systems · 3 weeks company / 4 weeks school', dot: 'now' },
        { year: '2029', title: 'Engineering Degree — ISTP Mines Saint-Étienne', desc: '', dot: 'future' }
      ]
    },
    xp: {
      fr: [
        { year: '—', title: 'Assistant-Technicien Maintenance Électrique', desc: 'Diagnostic industriel · multimètre · schémas · normes sécurité', dot: '' },
        { year: '—', title: 'Animateur Bénévole — AMEJ', desc: 'Sécurité jeunes · camps d\'été · activités éducatives', dot: '' },
        { year: '—', title: 'Membre Actif — LEO Club', desc: 'Logistique · projets sociaux et scolaires', dot: '' },
        { year: '2026', title: 'Prêt pour l\'alternance', desc: 'Disponible dès la rentrée 2026', dot: 'now' }
      ],
      en: [
        { year: '—', title: 'Electrical Maintenance Technician Assistant', desc: 'Industrial diagnostics · multimeter · schematics · safety standards', dot: '' },
        { year: '—', title: 'Volunteer Instructor — AMEJ', desc: 'Youth safety · summer camps · educational activities', dot: '' },
        { year: '—', title: 'Active Member — LEO Club', desc: 'Logistics · social and academic projects', dot: '' },
        { year: '2026', title: 'Ready for apprenticeship', desc: 'Available from September 2026', dot: 'now' }
      ]
    }
  };

  const data = timelines[zoneId]?.[lang];
  if (!data) return;

  const tl = document.createElement('div');
  tl.className = 'timeline';
  tl.innerHTML = data.map(item => `
    <div class="tl-item">
      <div class="tl-dot ${item.dot}"></div>
      <div class="tl-content">
        <div class="tl-year">${item.year}</div>
        <div class="tl-title">${item.title}</div>
        ${item.desc ? `<div class="tl-desc">${item.desc}</div>` : ''}
      </div>
    </div>
  `).join('');
  area.appendChild(tl);
}

function addChatMsg(text, role) {
  const area = document.getElementById('chat-area');

  const div = document.createElement('div');
  div.className = 'msg ' + role + ' type-in';

  const lbl = document.createElement('div');
  lbl.className = 'msg-label';
  const dot = document.createElement('span');
  dot.className = 'msg-label-dot';
  lbl.appendChild(dot);
  lbl.appendChild(document.createTextNode(role === 'user' ? T[lang].userLabel : 'Cyber Abdallah'));
  div.appendChild(lbl);

  const ct = document.createElement('div');
  ct.textContent = text;
  div.appendChild(ct);

  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}
