/* =========================================================
   MULTIEXITOSAS — Marcas SVG de los emprendimientos DEMO
   Sustituyen a los emoji: un emoji es un glifo del sistema
   (cambia según el equipo y se lee como algo informal),
   mientras que estas marcas son geométricas, consistentes
   y usan la paleta cromática del logo real.
   ========================================================= */

const LOGOS = {
  // Raíces Vivas — hoja sobre círculo (cosmética natural)
  "raices-vivas": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#E8F0E9"/>
    <path d="M24 34c0-8 4-14 11-16 0 9-4 14-11 16z" fill="#39852C"/>
    <path d="M24 34c0-7-3.5-12-10-13.5 0 8 3.5 12 10 13.5z" fill="#5C7D26"/>
    <path d="M24 34v-9" stroke="#2E5D34" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // EcoCiclo — flechas de ciclo cerrado (economía circular)
  "ecociclo": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#E2F0EE"/>
    <path d="M24 12a12 12 0 0 1 10.4 18" stroke="#1E6E63" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M24 36A12 12 0 0 1 13.6 18" stroke="#327BA6" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M31 27l3.8 3.4L38 26" stroke="#1E6E63" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 21l-3.8-3.4L10 22" stroke="#327BA6" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // Verde Hogar — casa con hoja
  "verde-hogar": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#E9F1E6"/>
    <path d="M13 24l11-9 11 9v11a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V24z" stroke="#3F7D3A" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M24 33c0-4 2-6.5 5.5-7.5 0 4.5-2 7-5.5 7.5z" fill="#5C7D26"/>
  </svg>`,

  // Mujeres que Crean — nudo textil entrelazado
  "mujeres-que-crean": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#F4E7EF"/>
    <path d="M15 30c0-8 4-13 9-13s9 5 9 13" stroke="#802070" stroke-width="3" stroke-linecap="round"/>
    <path d="M15 30c3.5 0 5.5-2.5 9-2.5s5.5 2.5 9 2.5" stroke="#D3237B" stroke-width="3" stroke-linecap="round"/>
    <circle cx="24" cy="17" r="2.6" fill="#802070"/>
  </svg>`,

  // BioPack — caja / empaque
  "biopack": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#F1EBE1"/>
    <path d="M13 19l11-5 11 5v11l-11 5-11-5V19z" stroke="#906030" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M13 19l11 5 11-5M24 24v11" stroke="#906030" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M24 14v5" stroke="#5C7D26" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // Café Origen — grano de café sobre montaña
  "cafe-origen": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#EFE7DE"/>
    <path d="M10 33l8-10 5 6 5-8 10 12H10z" fill="#6B4226"/>
    <ellipse cx="24" cy="18" rx="5.5" ry="7" fill="#8A5A2B"/>
    <path d="M24 11.5v13" stroke="#EFE7DE" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  // ReTela — aguja e hilo (moda circular)
  "retela": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#F5E8DF"/>
    <path d="M14 34L32 16" stroke="#B5541B" stroke-width="3" stroke-linecap="round"/>
    <circle cx="33" cy="15" r="3.4" stroke="#B5541B" stroke-width="2.6"/>
    <path d="M14 34c4-1 6-3 5-6.5" stroke="#A56211" stroke-width="2.6" stroke-linecap="round"/>
  </svg>`,

  // Aula Verde — árbol educativo
  "aula-verde": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#E7F0E7"/>
    <path d="M24 12l9 12h-6l5 8H16l5-8h-6l9-12z" fill="#2E5D34"/>
    <path d="M24 32v6" stroke="#6B4226" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // Semillas del Oriente — espiga / brote
  "semillas-del-oriente": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#EDF1E3"/>
    <path d="M24 36V16" stroke="#5B7B3A" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M24 20c0-3 2.5-5.5 6-6 0 3.5-2.5 5.5-6 6zM24 27c0-3 2.5-5.5 6-6 0 3.5-2.5 5.5-6 6z" fill="#5C7D26"/>
    <path d="M24 20c0-3-2.5-5.5-6-6 0 3.5 2.5 5.5 6 6zM24 27c0-3-2.5-5.5-6-6 0 3.5 2.5 5.5 6 6z" fill="#7B9B4A"/>
  </svg>`,

  // Robótica para Todos — nodo tecnológico
  "robotica-para-todos": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#E5E9F3"/>
    <rect x="15" y="18" width="18" height="14" rx="3.5" stroke="#3B5BA5" stroke-width="2.6"/>
    <circle cx="20" cy="25" r="2" fill="#3B5BA5"/>
    <circle cx="28" cy="25" r="2" fill="#3B5BA5"/>
    <path d="M24 18v-4M18 32v3M30 32v3" stroke="#327BA6" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="24" cy="13" r="2.2" fill="#327BA6"/>
  </svg>`,

  // Manos del Mar — ola y pez
  "manos-del-mar": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#E2EEF3"/>
    <path d="M12 30c3-3 5.5-3 8.5 0s5.5 3 8.5 0 5.5-3 7 0" stroke="#1F6F8B" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M17 20c4-4 10-4 13 0-3 4-9 4-13 0z" fill="#327BA6"/>
    <circle cx="21" cy="20" r="1.4" fill="#fff"/>
    <path d="M30 20l4-3v6l-4-3z" fill="#1F6F8B"/>
  </svg>`,

  // Taller ReCicla — madera recuperada
  "taller-recicla": `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#F0E9E0"/>
    <rect x="13" y="17" width="22" height="6" rx="2" fill="#8A5A2B"/>
    <rect x="13" y="26" width="14" height="6" rx="2" fill="#A56211"/>
    <path d="M31 29h5" stroke="#5C7D26" stroke-width="2.8" stroke-linecap="round"/>
  </svg>`
};

/* ---------------------------------------------------------
   Iconos de categoría — trazo uniforme, sin relleno.
   Sustituyen a los emoji, que dependen de la fuente del
   sistema y aportan un registro informal.
   `currentColor` permite teñirlos con el acento de marca.
   --------------------------------------------------------- */
const ICONOS_CATEGORIA = {
  "Cosmética natural": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 27V15"/><path d="M16 15c0-5 3.2-8.4 8-9-.2 5.4-3.2 8.4-8 9z"/><path d="M16 20c0-4-2.6-6.8-6.5-7.3.2 4.4 2.6 6.8 6.5 7.3z"/></svg>`,
  "Economía circular": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 12.5A9 9 0 0 1 24 14"/><path d="M23.5 19.5A9 9 0 0 1 8 18"/><path d="M20.5 13.5l3.8.6.7-3.8"/><path d="M11.5 18.5l-3.8-.6-.7 3.8"/></svg>`,
  "Hogar sostenible": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l10-8 10 8v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V15z"/><path d="M16 23c0-3.2 1.7-5.2 4.6-5.8 0 3.6-1.7 5.4-4.6 5.8z"/></svg>`,
  "Artesanías": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="17" r="8"/><path d="M8.5 11.5c3.6 3.6 7.4 7.4 11 11"/><path d="M6.6 16.4c2.6 2.6 6.4 6.4 9 9"/><path d="M20 13l6-6"/><path d="M25 5.5l2.5 2.5-2 2-2.5-2.5z"/></svg>`,
  "Empaques sostenibles": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 11l10-4 10 4v10l-10 4-10-4V11z"/><path d="M6 11l10 4 10-4M16 15v10"/></svg>`,
  "Alimentos y bebidas": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 12h15v6a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6v-6z"/><path d="M22 14h2.5a2.5 2.5 0 0 1 0 5H22"/><path d="M11 6v3M15 5.5V9M19 6v3"/></svg>`,
  "Moda circular": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6l-6 3 2 5 2-1v11h12V13l2 1 2-5-6-3-4 3-4-3z"/></svg>`,
  "Educación ambiental": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 5l10 5-10 5-10-5 10-5z"/><path d="M10 12.5V19c0 2.2 2.7 4 6 4s6-1.8 6-4v-6.5"/><path d="M26 10v7"/></svg>`,
  "Agricultura orgánica": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 27V11"/><path d="M16 15c0-3 2.4-5.2 6-5.6 0 3.4-2.4 5.2-6 5.6zM16 21c0-3 2.4-5.2 6-5.6 0 3.4-2.4 5.2-6 5.6z"/><path d="M16 15c0-3-2.4-5.2-6-5.6 0 3.4 2.4 5.2 6 5.6zM16 21c0-3-2.4-5.2-6-5.6 0 3.4 2.4 5.2 6 5.6z"/></svg>`,
  "Educación / Tecnología": `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="12" width="18" height="13" rx="3"/><circle cx="12.5" cy="18.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="19.5" cy="18.5" r="1.3" fill="currentColor" stroke="none"/><path d="M16 12V8"/><circle cx="16" cy="6.5" r="1.8"/><path d="M7 17H4.5M25 17h2.5"/></svg>`
};

/* ---------------------------------------------------------
   Iconos de interfaz — un único sistema para toda la página.
   Antes convivían emoji (glifos del sistema, de estilo dispar)
   con SVG propios; esto unifica el registro visual.
   --------------------------------------------------------- */
const S = (d, extra) =>
  `<svg class="ui-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}${extra || ""}</svg>`;

const UI = {
  buscar:      S('<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l4.5 4.5"/>'),
  manos:       S('<circle cx="9" cy="8.5" r="3"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M3 19c0-3.2 2.7-5 6-5 1.6 0 3 .4 4 1.1"/><path d="M13.5 19c0-2.6 1.5-4.4 4-4.4s3.5 1.8 3.5 4.4"/>'),
  chat:        S('<path d="M20 14a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>'),
  cohete:      S('<path d="M4 18l5-5 3.5 3.5L20 9"/><path d="M15 9h5v5"/>'),
  reciclar:    S('<path d="M6.5 9.5A7 7 0 0 1 18 10.5"/><path d="M17.5 14.5A7 7 0 0 1 6 13.5"/><path d="M15.5 10l3 .5.5-3"/><path d="M8.5 14l-3-.5-.5 3"/>'),
  hoja:        S('<path d="M12 20V11"/><path d="M12 11c0-4 2.5-6.5 6.5-7 0 4.3-2.5 6.5-6.5 7z"/><path d="M12 15c0-3-2-5-5-5.5 0 3.3 2 5 5 5.5z"/>'),
  ovillo:      S('<circle cx="11" cy="13" r="6"/><path d="M7 8.5c2.7 2.7 5.5 5.5 8 8"/><path d="M5.5 12c2 2 4.7 4.7 6.7 6.7"/><path d="M16 10l4-4"/>'),
  engranaje:   S('<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/>'),
  estrella:    S('<path d="M12 4l2.3 4.9 5.2.7-3.8 3.8.9 5.3L12 16.2 7.4 18.7l.9-5.3L4.5 9.6l5.2-.7z"/>'),
  destello:    S('<path d="M12 4v5M12 15v5M4 12h5M15 12h5"/><path d="M7 7l2.5 2.5M14.5 14.5L17 17M17 7l-2.5 2.5M9.5 14.5L7 17"/>'),
  brote:       S('<path d="M12 20v-7"/><path d="M12 13c0-3 2-5 5-5.5 0 3.3-2 5-5 5.5z"/><path d="M12 15c0-2.5-1.7-4.2-4.2-4.6 0 2.8 1.7 4.2 4.2 4.6z"/>'),
  globo:       S('<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.2 2.4 2.2 13.6 0 16M12 4c-2.2 2.4-2.2 13.6 0 16"/>'),
  bombilla:    S('<path d="M9.5 17h5M10 20h4"/><path d="M8 11a4 4 0 1 1 8 0c0 1.7-1 2.4-1.5 3.4-.3.6-.5 1-.5 1.6h-4c0-.6-.2-1-.5-1.6C9 13.4 8 12.7 8 11z"/>'),
  grafica:     S('<path d="M4 19h16"/><path d="M7 16V9M12 16V5M17 16v-5"/>'),
  medalla:     S('<circle cx="12" cy="14" r="5"/><path d="M9 9L7 3h10l-2 6"/>'),
  microscopio: S('<path d="M6 20h13"/><path d="M9 20a5 5 0 0 0 7-4.5"/><path d="M11 5l4 5-3 2.5-4-5z"/><path d="M8.5 14.5l2-1.5"/>'),
  paleta:      S('<path d="M12 20a8 8 0 1 1 8-8c0 2-2 2.5-3.5 2.5S14 15 14 16.5 13 20 12 20z"/><circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none"/><circle cx="13" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/>'),
  telefono:    S('<path d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L15.5 12l4 1.5V17a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4 6.2 2 2 0 0 1 6 4z"/>'),
  correo:      S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6 8.5-6"/>'),
  ubicacion:   S('<path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  calendario:  S('<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
  personas:    S('<circle cx="9" cy="9" r="3"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 6.5a3 3 0 0 1 0 5.8M17 14c2.4.4 4 2 4 5"/>'),
  guardar:     S('<path d="M6 4h9l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M8 4v5h6M8 14h8"/>'),
  tarjeta:     S('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 14.5h3"/>'),
  bolsa:       S('<path d="M6 8h12l-1 12H7z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  caja:        S('<path d="M4 8l8-3.5L20 8v8l-8 3.5L4 16z"/><path d="M4 8l8 3.5L20 8M12 11.5V19"/>'),
  dinero:      S('<circle cx="12" cy="12" r="8"/><path d="M12 7.5v9M14.5 10c0-1.2-1.1-2-2.5-2s-2.5.8-2.5 2 1.1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2-2.5-.8-2.5-2"/>'),
  edificio:    S('<path d="M4 20V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14"/><path d="M12 20v-8h7a1 1 0 0 1 1 1v7"/><path d="M6.5 8.5h3M6.5 12h3M6.5 15.5h3M15 15.5h2"/><path d="M3 20h18"/>'),
  birrete:     S('<path d="M12 4l9 4-9 4-9-4z"/><path d="M7 10.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.5"/><path d="M21 8v5"/>'),
  amanecer:    S('<path d="M3 18h18M6 18a6 6 0 0 1 12 0"/><path d="M12 4v3M5 8l2 2M19 8l-2 2"/>'),
  camara:      S('<rect x="3" y="7" width="18" height="13" rx="2.5"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8.5 7l1.5-2.5h4L15.5 7"/>'),
  flecha:      S('<path d="M5 12h13M13 7l5 5-5 5"/>'),
  enviar:      S('<path d="M4 12l16-7-7 16-2.5-6.5z"/>'),
  cerrar:      S('<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>'),
  fiesta:      S('<path d="M4 20l5-13 8 8z"/><path d="M15 4.5c1.2 0 1.2 1.5 2.4 1.5M18 9c1 0 1-1.2 2-1.2"/><circle cx="19" cy="14" r="1" fill="currentColor" stroke="none"/>'),
  mundo:       S('<circle cx="12" cy="12" r="8"/><path d="M4.5 9.5h15M4.5 14.5h15"/><path d="M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16"/>'),
  fabrica:     S('<path d="M3 20V11l5 3V11l5 3V7l6 3v10z"/><path d="M3 20h18"/>')
};

// Sustituciones de emoji -> icono, aplicadas en todo el documento.
const EMOJI_A_ICONO = {
  "🔍": UI.buscar,     "🤝": UI.manos,      "💬": UI.chat,      "🚀": UI.cohete,
  "♻️": UI.reciclar,   "♻": UI.reciclar,    "🌿": UI.hoja,      "🧶": UI.ovillo,
  "⚙️": UI.engranaje,  "⚙": UI.engranaje,   "⭐": UI.estrella,   "✨": UI.destello,
  "🌱": UI.brote,      "🌎": UI.globo,      "🌐": UI.globo,     "💡": UI.bombilla,
  "📈": UI.grafica,    "📊": UI.grafica,    "🏅": UI.medalla,   "🔬": UI.microscopio,
  "🎨": UI.paleta,     "📞": UI.telefono,   "✉️": UI.correo,    "✉": UI.correo,
  "📍": UI.ubicacion,  "📅": UI.calendario, "👥": UI.personas,  "💾": UI.guardar,
  "📇": UI.tarjeta,    "🛍️": UI.bolsa,     "🛍": UI.bolsa,     "📦": UI.caja,
  "💰": UI.dinero,     "🏢": UI.edificio,   "🎓": UI.birrete,   "🌅": UI.amanecer,
  "📷": UI.camara,     "🏡": UI.edificio,   "🌳": UI.hoja,      "🌾": UI.brote,
  "🤲": UI.manos,      "🎉": UI.destello,   "🏭": UI.fabrica,   "🧑‍🤝‍🧑": UI.personas,
  "🎪": UI.fiesta,     "🌍": UI.mundo,      "☕": UI.hoja
};

// Marcas para los actores del final cinematográfico y patrocinadores
const LOGOS_GENERICOS = {
  emprendedores: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="18" r="6" stroke="#39852C" stroke-width="2.8"/><path d="M12 38c0-6.6 5.4-10 12-10s12 3.4 12 10" stroke="#39852C" stroke-width="2.8" stroke-linecap="round"/></svg>`,
  empresas: `<svg viewBox="0 0 48 48" fill="none"><rect x="12" y="14" width="11" height="22" stroke="#4060A0" stroke-width="2.6"/><rect x="25" y="21" width="11" height="15" stroke="#327BA6" stroke-width="2.6"/><path d="M16 20h3M16 26h3M29 27h3" stroke="#4060A0" stroke-width="2" stroke-linecap="round"/></svg>`,
  comunidades: `<svg viewBox="0 0 48 48" fill="none"><circle cx="17" cy="19" r="4.5" stroke="#D3237B" stroke-width="2.6"/><circle cx="31" cy="19" r="4.5" stroke="#802070" stroke-width="2.6"/><path d="M9 35c0-5 3.6-8 8-8s8 3 8 8M23 35c0-5 3.6-8 8-8s8 3 8 8" stroke="#D3237B" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  patrocinadores: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 11l4 8.4 9 1.3-6.5 6.6 1.5 9.4L24 32.3 16 36.7l1.5-9.4L11 20.7l9-1.3L24 11z" stroke="#D9A441" stroke-width="2.6" stroke-linejoin="round"/></svg>`,
  instituciones: `<svg viewBox="0 0 48 48" fill="none"><path d="M11 21l13-7 13 7" stroke="#4060A0" stroke-width="2.6" stroke-linejoin="round"/><path d="M15 23v11M22 23v11M29 23v11M35 23v11M11 36h26" stroke="#4060A0" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  aliados: `<svg viewBox="0 0 48 48" fill="none"><path d="M14 26l6-6a4 4 0 0 1 5.6 0L28 22" stroke="#39852C" stroke-width="2.8" stroke-linecap="round"/><path d="M34 22l-6 6a4 4 0 0 1-5.6 0L20 26" stroke="#5C7D26" stroke-width="2.8" stroke-linecap="round"/></svg>`
};
