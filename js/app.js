// ===== STATE =====
let visitedZones = new Set(JSON.parse(localStorage.getItem('visitedZones') || '[]'));
let currentZone  = null;
const chatHistory = {};   // { zoneId: [{role, text}] }

// ===== LANGUAGE =====

function chooseLang(l) {
  lang = l;
  document.getElementById('lang-switcher').style.display = 'flex';
  document.getElementById('recruiter-btn').style.display = 'block';
  updateLangSwitcher();
  runBoot();
}

function switchLang(l) {
  lang = l;
  updateLangSwitcher();

  // If CV mode is open, re-render it in the new language
  const recruiterView = document.getElementById('recruiter-view');
  if (recruiterView && recruiterView.style.display === 'block') {
    renderRecruiterView();
    return;
  }

  const active = document.querySelector('.screen.active').id;
  if (active === 'boot-screen')                         runBoot();
  else if (active === 'world-screen')                   renderWorldMap();
  else if (active === 'dialogue-screen' && currentZone) openZone(currentZone);
}

function updateLangSwitcher() {
  document.getElementById('ls-fr').className = 'ls-btn' + (lang === 'fr' ? ' active-lang' : '');
  document.getElementById('ls-en').className = 'ls-btn' + (lang === 'en' ? ' active-lang' : '');
}

function goBack() {
  history.pushState(null, '', '#');
  showScreen('world-screen', renderWorldMap);
}

// ===== AUTO LANGUAGE DETECTION =====
(function () {
  const detected = (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  const btn  = document.getElementById('lang-btn-' + detected);
  const hint = document.getElementById('lang-auto-hint');
  if (btn)  btn.style.borderColor = 'var(--accent)';
  if (hint) hint.textContent = detected === 'fr'
    ? '↑ Langue détectée automatiquement'
    : '↑ Language auto-detected';
})();

// ===== BOOT =====

function runBoot() {
  showScreen('boot-screen');
  const t = T[lang];
  document.getElementById('boot-sub-text').textContent = ' — ' + t.bootSub;
  document.getElementById('enter-btn').textContent     = t.enterBtn;
  document.getElementById('enter-btn').style.display   = 'none';

  const container = document.getElementById('boot-lines');
  container.innerHTML = '';
  t.bootLines.forEach((line, i) => {
    const el   = document.createElement('div');
    el.className = 'boot-line';
    el.style.animationDelay = `${i * 0.32}s`;
    const addr = '0x' + (0x0800 + i * 0x0200).toString(16).toUpperCase().padStart(4, '0');
    el.innerHTML = `
      <span class="boot-led ${line.isWarn ? 'warn' : 'ok'}"></span>
      <span class="boot-line-addr">${addr}</span>
      <span class="boot-line-text ${line.isWarn ? 'warn-text' : ''}">${line.text}</span>
    `;
    container.appendChild(el);
  });

  setTimeout(() => {
    document.getElementById('enter-btn').style.display = 'block';
  }, t.bootLines.length * 320 + 300);
}

function enterWorld() {
  showScreen('world-screen', () => {
    renderWorldMap();
    // Handle deep-link from URL hash
    const hash = window.location.hash.slice(1);
    if (hash && T[lang].zones.find(z => z.id === hash)) {
      setTimeout(() => openZone(hash), 300);
    }
  });
}

// ===== WORLD MAP =====

function renderWorldMap() {
  const t = T[lang];
  document.getElementById('world-title-text').innerHTML = t.worldTitle;
  document.getElementById('world-sub-text').textContent = t.worldSub;
  document.getElementById('cv-btn-label').textContent   = t.cvBtn;
  document.getElementById('kbd-hint-world').textContent = t.kbdHint;
  updateContactForm();

  const grid = document.getElementById('zones-grid');
  grid.innerHTML = '';
  t.zones.forEach(z => {
    const card = document.createElement('div');
    card.className  = 'zone-card' + (visitedZones.has(z.id) ? ' visited' : '');
    card.id         = 'zone-' + z.id;
    card.dataset.id = z.id;
    card.onclick    = () => openZone(z.id);
    const isApprent = z.id === 'apprenticeship';
    card.innerHTML  = isApprent
      ? `<span class="zone-icon">${z.icon}</span>
         <div>
           <div class="zone-name">${z.name.replace('\n', ' ')}</div>
           <div class="zone-status">${z.status}</div>
           <span class="zone-cta-text">${t.ctaHint}</span>
         </div>
         ${visitedZones.has(z.id) ? '<div class="visited-badge"></div>' : ''}`
      : `<span class="zone-icon">${z.icon}</span>
         <div class="zone-name">${z.name}</div>
         <div class="zone-status">${z.status}</div>
         ${visitedZones.has(z.id) ? '<div class="visited-badge"></div>' : ''}`;
    grid.appendChild(card);
  });

  const count = visitedZones.size;
  document.getElementById('progress-world').innerHTML =
    t.progressWorld.replace('<span id="pw-count">0</span>', `<strong>${count}</strong>`);
  document.getElementById('world-progress-fill').style.width = `${(count / ZONE_COUNT) * 100}%`;
}

// ===== ZONE / DIALOGUE =====

function openZone(zoneId) {
  currentZone = zoneId;
  const t = T[lang];
  const z = t.zones.find(x => x.id === zoneId);

  history.pushState(null, '', '#' + zoneId);

  document.getElementById('zone-title').textContent     = z.title;
  document.getElementById('zone-desc').textContent      = z.desc;
  document.getElementById('back-btn').textContent       = t.backBtn;
  document.getElementById('chat-label').textContent     = t.chatLabel;
  document.getElementById('chat-input').placeholder     = t.chatPlaceholder;
  document.getElementById('send-btn').textContent       = t.sendBtn;
  document.getElementById('progress-label').textContent = t.progressLabel;
  document.getElementById('dialogue-text').textContent  = '';
  document.getElementById('choices-area').innerHTML     = '';
  document.getElementById('timeline-area').innerHTML    = '';

  // Restore or clear chat history
  const area = document.getElementById('chat-area');
  area.innerHTML = '';
  if (chatHistory[zoneId]) {
    chatHistory[zoneId].forEach(m => addChatMsg(m.text, m.role, false));
  }

  showScreen('dialogue-screen', () => {
    typeText(z.intro, () => {
      renderChoices(z.choices);
      renderTimeline(zoneId);
    });
  });

  visitedZones.add(zoneId);
  localStorage.setItem('visitedZones', JSON.stringify([...visitedZones]));
  document.getElementById('progress-fill').style.width = `${(visitedZones.size / ZONE_COUNT) * 100}%`;

  if (visitedZones.size === ZONE_COUNT) {
    setTimeout(triggerUnlockAnimation, 800);
  }
}

function renderChoices(choices) {
  const area = document.getElementById('choices-area');
  area.innerHTML = '';
  choices.forEach(c => {
    const btn     = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = '▸ ' + c;
    btn.onclick = () => {
      if (['Retour à la carte', 'Back to map'].includes(c)) { goBack(); return; }
      area.innerHTML = '';
      askGemini(c);
    };
    area.appendChild(btn);
  });
}

// ===== UNLOCK ANIMATION =====

function triggerUnlockAnimation() {
  if (localStorage.getItem('unlockShown')) return;
  localStorage.setItem('unlockShown', '1');

  const t   = T[lang];
  const div = document.createElement('div');
  div.className = 'unlock-overlay';
  div.innerHTML = `
    <div class="unlock-box">
      <div class="unlock-ascii">╔═══════════════════════════════╗\n║                               ║\n║   SYSTÈME DÉVERROUILLÉ  ✓    ║\n║                               ║\n╚═══════════════════════════════╝</div>
      <div class="unlock-pct">100%</div>
      <div class="unlock-sub">${t.unlockMsg}</div>
    </div>
  `;
  div.onclick = () => div.remove();
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3500);
}

// ===== RECRUITER MODE =====

function toggleRecruiterMode() {
  const view = document.getElementById('recruiter-view');
  const btn  = document.getElementById('recruiter-btn');
  const open = view.style.display === 'block';
  if (open) {
    view.style.display = 'none';
    btn.classList.remove('active');
  } else {
    renderRecruiterView();
    view.style.display = 'block';
    btn.classList.add('active');
  }
}

function renderRecruiterView() {
  const t  = T[lang];
  const el = document.getElementById('recruiter-inner');

  const hwSkills = ['C/C++', 'VHDL', 'FPGA', 'Arduino', 'Raspberry Pi', 'MATLAB/Simulink', 'CANoe'];
  const swSkills = ['Python', 'JavaScript', 'SQL', 'Git', 'Linux', 'Power BI', 'Tkinter'];
  const tools    = ['Unreal Engine 5', 'VirtualBox', 'Ubuntu Server', 'Red Hat', 'PyGame'];

  const badge = (s, cls) => `<span class="recruiter-badge ${cls}">${s}</span>`;

  const contactLine = (icon, text, href) => href
    ? `<a class="recruiter-contact-item" href="${href}" target="_blank" rel="noopener">
         <span class="rc-icon">${icon}</span>${text}
       </a>`
    : `<div class="recruiter-contact-item" onclick="copyToClipboard('${text}')">
         <span class="rc-icon">${icon}</span>${text}
       </div>`;

  const sectionTitle = (icon, label) =>
    `<div class="recruiter-section-title"><span>${icon}</span>${label}</div>`;

  el.innerHTML = `
    <div class="recruiter-name">BOUALI Abdallah</div>
    <div class="recruiter-title">
      ${lang === 'fr'
        ? 'Ingénieur Systèmes Embarqués (alternance) · ISTP Mines Saint-Étienne 2026–2029'
        : 'Embedded Systems Engineer (apprenticeship) · ISTP Mines Saint-Étienne 2026–2029'}
    </div>
    <div class="recruiter-contacts">
      ${contactLine('✉', ABDALLAH.email, 'mailto:' + ABDALLAH.email)}
      ${contactLine('☎', ABDALLAH.phone)}
      ${contactLine('in', ABDALLAH.linkedin, 'https://' + ABDALLAH.linkedin)}
      ${contactLine('⌥', ABDALLAH.github, 'https://' + ABDALLAH.github)}
    </div>

    <div class="recruiter-grid">
      <div>
        ${sectionTitle('🎓', lang === 'fr' ? 'FORMATION' : 'EDUCATION')}
        <div class="recruiter-section">
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">
              ${lang === 'fr' ? 'Ingénieur Électronique & Systèmes Embarqués' : 'Engineering Degree — Electronics & Embedded Systems'}
            </div>
            <div class="recruiter-entry-sub">ISTP × Mines Saint-Étienne · 2026–2029</div>
            <div class="recruiter-entry-desc">
              ${lang === 'fr'
                ? 'C/C++, VHDL, FPGA, temps réel, cybersécurité embarquée · 3 sem entreprise / 4 sem école'
                : 'C/C++, VHDL, FPGA, real-time, embedded cybersecurity · 3 weeks company / 4 weeks school'}
            </div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">CPGE MP</div>
            <div class="recruiter-entry-sub">${lang === 'fr' ? 'Lycée Saint Rémi, Roubaix · 2023–2026 · Major de promo' : 'Lycée Saint Rémi, Roubaix · 2023–2026 · Top of class'}</div>
            <div class="recruiter-entry-desc">
              ${lang === 'fr'
                ? 'Option Info (Algo, SQL, Graphes) · Option SI (Asservissement, SysML) · TIPE : Algo de Shor & RSA quantique · 19.17/20'
                : 'CS option (Algo, SQL, Graphs) · Engineering option (Control, SysML) · Research: Shor Algorithm & RSA quantum · 19.17/20'}
            </div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">CS50 Harvard</div>
            <div class="recruiter-entry-sub">${lang === 'fr' ? 'Introduction à l\'Informatique' : 'Introduction to Computer Science'}</div>
          </div>
        </div>

        ${sectionTitle('🏭', lang === 'fr' ? 'EXPÉRIENCE' : 'EXPERIENCE')}
        <div class="recruiter-section">
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">${lang === 'fr' ? 'Assistant-Technicien Maintenance Électrique' : 'Electrical Maintenance Technician Assistant'}</div>
            <div class="recruiter-entry-desc">${lang === 'fr' ? 'Diagnostic industriel, multimètre, schémas, normes sécurité' : 'Industrial diagnostics, multimeter, schematics, safety standards'}</div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">${lang === 'fr' ? 'Animateur Bénévole — AMEJ' : 'Volunteer Instructor — AMEJ'}</div>
            <div class="recruiter-entry-desc">${lang === 'fr' ? 'Responsable sécurité jeunes, camps d\'été' : 'Youth safety lead, summer camps'}</div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">${lang === 'fr' ? 'Membre Actif — LEO Club' : 'Active Member — LEO Club'}</div>
            <div class="recruiter-entry-desc">${lang === 'fr' ? 'Coordination logistique projets sociaux' : 'Logistics coordination for social projects'}</div>
          </div>
        </div>
      </div>

      <div>
        ${sectionTitle('⚡', lang === 'fr' ? 'COMPÉTENCES' : 'SKILLS')}
        <div class="recruiter-section">
          <div class="recruiter-entry-sub" style="margin-bottom:0.4rem">Hardware</div>
          <div class="recruiter-badge-row">${hwSkills.map(s => badge(s, 'hw')).join('')}</div>
          <div class="recruiter-entry-sub" style="margin:0.7rem 0 0.4rem">Software</div>
          <div class="recruiter-badge-row">${swSkills.map(s => badge(s, 'sw')).join('')}</div>
          <div class="recruiter-entry-sub" style="margin:0.7rem 0 0.4rem">${lang === 'fr' ? 'Outils' : 'Tools'}</div>
          <div class="recruiter-badge-row">${tools.map(s => badge(s, '')).join('')}</div>
          <div class="recruiter-entry-sub" style="margin:0.7rem 0 0.4rem">${lang === 'fr' ? 'Langues' : 'Languages'}</div>
          <div class="recruiter-badge-row">
            ${badge(lang === 'fr' ? 'Arabe natif' : 'Arabic native', 'hw')}
            ${badge('Français C1', 'sw')}
            ${badge('English B2', '')}
          </div>
        </div>

        ${sectionTitle('🛸', lang === 'fr' ? 'PROJETS' : 'PROJECTS')}
        <div class="recruiter-section">
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">${lang === 'fr' ? 'Application Gestion Fichiers — IHM' : 'File Manager GUI (HMI)'}</div>
            <div class="recruiter-entry-sub">Python · Tkinter · OS</div>
            <div class="recruiter-entry-desc">${lang === 'fr' ? 'Interface graphique pour l\'organisation automatisée de documents et cours.' : 'Graphical interface for automated document and course organization.'}</div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">${lang === 'fr' ? 'Agent IA Autonome de Veille Stratégique' : 'Autonomous AI Strategic Intelligence Agent'}</div>
            <div class="recruiter-entry-sub">Python · Make.com · OpenAI/Gemini APIs · JSON</div>
            <div class="recruiter-entry-desc">${lang === 'fr' ? 'Agent intelligent automatisant la recherche et l\'analyse d\'offres d\'alternance ciblées.' : 'Intelligent agent automating the search and analysis of targeted apprenticeship offers.'}</div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">${lang === 'fr' ? 'Jeu d\'Échecs avec Bot IA' : 'Chess Game with AI Bot'}</div>
            <div class="recruiter-entry-sub">Python · Pygame · POO</div>
            <div class="recruiter-entry-desc">${lang === 'fr' ? 'Interface graphique complète avec bot adversaire. Programmation orientée objet.' : 'Full graphical interface with AI opponent. Object-oriented design.'}</div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">${lang === 'fr' ? 'Serveur Minecraft — Réseau Local' : 'Minecraft Server — Local Network'}</div>
            <div class="recruiter-entry-sub">Linux (Ubuntu Server) · Java · VirtualBox</div>
            <div class="recruiter-entry-desc">${lang === 'fr' ? 'Installation, configuration et administration d\'un serveur en réseau local. Gestion des accès utilisateurs et des ressources système.' : 'Installation, configuration and administration of a local network server. User access and system resource management.'}</div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">${lang === 'fr' ? 'Reconnaissance Écriture Manuscrite — K-NN' : 'Handwriting Recognition — K-NN'}</div>
            <div class="recruiter-entry-sub">Python</div>
            <div class="recruiter-entry-desc">${lang === 'fr' ? 'Prétraitement d\'images, distances Euclidiennes, optimisation du paramètre K.' : 'Image preprocessing, Euclidean distances, K parameter optimization.'}</div>
          </div>
          <div class="recruiter-entry">
            <div class="recruiter-entry-title">FPS Shooter Prototype</div>
            <div class="recruiter-entry-sub">Unreal Engine 5 · C++</div>
          </div>
        </div>

        <!-- QR code -->
        <div class="recruiter-qr">
          <div id="qr-container"></div>
          <div class="recruiter-qr-label">${lang === 'fr' ? 'Scannez pour ouvrir le portfolio' : 'Scan to open portfolio'}</div>
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border)">
      <button onclick="openContactModal()" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:600;padding:0.7rem 2rem;background:var(--cta);border:none;color:#fff;cursor:pointer;border-radius:3px;margin-right:0.75rem;transition:all 0.2s" onmouseover="this.style.background='#ea6c0a'" onmouseout="this.style.background='var(--cta)'">
        ${lang === 'fr' ? '✉ Envoyer un message' : '✉ Send a message'}
      </button>
      <a href="cv.pdf" download style="font-family:'Space Mono',monospace;font-size:0.65rem;font-weight:700;padding:0.7rem 1.5rem;background:var(--accent-dim);border:1px solid var(--accent);color:var(--accent);cursor:pointer;border-radius:3px;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase">
        ⬇ ${lang === 'fr' ? 'Télécharger CV' : 'Download CV'}
      </a>
    </div>
  `;

  // Generate QR code
  const qrEl = document.getElementById('qr-container');
  if (qrEl && typeof QRCode !== 'undefined') {
    qrEl.innerHTML = '';
    new QRCode(qrEl, {
      text: window.location.href.split('#')[0],
      width: 110, height: 110,
      colorDark: '#c084fc', colorLight: '#04000f',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
}

// ===== CONTACT MODAL =====

function updateContactForm() {
  const t = T[lang];
  const el = id => document.getElementById(id);
  if (el('contact-modal-title')) el('contact-modal-title').textContent = t.contactTitle;
  if (el('contact-modal-sub'))   el('contact-modal-sub').textContent   = t.contactSub;
  if (el('cf-name'))    el('cf-name').placeholder  = t.contactName;
  if (el('cf-email'))   el('cf-email').placeholder = t.contactEmail;
  if (el('cf-msg'))     el('cf-msg').placeholder   = t.contactMsg;
  if (el('contact-submit')) el('contact-submit').textContent = t.contactSend;
}

function openContactModal() {
  updateContactForm();
  document.getElementById('contact-modal').classList.add('active');
}

function closeContactModal() {
  document.getElementById('contact-modal').classList.remove('active');
}

async function submitContact(e) {
  e.preventDefault();
  const btn  = document.getElementById('contact-submit');
  const t    = T[lang];
  btn.disabled = true;
  btn.textContent = '...';

  try {
    const res = await fetch('https://formspree.io/f/xpwzgkld', { // ← remplace par ton ID Formspree
      method: 'POST',
      body: new FormData(e.target),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      showToast(t.contactOk);
      closeContactModal();
      e.target.reset();
    } else { throw new Error(); }
  } catch {
    showToast(t.contactErr);
  }
  btn.disabled = false;
  btn.textContent = t.contactSend;
}

// ===== COPY TO CLIPBOARD =====

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast((T[lang].copied || 'Copié !') + '  ' + text);
  });
}

document.addEventListener('click', e => {
  const text = (e.target.textContent || '').trim();
  if ((text.includes('@') || /^\+\d/.test(text)) && e.target.closest('#dialogue-text, #chat-area')) {
    copyToClipboard(text);
  }
});

// ===== KEYBOARD SHORTCUTS =====

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const active = document.querySelector('.screen.active')?.id;

  if (active === 'world-screen') {
    const keys = { '1':0, '2':1, '3':2, '4':3, '5':4, '6':5 };
    if (e.key in keys) { const z = T[lang].zones[keys[e.key]]; if (z) openZone(z.id); }
    if (e.key === 'd' || e.key === 'D') document.getElementById('cv-btn').click();
    if (e.key === 'r' || e.key === 'R') toggleRecruiterMode();
  }
  if (active === 'dialogue-screen' && e.key === 'Escape') goBack();
  if (active === 'boot-screen' && e.key === 'Enter') {
    const btn = document.getElementById('enter-btn');
    if (btn.style.display !== 'none') enterWorld();
  }
  if (e.key === 'Escape') {
    closeContactModal();
    const rv = document.getElementById('recruiter-view');
    if (rv.style.display === 'block') toggleRecruiterMode();
  }
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const hash = window.location.hash.slice(1);
  if (hash && T[lang]?.zones.find(z => z.id === hash)) openZone(hash);
  else if (document.querySelector('.screen.active')?.id === 'dialogue-screen') {
    showScreen('world-screen', renderWorldMap);
  }
});

// ===== CHAT =====

async function sendChat() {
  const inp = document.getElementById('chat-input');
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  addChatMsg(msg, 'user');
  await askGemini(msg);
}

// ===== GEMINI API =====

async function askGemini(userMsg) {
  const btn = document.getElementById('send-btn');
  btn.disabled = true;
  showTyping();

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: T[lang].sysPrompt },
          { role: 'user',   content: userMsg }
        ],
        max_tokens:  300,
        temperature: 0.85
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const data  = await res.json();
    const reply = data.choices?.[0]?.message?.content
      || (lang === 'fr' ? 'Pas de réponse.' : 'No response.');

    hideTyping();
    addChatMsg(reply, 'npc');

    if (currentZone) {
      if (!chatHistory[currentZone]) chatHistory[currentZone] = [];
      chatHistory[currentZone].push({ role: 'user', text: userMsg });
      chatHistory[currentZone].push({ role: 'npc',  text: reply });
    }

  } catch (e) {
    hideTyping();
    addChatMsg(lang === 'fr' ? `Erreur : ${e.message}` : `Error: ${e.message}`, 'npc');
  }

  btn.disabled = false;
}
