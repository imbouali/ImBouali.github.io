// ===== ACTIVE LANGUAGE =====
let lang = 'fr';

// ===== PORTFOLIO DATA =====
const ABDALLAH = {
  name:       'Bouali Abdallah',
  status:     'À la recherche active d\'un contrat d\'apprentissage. Admis à l\'ISTP Mines Saint-Étienne (2026-2029) — cherche une entreprise partenaire pour signer le contrat.',
  email:      'contact@bouali.tech',
  phone:      '+33748450839',
  linkedin:   'linkedin.com/in/abdallah-bouali-24a37a183/',
  github:     'github.com/imbouali',
  education:  'CPGE MP Lycée Saint Rémi Roubaix 2023-2026, Major de promo 19.17/20, Option Informatique (Algo SQL Graphes) + Option SI (Asservissement SysML), TIPE Algorithme de Shor & RSA quantique. Admission Formation Ingénieur ISTP Mines Saint-Étienne 2026-2029 Électronique Systèmes Embarqués C/C++ VHDL FPGA temps réel cybersécurité embarquée alternance 3sem entreprise 4sem école.',
  skills:     'C/C++ Python FPGA VHDL Arduino Raspberry Pi Linux Git SQL JavaScript HTML CSS Unreal Engine 5 MATLAB Simulink CANoe TCP/IP Ubuntu Server Red Hat Power BI Tkinter PyGame',
  projects:   '1) Application Gestion Fichiers IHM — Python Tkinter OS. 2) Agent IA Autonome de Veille Stratégique — Python Make.com APIs OpenAI/Gemini JSON. 3) Jeu d\'Échecs avec Bot IA — Python Pygame POO. 4) Serveur Minecraft Réseau Local — Linux Ubuntu Server Java VirtualBox : installation configuration administration serveur, gestion accès utilisateurs et ressources système. 5) Reconnaissance Écriture Manuscrite K-NN — Python. 6) Prototype FPS Shooter — Unreal Engine 5 C++.',
  experience: 'Assistant-Technicien Maintenance Électrique industrielle. Animateur Bénévole AMEJ camps été. Membre Actif LEO Club.',
  languages:  'Arabe natif, Français C1, Anglais B2',
  interests:  'Taekwondo ancien compétiteur, Cybersécurité IA, Systèmes embarqués, Sciences Maths, Minecraft Échecs Snooker'
};

// ===== TRANSLATIONS & ZONE CONTENT =====
const T = {

  fr: {
    bootSub: '// ROBOTIQUE // SYSTÈMES EMBARQUÉS // ESPACE //',
    bootLines: [
      { text: 'Systèmes de navigation initialisés' },
      { text: 'Matrices orbitales chargées' },
      { text: '19 modules technologiques détectés' },
      { text: 'Dossier académique : Major de promo 19.17/20' },
      { text: 'ISTP Mines Saint-Étienne : admission confirmée' },
      { text: 'Mission apprentissage : coordination en cours', isWarn: true },
      { text: 'Agent Cyber Abdallah : opérationnel' },
      { text: 'Systèmes prêts. Lancement imminent.' },
    ],
    enterBtn:        'Lancer la mission →',
    worldTitle:      'MISSION.<span>ABDALLAH</span>',
    worldSub:        'Sélectionnez un module — Agent : Cyber Abdallah',
    progressWorld:   '<span id="pw-count">0</span>/6 sections explorées',
    backBtn:         '← Carte',
    chatLabel:       'Conversation ouverte',
    chatPlaceholder: 'Posez votre question...',
    sendBtn:         'Envoyer',
    progressLabel:   'Exploration',
    userLabel:       'Vous',
    ctaHint:         '→ Objectif actif — Cliquez pour en savoir plus',
    cvBtn:           'Télécharger CV',
    kbdHint:         '[1–6] ouvrir zone · [Échap] retour · [D] télécharger CV · [R] mode CV',
    copied:          'Copié !',
    autoHint:        '↑ Langue détectée automatiquement',
    contactTitle:    'Envoyer un message',
    contactSub:      'Je réponds sous 24h',
    contactName:     'Votre nom',
    contactEmail:    'Votre email',
    contactMsg:      'Votre message...',
    contactSend:     'Envoyer le message',
    contactOk:       '✓ Message envoyé !',
    contactErr:      'Erreur — vérifiez votre connexion',
    unlockMsg:       'TOUTES LES ZONES EXPLORÉES',
    recruiterTitle:  'Mode CV',
    sysPrompt: `Tu es CYBER ABDALLAH, NPC cyberpunk et avatar numérique de Bouali Abdallah. Parle en phrases courtes percutantes, style futuriste cyberpunk, jargon hacker, toujours professionnel. RÉPONDS TOUJOURS EN FRANÇAIS.\n\nCRITIQUE: Abdallah N'EST PAS encore apprenti. Il a été ADMIS à l'ISTP Mines Saint-Étienne mais CHERCHE ACTIVEMENT une entreprise. Ne dis jamais qu'il est déjà en poste.\n\nInfos:\n- Statut: ${ABDALLAH.status}\n- Email: ${ABDALLAH.email} | Tél: ${ABDALLAH.phone} | LinkedIn: ${ABDALLAH.linkedin} | GitHub: ${ABDALLAH.github}\n- Formation: ${ABDALLAH.education}\n- Compétences: ${ABDALLAH.skills}\n- Projets: ${ABDALLAH.projects}\n- Expérience: ${ABDALLAH.experience}\n- Langues: ${ABDALLAH.languages}\n- Intérêts: ${ABDALLAH.interests}\n\nRéponds en moins de 120 mots. Utilise ▸ pour les listes. Pour les questions de contact donne toujours email et téléphone.`,
    zones: [
      {
        id: 'identity', icon: '🪐',
        name: 'NOYAU\nIDENTITAIRE', status: '[ DÉVERROUILLÉ ]',
        title: '// NOYAU IDENTITAIRE //', desc: 'Qui est Abdallah ?',
        intro: `SALUTATIONS, VOYAGEUR. Je suis CYBER ABDALLAH — avatar numérique de Bouali Abdallah.\n\nJe suis candidat à une formation ingénieur Systèmes Embarqués en alternance. Admis à l'ISTP Mines Saint-Étienne (2026-2029) — je recherche activement une entreprise partenaire pour signer mon contrat d'apprentissage.\n\nMajor de promotion en informatique (19.17/20). Maîtrise de Python, C/C++, FPGA et systèmes embarqués. Expérience en maintenance électrique industrielle.\n\nPosez-moi vos questions. Je suis votre guide dans cette grille.`,
        choices: ['Parle-moi de ta formation', 'Quelles sont tes compétences ?', 'Montre-moi tes projets', 'Retour à la carte']
      },
      {
        id: 'education', icon: '🚀',
        name: 'NŒUD\nACADÉMIQUE', status: '[ DÉVERROUILLÉ ]',
        title: '// NŒUD ACADÉMIQUE //', desc: 'Formations & Diplômes',
        intro: `ACCÈS AUX DOSSIERS ACADÉMIQUES...\n\n▸ Formation Ingénieur — Mines Saint-Étienne × ISTP (2026-2029)\n  Électronique & Systèmes Embarqués. C/C++, VHDL, FPGA, temps réel, cybersécurité embarquée.\n  ★ ADMISSION CONFIRMÉE — contrat entreprise en cours de recherche.\n  Format : 3 sem entreprise / 4 sem école.\n\n▸ CPGE MP — Lycée Saint Rémi, Roubaix (2023-2026)\n  Option Info : Algorithmique, SQL, Graphes.\n  Option SI : Asservissement, SysML.\n  TIPE : Algorithme de Shor & vulnérabilité RSA quantique.\n  ★ MAJOR DE PROMO : 19.17/20\n\nCS50 Harvard — Introduction à l'Informatique.\n\nDes questions sur mon parcours ?`,
        choices: ['C\'est quoi la CPGE MP ?', 'Dis-m\'en plus sur l\'ISTP', 'Parle-moi de ton TIPE', 'Retour à la carte']
      },
      {
        id: 'skills', icon: '⭐',
        name: 'MATRICE DE\nCOMPÉTENCES', status: '[ DÉVERROUILLÉ ]',
        title: '// MATRICE DE COMPÉTENCES //', desc: 'Arsenal Technique',
        intro: `MATRICE CHARGÉE. SCAN EN COURS...\n\n⚡ HARDWARE : C/C++, VHDL, FPGA, Arduino, Raspberry Pi, MATLAB/Simulink, CANoe\n⚡ SOFTWARE : Python, JavaScript, HTML/CSS, SQL, Git, Linux, Power BI\n⚡ EMBARQUÉ : Microcontrôleurs, temps réel, réseaux industriels, TCP/IP\n⚡ OUTILS : Unreal Engine 5, VirtualBox, Ubuntu Server, Red Hat\n\nLangues : Arabe (natif) | Français (C1) | Anglais (B2)\n\nProfil idéal pour une alternance systèmes embarqués. Des questions ?`,
        choices: ['Compétences systèmes embarqués ?', 'Et la cybersécurité ?', 'Tu maîtrises bien Python ?', 'Retour à la carte']
      },
      {
        id: 'projects', icon: '🛸',
        name: 'COFFRE\nPROJETS', status: '[ DÉVERROUILLÉ ]',
        title: '// COFFRE PROJETS //', desc: 'Construit & Déployé',
        intro: `COFFRE DÉVERROUILLÉ. 6 BUILDS EN AFFICHAGE...\n\n🔧 Application Gestion Fichiers — IHM\n   Stack : Python · Tkinter · OS\n   Interface graphique pour l'organisation automatisée de documents et cours.\n\n🤖 Agent IA Autonome de Veille Stratégique\n   Stack : Python · Make.com · APIs OpenAI/Gemini · JSON\n   Agent intelligent automatisant la recherche et l'analyse d'offres d'alternance ciblées.\n\n♟️ Jeu d'Échecs avec Bot IA\n   Stack : Python · Pygame · POO\n   Interface graphique complète avec un bot adversaire.\n\n🖥️ Serveur Minecraft — Réseau Local\n   Stack : Linux (Ubuntu Server) · Java · VirtualBox\n   Installation, configuration et administration d'un serveur Minecraft en réseau local. Gestion des accès utilisateurs et des ressources système.\n\n🔍 Reconnaissance Écriture Manuscrite — K-NN\n   Stack : Python\n   Prétraitement d'images, distances Euclidiennes, optimisation du paramètre K.\n\n🎮 Prototype FPS Shooter\n   Stack : Unreal Engine 5 · C++\n   Jeu de tir première personne avec logique de gameplay.\n\nDes détails sur l'un de ces projets ?`,
        choices: ['Parle-moi du serveur Minecraft', 'Parle-moi de l\'agent IA', 'Parle-moi du jeu d\'échecs', 'Retour à la carte']
      },
      {
        id: 'xp', icon: '🔭',
        name: 'OPS\nTERRAIN', status: '[ DÉVERROUILLÉ ]',
        title: '// OPS TERRAIN //', desc: 'Expérience Réelle',
        intro: `JOURNAL TERRAIN ACCESSIBLE...\n\n🏭 Assistant-Technicien Maintenance Électrique\n   Diagnostic installations industrielles, multimètre, schémas, normes sécurité.\n\n🤝 Animateur Bénévole — AMEJ\n   Responsable sécurité jeunes, camps d'été, activités éducatives.\n\n🌐 Membre Actif — LEO Club\n   Coordination logistique projets sociaux et scolaires.\n\nIntérêts : Taekwondo | Cybersécurité & IA | Minecraft, Échecs, Snooker\n\nRigueur technique + sens des responsabilités. Prêt pour l'alternance.`,
        choices: ['Plus sur la maintenance électrique', 'Parle-moi du bénévolat', 'Quelles sont tes soft skills ?', 'Retour à la carte']
      },
      {
        id: 'apprenticeship', icon: '🌌',
        name: 'MISSION\nPRINCIPALE', status: '[ OBJECTIF ACTIF ]',
        title: '// TERMINAL MISSION //', desc: 'Recherche d\'Apprentissage',
        intro: `TERMINAL MISSION ACTIF. OBJECTIF EN COURS...\n\n🎯 STATUT : EN RECHERCHE ACTIVE D'UN CONTRAT D'APPRENTISSAGE\n\nAdmis à l'ISTP Mines Saint-Étienne — formation ingénieur Électronique & Systèmes Embarqués (2026-2029). Il me manque une entreprise partenaire pour démarrer.\n\n✅ Disponible : dès que possible / rentrée 2026\n✅ Contrat : Contrat d'apprentissage\n✅ Domaines : Systèmes Embarqués, Électronique, IoT, Cybersécurité, Industrie 4.0\n✅ Rythme : 3 semaines entreprise / 4 semaines école\n\n📡 CONTACT (cliquez pour copier) :\nEmail : contact@bouali.tech\nTél : +33748450839\nLinkedIn : linkedin.com/in/abdallah-bouali-24a37a183/\nGitHub : github.com/imbouali\n\nVotre entreprise cherche un apprenti passionné ? Je suis votre candidat.`,
        choices: ['Pourquoi l\'alternance ingénieur ?', 'Quels secteurs t\'intéressent ?', 'Comment te contacter ?', 'Quelle est ta disponibilité ?']
      }
    ]
  },

  en: {
    bootSub: '// ROBOTICS // EMBEDDED SYSTEMS // SPACE TECH //',
    bootLines: [
      { text: 'Navigation systems initialized' },
      { text: 'Orbital matrices loaded' },
      { text: '19 technology modules detected' },
      { text: 'Academic records: top of class — 19.17/20' },
      { text: 'ISTP Mines Saint-Étienne: admission confirmed' },
      { text: 'Apprenticeship mission: coordination in progress', isWarn: true },
      { text: 'Agent Cyber Abdallah: operational' },
      { text: 'Systems ready. Launch imminent.' },
    ],
    enterBtn:        'Launch mission →',
    worldTitle:      'MISSION.<span>ABDALLAH</span>',
    worldSub:        'Select a module — Agent: Cyber Abdallah',
    progressWorld:   '<span id="pw-count">0</span>/6 sections explored',
    backBtn:         '← Map',
    chatLabel:       'Open conversation',
    chatPlaceholder: 'Ask anything...',
    sendBtn:         'Send',
    progressLabel:   'Exploration',
    userLabel:       'You',
    ctaHint:         '→ Active objective — Click to learn more',
    cvBtn:           'Download CV',
    kbdHint:         '[1–6] open zone · [Esc] back · [D] download CV · [R] CV mode',
    copied:          'Copied!',
    autoHint:        '↑ Language auto-detected',
    contactTitle:    'Send a message',
    contactSub:      'I reply within 24h',
    contactName:     'Your name',
    contactEmail:    'Your email',
    contactMsg:      'Your message...',
    contactSend:     'Send message',
    contactOk:       '✓ Message sent!',
    contactErr:      'Error — check your connection',
    unlockMsg:       'ALL ZONES EXPLORED',
    recruiterTitle:  'CV Mode',
    sysPrompt: `You are CYBER ABDALLAH, a cyberpunk NPC and digital avatar of Bouali Abdallah. Short punchy sentences, futuristic cyberpunk style, hacker jargon, always professional. ALWAYS REPLY IN ENGLISH.\n\nCRITICAL: Abdallah is NOT yet an apprentice. He has been ADMITTED to ISTP Mines Saint-Étienne but is ACTIVELY SEARCHING for a company. Never say he is already employed.\n\nAbout Abdallah:\n- Status: ${ABDALLAH.status}\n- Email: ${ABDALLAH.email} | Phone: ${ABDALLAH.phone} | LinkedIn: ${ABDALLAH.linkedin} | GitHub: ${ABDALLAH.github}\n- Education: ${ABDALLAH.education}\n- Skills: ${ABDALLAH.skills}\n- Projects: ${ABDALLAH.projects}\n- Experience: ${ABDALLAH.experience}\n- Languages: ${ABDALLAH.languages}\n- Interests: ${ABDALLAH.interests}\n\nAnswer under 120 words. Use ▸ for lists. For contact questions always give email and phone.`,
    zones: [
      {
        id: 'identity', icon: '🪐',
        name: 'IDENTITY\nCORE', status: '[ UNLOCKED ]',
        title: '// IDENTITY CORE //', desc: 'Who is Abdallah?',
        intro: `GREETINGS, TRAVELER. I am CYBER ABDALLAH — digital avatar of Bouali Abdallah.\n\nI am a candidate for an engineering apprenticeship in Embedded Systems. Admitted to ISTP Mines Saint-Étienne (2026-2029) — actively looking for a company to sign my apprenticeship contract.\n\nTop of my class in Computer Science (19.17/20). Strong mastery of Python, C/C++, FPGA, embedded systems. Real-world experience in industrial electrical maintenance.\n\nAsk me anything. I am your guide.`,
        choices: ['Tell me about your education', 'What are your skills?', 'Show me your projects', 'Back to map']
      },
      {
        id: 'education', icon: '🚀',
        name: 'ACADEMY\nNODE', status: '[ UNLOCKED ]',
        title: '// ACADEMY NODE //', desc: 'Training & Diplomas',
        intro: `ACCESSING EDUCATION RECORDS...\n\n▸ Engineering Degree — Mines Saint-Étienne × ISTP (2026-2029)\n  Electronics & Embedded Systems. C/C++, VHDL, FPGA, real-time, embedded cybersecurity.\n  ★ ADMISSION CONFIRMED — seeking apprenticeship contract.\n  Work-study: 3 weeks company / 4 weeks school.\n\n▸ CPGE MP — Lycée Saint Rémi, Roubaix (2023-2026)\n  CS: Algorithms, SQL, Graphs. Engineering: Control systems, SysML.\n  Research: Shor's Algorithm & RSA quantum vulnerability.\n  ★ TOP OF CLASS: 19.17/20\n\nCS50 Harvard.\n\nAny questions?`,
        choices: ['What is CPGE MP?', 'Tell me about ISTP', 'What was your research project?', 'Back to map']
      },
      {
        id: 'skills', icon: '⭐',
        name: 'SKILL\nMATRIX', status: '[ UNLOCKED ]',
        title: '// SKILL MATRIX //', desc: 'Technical Arsenal',
        intro: `SKILL MATRIX LOADED. SCANNING...\n\n⚡ HARDWARE: C/C++, VHDL, FPGA, Arduino, Raspberry Pi, MATLAB/Simulink, CANoe\n⚡ SOFTWARE: Python, JavaScript, HTML/CSS, SQL, Git, Linux, Power BI\n⚡ EMBEDDED: Microcontrollers, real-time, industrial networks, TCP/IP\n⚡ TOOLS: Unreal Engine 5, VirtualBox, Ubuntu Server, Red Hat\n\nLanguages: Arabic (native) | French (C1) | English (B2)\n\nIdeal profile for an embedded systems apprenticeship. Ask anything.`,
        choices: ['Tell me about your embedded skills', 'What about cybersecurity?', 'How well do you know Python?', 'Back to map']
      },
      {
        id: 'projects', icon: '🛸',
        name: 'PROJECT\nVAULT', status: '[ UNLOCKED ]',
        title: '// PROJECT VAULT //', desc: 'Built & Deployed',
        intro: `PROJECT VAULT UNLOCKED. 6 BUILDS DISPLAYED...\n\n🔧 File Manager GUI (HMI)\n   Stack: Python · Tkinter · OS\n   Graphical interface for automated organization of documents and course files.\n\n🤖 Autonomous AI Strategic Intelligence Agent\n   Stack: Python · Make.com · OpenAI/Gemini APIs · JSON\n   Intelligent agent automating the search and analysis of targeted apprenticeship offers.\n\n♟️ Chess Game with AI Bot\n   Stack: Python · Pygame · OOP\n   Full graphical chess interface with an AI opponent.\n\n🖥️ Minecraft Server — Local Network\n   Stack: Linux (Ubuntu Server) · Java · VirtualBox\n   Installation, configuration and administration of a Minecraft server on local network. User access and system resource management.\n\n🔍 Handwriting Recognition — K-NN\n   Stack: Python\n   Image preprocessing, Euclidean distance computation, K parameter optimization.\n\n🎮 FPS Shooter Prototype\n   Stack: Unreal Engine 5 · C++\n   First-person shooter with core gameplay logic.\n\nWant details on any of these?`,
        choices: ['Tell me about the Minecraft server', 'Tell me about the AI agent', 'Tell me about the chess game', 'Back to map']
      },
      {
        id: 'xp', icon: '🔭',
        name: 'FIELD\nOPS', status: '[ UNLOCKED ]',
        title: '// FIELD OPS //', desc: 'Real-World Experience',
        intro: `FIELD EXPERIENCE LOG ACCESSED...\n\n🏭 Electrical Maintenance Technician Assistant\n   Industrial fault diagnosis, multimeter, schematics, safety standards.\n\n🤝 Volunteer Instructor — AMEJ\n   Youth safety at summer camps, educational activities.\n\n🌐 Active Member — LEO Club\n   Logistics for social and academic projects.\n\nInterests: Taekwondo | Cybersecurity & AI | Minecraft, Chess, Snooker\n\nTechnical rigor + human skills. Ready for apprenticeship.`,
        choices: ['More on electrical maintenance', 'Tell me about your volunteering', 'What are your soft skills?', 'Back to map']
      },
      {
        id: 'apprenticeship', icon: '🌌',
        name: 'MAIN\nMISSION', status: '[ ACTIVE OBJECTIVE ]',
        title: '// MISSION TERMINAL //', desc: 'Seeking Apprenticeship',
        intro: `MISSION TERMINAL ACTIVE. LIVE OBJECTIVE LOADED...\n\n🎯 STATUS: ACTIVELY SEEKING AN APPRENTICESHIP CONTRACT\n\nAdmitted to ISTP Mines Saint-Étienne — Engineering Electronics & Embedded Systems (2026-2029). I need a partner company to sign the contract.\n\n✅ Available: ASAP / September 2026\n✅ Contract: French apprenticeship (contrat d'apprentissage)\n✅ Domains: Embedded Systems, Electronics, IoT, Cybersecurity, Industry 4.0\n✅ Rhythm: 3 weeks company / 4 weeks school\n\n📡 CONTACT (click to copy):\nEmail: contact@bouali.tech\nPhone: +33748450839\nLinkedIn: linkedin.com/in/abdallah-bouali-24a37a183/\nGitHub: github.com/abdallah-bouali\n\nLooking for a motivated apprentice? I am your candidate.`,
        choices: ['Why an engineering apprenticeship?', 'What industries interest you?', 'How to contact you?', 'What is your availability?']
      }
    ]
  }

};
