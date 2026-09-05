/* =========================================================
   MULTIEXITOSAS — App logic (DEMO, sin backend)
   ========================================================= */

const state = {
  search: "",
  categoria: "",
  ubicacion: "",
  tipo: "",
  chip: "todos",
  need: "todos"
};

const iconosCategoria = {
  "Cosmética natural": "🌿", "Economía circular": "♻️", "Hogar sostenible": "🏡",
  "Artesanías": "🧶", "Empaques sostenibles": "📦", "Alimentos y bebidas": "☕",
  "Moda circular": "👕", "Educación ambiental": "🌳", "Agricultura orgánica": "🌾",
  "Educación / Tecnología": "🤖"
};

/* ---------- Utilidades ---------- */
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

function abrirModal(id) { document.getElementById(id).classList.add("open"); document.body.style.overflow = "hidden"; }
function cerrarModal(id) { document.getElementById(id).classList.remove("open"); document.body.style.overflow = ""; }

function cardEmpHTML(e) {
  const verdeBadge = e.esVerde ? `<span class="badge-verde">🌿 Negocio verde</span>` : "";
  const nuevoBadge = e.esNuevo ? `<span class="badge-nuevo">Nuevo</span>` : "";
  const tags = e.etiquetas.slice(0, 3).map((t, i) => `<span class="tag ${i === 1 ? 'tag-berry' : ''}">${t}</span>`).join("");
  return `
  <div class="card-emp" data-id="${e.id}">
    <div class="cover" style="background:linear-gradient(135deg, ${e.color}, ${shade(e.color)});">
      ${verdeBadge}${nuevoBadge}
      <span style="font-size:36px; opacity:.9;">${e.logo}</span>
    </div>
    <div class="body">
      <div class="logo-row">
        <div class="logo-circle">${e.logo}</div>
      </div>
      <h3>${e.nombre}</h3>
      <span class="tagline">${e.tagline}</span>
      <p class="desc">${e.descripcionCorta}</p>
      <div class="meta-row">📍 ${e.ubicacion} &nbsp;·&nbsp; ${e.categoria}</div>
      <div class="tag-row">${tags}</div>
      <div class="actions">
        <button class="btn btn-outline" onclick="abrirPerfil('${e.id}')">Ver emprendimiento</button>
        <button class="btn btn-primary" onclick="abrirChat('${e.id}')">Conectar</button>
      </div>
    </div>
  </div>`;
}

function shade(hex) {
  // darkens a hex color slightly for gradient
  let c = hex.replace("#", "");
  let r = Math.max(0, parseInt(c.substring(0,2),16) - 35);
  let g = Math.max(0, parseInt(c.substring(2,4),16) - 35);
  let b = Math.max(0, parseInt(c.substring(4,6),16) - 35);
  return `rgb(${r},${g},${b})`;
}

/* ---------- Render: Destacados ---------- */
function renderDestacados() {
  const el = document.getElementById("gridDestacados");
  const destacados = EMPRENDIMIENTOS.filter(e => e.destacado).slice(0, 4);
  el.innerHTML = destacados.map(cardEmpHTML).join("");
  observeCards(el);
}

/* ---------- Render: Categorías ---------- */
function renderCategorias() {
  const el = document.getElementById("catGrid");
  el.innerHTML = CATEGORIAS.map(cat => `
    <button class="cat-pill" onclick="irAExplorarConCategoria('${cat}')">
      <div class="ic">${iconosCategoria[cat] || "🏷️"}</div>
      <span>${cat}</span>
    </button>`).join("");
}

function irAExplorarConCategoria(cat) {
  state.categoria = cat;
  document.getElementById("filterCategoria").value = cat;
  aplicarFiltros();
  document.getElementById("explorar").scrollIntoView({ behavior: "smooth" });
}

/* ---------- Explorador con filtros ---------- */
function poblarSelects() {
  const selCat = document.getElementById("filterCategoria");
  CATEGORIAS.forEach(c => selCat.insertAdjacentHTML("beforeend", `<option value="${c}">${c}</option>`));
  const selUbi = document.getElementById("filterUbicacion");
  UBICACIONES.forEach(u => selUbi.insertAdjacentHTML("beforeend", `<option value="${u}">${u}</option>`));
}

function aplicarFiltros() {
  let list = EMPRENDIMIENTOS.filter(e => {
    if (state.search) {
      const q = state.search.toLowerCase();
      const haystack = (e.nombre + " " + e.tagline + " " + e.descripcionCorta + " " + e.etiquetas.join(" ")).toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (state.categoria && e.categoria !== state.categoria) return false;
    if (state.ubicacion && e.ubicacion !== state.ubicacion) return false;
    if (state.tipo && e.tipo !== state.tipo) return false;
    if (state.chip === "verde" && !e.esVerde) return false;
    if (state.chip === "nuevo" && !e.esNuevo) return false;
    if (state.chip === "destacado" && !e.destacado) return false;
    if (state.chip === "circular" && e.categoria !== "Economía circular") return false;
    return true;
  });

  const grid = document.getElementById("gridExplorar");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("resultsCount");

  count.textContent = `${list.length} emprendimiento${list.length !== 1 ? "s" : ""} encontrado${list.length !== 1 ? "s" : ""}`;

  if (list.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = list.map(cardEmpHTML).join("");
    observeCards(grid);
  }
}

function filtrarVerdesDesdeBanner() {
  document.querySelectorAll("#chipFilters .chip").forEach(c => c.classList.remove("active"));
  document.querySelector('#chipFilters [data-chip="verde"]').classList.add("active");
  state.chip = "verde";
  aplicarFiltros();
  document.getElementById("explorar").scrollIntoView({ behavior: "smooth" });
}

/* ---------- Perfil de emprendimiento ---------- */
function abrirPerfil(id) {
  const e = EMPRENDIMIENTOS.find(x => x.id === id);
  if (!e) return;
  const relacionados = EMPRENDIMIENTOS.filter(x => x.id !== e.id && (x.categoria === e.categoria || x.esVerde === e.esVerde)).slice(0, 4);

  const productos = e.productos.map(p => `<span>${p}</span>`).join("");
  const galeria = e.galeria.map(g => `<div>${g}</div>`).join("");
  const relacionadosHTML = relacionados.map(r => `
    <div class="related-mini" style="cursor:pointer;" onclick="abrirPerfil('${r.id}')">
      <div class="ic">${r.logo}</div>
      <span>${r.nombre}</span>
    </div>`).join("");

  document.getElementById("profileModalBox").innerHTML = `
    <button class="modal-close" onclick="cerrarModal('profileModal')"><svg class="ui-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg></button>
    <div class="profile-cover" style="background:linear-gradient(135deg, ${e.color}, ${shade(e.color)}); color:#fff; font-size:54px;">${e.logo}</div>
    <div class="profile-head">
      <div class="profile-logo">${e.logo}</div>
      <h2>${e.nombre}</h2>
      <span class="tagline" style="font-size:14.5px; color:var(--gris-500);">${e.tagline}</span>
      <div class="tag-row" style="margin-top:10px;">
        ${e.esVerde ? '<span class="tag">🌿 Negocio verde</span>' : ''}
        ${e.etiquetas.map(t => `<span class="tag tag-berry">${t}</span>`).join("")}
      </div>
    </div>
    <div class="profile-body">
      <div class="profile-section">
        <h4>Sobre el emprendimiento</h4>
        <p>${e.descripcionCorta}</p>
        <p>${e.historia}</p>
      </div>
      <div class="profile-section">
        <h4>📍 Ubicación y categoría</h4>
        <p>${e.ubicacion} · ${e.categoria} · ${e.tipo}</p>
      </div>
      <div class="profile-section">
        <h4>Productos y servicios</h4>
        <div class="profile-products">${productos}</div>
      </div>
      <div class="profile-section">
        <h4>Galería</h4>
        <div class="gallery-row">${galeria}</div>
      </div>
      <div class="profile-section">
        <h4>Indicadores de impacto</h4>
        <div class="impact-mini">
          <div><div class="ic">🤲</div><p><strong>Social:</strong> ${e.impacto.social}</p></div>
          <div><div class="ic">🌱</div><p><strong>Ambiental:</strong> ${e.impacto.ambiental}</p></div>
          <div><div class="ic">📈</div><p><strong>Económico:</strong> ${e.impacto.economico}</p></div>
        </div>
      </div>
      <div class="profile-section">
        <h4>Contacto</h4>
        <div class="contact-list">
          <a href="#" onclick="return false;">💬 WhatsApp · ${e.contacto.whatsapp}</a>
          <a href="#" onclick="return false;">✉️ ${e.contacto.email}</a>
          <a href="#" onclick="return false;">📷 ${e.contacto.instagram}</a>
          <a href="#" onclick="return false;">🌐 ${e.contacto.sitio}</a>
        </div>
      </div>
      <div class="profile-footer-actions">
        <button class="btn btn-primary" onclick="cerrarModal('profileModal'); abrirChat('${e.id}')">Conectar con este emprendimiento</button>
        <button class="btn btn-outline" onclick="guardarEmprendimiento('${e.id}')">💾 Guardar</button>
      </div>
      <div class="profile-section">
        <h4>Emprendimientos relacionados</h4>
        <div class="related-grid">${relacionadosHTML}</div>
      </div>
    </div>
  `;
  abrirModal("profileModal");
  document.dispatchEvent(new CustomEvent("profile:opened", { detail: { id } }));
}

function guardarEmprendimiento(id) {
  const e = EMPRENDIMIENTOS.find(x => x.id === id);
  toast(`💾 ${e.nombre} guardado en tus favoritos (demo)`);
}

/* ---------- Chat / Conectar (simulación de networking) ---------- */
const chatState = {}; // { empId: [{de, texto, hora}] }

const mensajesQuickReply = {
  aliados: "Nos gustaría explorar una posible alianza estratégica con tu emprendimiento.",
  proveedores: "Estamos buscando proveedores confiables, ¿podríamos conocer más sobre lo que ofreces?",
  clientes: "Nos interesa conocer más sobre tus productos como potenciales clientes.",
  inversion: "Estamos explorando oportunidades de inversión, ¿podemos conversar más al respecto?"
};

function abrirChat(id) {
  const e = EMPRENDIMIENTOS.find(x => x.id === id);
  if (!e) return;
  if (!chatState[id]) chatState[id] = [];

  document.getElementById("chatModalBox").innerHTML = `
    <button class="modal-close" onclick="cerrarModal('chatModal')"><svg class="ui-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg></button>
    <div class="chat-header">
      <div class="logo-circle">${e.logo}</div>
      <div>
        <strong>${e.nombre}</strong>
        <span>Activo ahora</span>
      </div>
    </div>
    <div id="chatBodyArea"></div>
  `;
  renderChatBody(id);
  abrirModal("chatModal");
}

function renderChatBody(id) {
  const e = EMPRENDIMIENTOS.find(x => x.id === id);
  const area = document.getElementById("chatBodyArea");
  const hist = chatState[id];

  if (hist.length === 0) {
    area.innerHTML = `
      <div class="chat-messages">
        <div class="msg them">Hola 👋, soy parte del equipo de ${e.nombre}. ¿En qué podemos ayudarte o cómo podemos colaborar?<span class="msg-time">ahora</span></div>
      </div>
      <div class="chat-intro-actions">
        <button class="chat-quick-btn" onclick="enviarRapido('${id}','aliados')">🤝 Solicitar colaboración</button>
        <button class="chat-quick-btn" onclick="enviarRapido('${id}','clientes')">🛍️ Consultar productos/servicios</button>
        <button class="chat-quick-btn" onclick="compartirContacto('${id}')">📇 Compartir contacto</button>
        <button class="chat-quick-btn" onclick="cerrarModal('chatModal'); guardarEmprendimiento('${id}')">💾 Guardar emprendimiento</button>
      </div>
      ${chatInputRow(id)}
    `;
  } else {
    area.innerHTML = `
      <div class="chat-messages" id="chatMsgs">
        ${hist.map(m => msgHTML(m)).join("")}
      </div>
      ${chatInputRow(id)}
    `;
    const msgs = document.getElementById("chatMsgs");
    msgs.scrollTop = msgs.scrollHeight;
  }
}

function msgHTML(m) {
  return `<div class="msg ${m.de === 'yo' ? 'me' : 'them'}">${m.texto}<span class="msg-time">${m.hora}</span></div>`;
}

function chatInputRow(id) {
  return `
    <div class="chat-input-row">
      <input type="text" id="chatInput_${id}" placeholder="Escribe tu mensaje..." onkeydown="if(event.key==='Enter') enviarMensaje('${id}')">
      <button onclick="enviarMensaje('${id}')"><svg class="ui-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l16-7-7 16-2.5-6.5z"/></svg></button>
    </div>`;
}

function horaActual() {
  const d = new Date();
  return d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0");
}

function enviarRapido(id, tipo) {
  const texto = mensajesQuickReply[tipo] || "Hola, me gustaría conectar contigo.";
  chatState[id].push({ de: "yo", texto, hora: horaActual() });
  renderChatBody(id);
  simularRespuesta(id);
}

function compartirContacto(id) {
  chatState[id].push({ de: "yo", texto: "📇 Contacto compartido: mi.emprendimiento@demo.com (dato ficticio de ejemplo)", hora: horaActual() });
  renderChatBody(id);
  toast("Contacto compartido (simulación demo)");
  simularRespuesta(id);
}

function enviarMensaje(id) {
  const input = document.getElementById(`chatInput_${id}`);
  const texto = input.value.trim();
  if (!texto) return;
  chatState[id].push({ de: "yo", texto, hora: horaActual() });
  input.value = "";
  renderChatBody(id);
  simularRespuesta(id);
}

function simularRespuesta(id) {
  const e = EMPRENDIMIENTOS.find(x => x.id === id);
  const area = document.getElementById("chatBodyArea");
  const msgsBox = area.querySelector(".chat-messages");
  if (!msgsBox) return;
  msgsBox.insertAdjacentHTML("beforeend", `<div class="typing-indicator" id="typing_${id}"><span></span><span></span><span></span></div>`);
  msgsBox.scrollTop = msgsBox.scrollHeight;

  const respuestas = [
    `¡Gracias por escribirnos! Nos encantaría coordinar una llamada para conocer más sobre ${["tu propuesta","tu emprendimiento","tu idea"][Math.floor(Math.random()*3)]}.`,
    "Claro que sí, cuéntanos un poco más sobre lo que tienes en mente y te contactamos por WhatsApp.",
    "¡Excelente! Estamos abiertos a explorar esa colaboración, en breve te compartimos más detalles.",
  ];

  setTimeout(() => {
    const typingEl = document.getElementById(`typing_${id}`);
    if (typingEl) typingEl.remove();
    chatState[id].push({ de: e.nombre, texto: respuestas[Math.floor(Math.random()*respuestas.length)], hora: horaActual() });
    renderChatBody(id);
  }, 1400);
}

/* ---------- Bandeja de conversaciones demo ---------- */
let inboxActiveId = CONVERSACIONES_DEMO[0].id;

function abrirInbox() {
  renderInbox();
  abrirModal("inboxModal");
}

function renderInbox() {
  const list = CONVERSACIONES_DEMO.map(c => {
    const last = c.mensajes[c.mensajes.length - 1];
    return `
      <div class="inbox-item ${c.id === inboxActiveId ? 'active' : ''}" onclick="seleccionarConversacion('${c.id}')">
        <div class="logo-circle">${c.logo}</div>
        <div class="txt">
          <strong>${c.participante}</strong>
          <p>${last.texto}</p>
        </div>
      </div>`;
  }).join("");

  const activa = CONVERSACIONES_DEMO.find(c => c.id === inboxActiveId);
  const thread = `
    <div class="inbox-thread">
      <div class="chat-header">
        <div class="logo-circle">${activa.logo}</div>
        <div><strong>${activa.participante}</strong><span>Conversación demo</span></div>
      </div>
      <div class="chat-messages">
        ${activa.mensajes.map(m => msgHTML({ de: m.de, texto: m.texto, hora: m.hora })).join("")}
      </div>
      <div class="chat-input-row">
        <input type="text" placeholder="Escribe tu mensaje..." onkeydown="if(event.key==='Enter'){this.value='';toast('Mensaje enviado (demo)')}">
        <button onclick="toast('Mensaje enviado (demo)')"><svg class="ui-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l16-7-7 16-2.5-6.5z"/></svg></button>
      </div>
    </div>`;

  document.getElementById("inboxGrid").innerHTML = `<div class="inbox-list">${list}</div>${thread}`;
}

function seleccionarConversacion(id) {
  inboxActiveId = id;
  renderInbox();
}

/* ---------- Networking: oportunidades ---------- */
const needLabels = {
  aliados: "Busco aliados", proveedores: "Busco proveedores", clientes: "Busco clientes",
  inversion: "Busco inversión", colaboradores: "Busco colaboradores"
};

function renderOportunidades() {
  const list = OPORTUNIDADES.filter(o => state.need === "todos" || o.tipo === state.need);
  const el = document.getElementById("oppGrid");
  el.innerHTML = list.map(o => {
    const e = EMPRENDIMIENTOS.find(x => x.id === o.empId);
    return `
      <div class="opp-card" data-need="${o.tipo}">
        <span class="tag opp-tag">${needLabels[o.tipo]}</span>
        <div class="opp-from">
          <div class="logo-circle">${e.logo}</div>
          <strong>${e.nombre}</strong>
        </div>
        <p>${o.texto}</p>
        <button class="btn btn-primary btn-sm" onclick="abrirChat('${e.id}')">Quiero conectar</button>
      </div>`;
  }).join("");
}

/* ---------- Eventos ---------- */
function formatFecha(iso) {
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const [y,m,d] = iso.split("-");
  return `${parseInt(d)} ${meses[parseInt(m)-1]} ${y}`;
}

function renderEventos() {
  const el = document.getElementById("gridEventos");
  el.innerHTML = EVENTOS.map(ev => `
    <div class="card-event">
      <div class="cover">${ev.imagen}</div>
      <div class="body">
        <span class="event-date">📅 ${formatFecha(ev.fecha)}</span>
        <h3>${ev.titulo}</h3>
        <p style="font-size:13.5px;">${ev.descripcion}</p>
        <div class="loc">📍 ${ev.lugar}</div>
        <div class="att">👥 ${ev.asistentes} asistentes confirmados</div>
        <button class="btn btn-outline btn-sm mt-40" style="margin-top:14px;" onclick="toast('📅 Evento «${ev.titulo}» — inscripción demo registrada')">Ver evento</button>
      </div>
    </div>`).join("");
}

/* ---------- Patrocinadores ---------- */
function renderPatrocinadores() {
  const el = document.getElementById("sponsorGrid");
  el.innerHTML = PATROCINADORES.map(p => `
    <div class="sponsor-card">
      <div class="ic">${p.icono}</div>
      <div>
        <span class="tipo">${p.tipo}</span>
        <h4>${p.nombre}</h4>
        <p>${p.descripcion}</p>
      </div>
    </div>`).join("");
}

/* ---------- Wizard de registro ---------- */
const wizardData = { nombre:"", logo:"🌱", categoria:"", ubicacion:"", descripcion:"", historia:"", productos:"", buscando:[], impactoSocial:"", impactoAmbiental:"", impactoEconomico:"", whatsapp:"", email:"", instagram:"", sitio:"" };
let wizardStep = 1;
const wizardTotalSteps = 5;

function abrirWizard() {
  wizardStep = 1;
  Object.assign(wizardData, { nombre:"", logo:"🌱", categoria:"", ubicacion:"", descripcion:"", historia:"", productos:"", buscando:[], impactoSocial:"", impactoAmbiental:"", impactoEconomico:"", whatsapp:"", email:"", instagram:"", sitio:"" });
  renderWizard();
  abrirModal("wizardModal");
}

function wizardDots() {
  let dots = "";
  for (let i = 1; i <= wizardTotalSteps; i++) dots += `<div class="wizard-dot ${i <= wizardStep ? 'active' : ''}"></div>`;
  return dots;
}

const wizardLabels = ["Información básica", "Sobre tu emprendimiento", "Conexiones", "Impacto", "Contacto"];

function renderWizard() {
  const box = document.getElementById("wizardModalBox");
  if (wizardStep > wizardTotalSteps) return renderWizardSuccess();

  let bodyHTML = "";
  if (wizardStep === 1) {
    bodyHTML = `
      <h3>Información básica</h3>
      <p style="font-size:14px;">Cuéntanos lo esencial de tu emprendimiento.</p>
      <div class="form-row"><label>Nombre del emprendimiento</label><input type="text" id="w_nombre" value="${wizardData.nombre}" placeholder="Ej. Raíces Vivas"></div>
      <div class="form-grid-2">
        <div class="form-row"><label>Categoría</label>
          <select id="w_categoria">
            <option value="">Selecciona una categoría</option>
            ${CATEGORIAS.map(c => `<option ${wizardData.categoria===c?'selected':''}>${c}</option>`).join("")}
            <option ${wizardData.categoria==='Otra'?'selected':''}>Otra</option>
          </select>
        </div>
        <div class="form-row"><label>Ubicación</label><input type="text" id="w_ubicacion" value="${wizardData.ubicacion}" placeholder="Ciudad, departamento"></div>
      </div>
      <div class="form-row"><label>Logo (elige un emoji representativo)</label>
        <div class="choice-grid" style="grid-template-columns:repeat(6,1fr);">
          ${["🌱","🌿","♻️","🧶","☕","🌳","🧴","📦","🐟","🤖","👕","🌾"].map(ic => `<button type="button" class="choice-btn ${wizardData.logo===ic?'selected':''}" style="justify-content:center; font-size:20px;" onclick="seleccionarLogo('${ic}')">${ic}</button>`).join("")}
        </div>
      </div>
    `;
  } else if (wizardStep === 2) {
    bodyHTML = `
      <h3>Sobre tu emprendimiento</h3>
      <div class="form-row"><label>Descripción corta</label><textarea id="w_descripcion" rows="2" placeholder="¿Qué haces en una frase?">${wizardData.descripcion}</textarea></div>
      <div class="form-row"><label>Historia</label><textarea id="w_historia" rows="3" placeholder="¿Cómo nació tu emprendimiento?">${wizardData.historia}</textarea></div>
      <div class="form-row"><label>Productos o servicios (sepáralos por coma)</label><input type="text" id="w_productos" value="${wizardData.productos}" placeholder="Ej. Cremas, jabones, aceites"></div>
    `;
  } else if (wizardStep === 3) {
    const opciones = [
      { key: "clientes", label: "Clientes", ic: "🛍️" }, { key: "aliados", label: "Aliados", ic: "🤝" },
      { key: "proveedores", label: "Proveedores", ic: "📦" }, { key: "inversion", label: "Inversión", ic: "💰" },
      { key: "colaboradores", label: "Colaboradores", ic: "🧑‍🤝‍🧑" }
    ];
    bodyHTML = `
      <h3>Conexiones</h3>
      <p style="font-size:14px;">¿Qué estás buscando en el ecosistema? (elige una o varias)</p>
      <div class="choice-grid">
        ${opciones.map(o => `<button type="button" class="choice-btn ${wizardData.buscando.includes(o.key)?'selected':''}" onclick="toggleBuscando('${o.key}')">${o.ic} ${o.label}</button>`).join("")}
      </div>
    `;
  } else if (wizardStep === 4) {
    bodyHTML = `
      <h3>Impacto</h3>
      <div class="form-row"><label>Impacto social</label><input type="text" id="w_impSocial" value="${wizardData.impactoSocial}" placeholder="Ej. Genera empleo para 5 familias"></div>
      <div class="form-row"><label>Impacto ambiental</label><input type="text" id="w_impAmbiental" value="${wizardData.impactoAmbiental}" placeholder="Ej. Empaques biodegradables"></div>
      <div class="form-row"><label>Impacto económico</label><input type="text" id="w_impEconomico" value="${wizardData.impactoEconomico}" placeholder="Ej. Comercio justo con productores locales"></div>
    `;
  } else if (wizardStep === 5) {
    bodyHTML = `
      <h3>Contacto</h3>
      <div class="form-grid-2">
        <div class="form-row"><label>WhatsApp</label><input type="text" id="w_whatsapp" value="${wizardData.whatsapp}" placeholder="+57 300 000 0000"></div>
        <div class="form-row"><label>Email</label><input type="email" id="w_email" value="${wizardData.email}" placeholder="contacto@tuemprendimiento.com"></div>
      </div>
      <div class="form-grid-2">
        <div class="form-row"><label>Instagram</label><input type="text" id="w_instagram" value="${wizardData.instagram}" placeholder="@tuemprendimiento"></div>
        <div class="form-row"><label>Sitio web (opcional)</label><input type="text" id="w_sitio" value="${wizardData.sitio}" placeholder="www.tuemprendimiento.com"></div>
      </div>
    `;
  }

  box.innerHTML = `
    <button class="modal-close" onclick="cerrarModal('wizardModal')"><svg class="ui-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg></button>
    <div class="wizard-steps">${wizardDots()}</div>
    <div class="wizard-step-label">Paso ${wizardStep} de ${wizardTotalSteps} · ${wizardLabels[wizardStep-1]}</div>
    <div class="wizard-body">${bodyHTML}</div>
    <div class="wizard-footer">
      <button class="btn btn-outline" ${wizardStep===1?'disabled':''} onclick="wizardAtras()">← Atrás</button>
      <button class="btn btn-primary" onclick="wizardSiguiente()">${wizardStep===wizardTotalSteps ? 'Finalizar registro' : 'Siguiente →'}</button>
    </div>
  `;
}

function seleccionarLogo(ic) { wizardData.logo = ic; renderWizard(); }
function toggleBuscando(key) {
  const idx = wizardData.buscando.indexOf(key);
  if (idx > -1) wizardData.buscando.splice(idx, 1); else wizardData.buscando.push(key);
  renderWizard();
}

function guardarPasoActual() {
  if (wizardStep === 1) {
    wizardData.nombre = document.getElementById("w_nombre")?.value || "";
    wizardData.categoria = document.getElementById("w_categoria")?.value || "";
    wizardData.ubicacion = document.getElementById("w_ubicacion")?.value || "";
  } else if (wizardStep === 2) {
    wizardData.descripcion = document.getElementById("w_descripcion")?.value || "";
    wizardData.historia = document.getElementById("w_historia")?.value || "";
    wizardData.productos = document.getElementById("w_productos")?.value || "";
  } else if (wizardStep === 4) {
    wizardData.impactoSocial = document.getElementById("w_impSocial")?.value || "";
    wizardData.impactoAmbiental = document.getElementById("w_impAmbiental")?.value || "";
    wizardData.impactoEconomico = document.getElementById("w_impEconomico")?.value || "";
  } else if (wizardStep === 5) {
    wizardData.whatsapp = document.getElementById("w_whatsapp")?.value || "";
    wizardData.email = document.getElementById("w_email")?.value || "";
    wizardData.instagram = document.getElementById("w_instagram")?.value || "";
    wizardData.sitio = document.getElementById("w_sitio")?.value || "";
  }
}

function wizardSiguiente() {
  guardarPasoActual();
  if (wizardStep === 1 && !wizardData.nombre.trim()) { toast("Por favor ingresa el nombre de tu emprendimiento"); return; }
  wizardStep++;
  renderWizard();
}
function wizardAtras() {
  guardarPasoActual();
  wizardStep--;
  renderWizard();
}

function renderWizardSuccess() {
  document.getElementById("wizardModalBox").innerHTML = `
    <button class="modal-close" onclick="cerrarModal('wizardModal')"><svg class="ui-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg></button>
    <div class="wizard-success">
      <div class="ic">🎉</div>
      <h3>¡${wizardData.nombre || "Tu emprendimiento"} está listo para formar parte del ecosistema!</h3>
      <p style="max-width:420px; margin:0 auto 24px;">Esta es una demostración del flujo de registro. En la versión completa de la plataforma, tu perfil quedaría publicado automáticamente en el directorio y podrías empezar a recibir conexiones.</p>
      <button class="btn btn-primary" onclick="cerrarModal('wizardModal')">Volver al ecosistema</button>
    </div>
  `;
}

/* ---------- Contador de impacto animado ---------- */
function animarContadores() {
  document.querySelectorAll(".impact-stat strong[data-count]").forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + "+";
    }, 22);
  });
}

/* ---------- Scroll reveal ---------- */
function observeCards(container) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("in-view"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  container.querySelectorAll(".card-emp").forEach(c => io.observe(c));
}

function setupGlobalReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".fade-in").forEach(el => io.observe(el));

  const impactSection = document.getElementById("impacto");
  let animated = false;
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) { animated = true; animarContadores(); }
    });
  }, { threshold: 0.3 });
  io2.observe(impactSection);
}

/* ---------- Navbar scroll & mobile menu ---------- */
function setupNavbar() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  });
  const panel = document.getElementById("mobilePanel");
  document.getElementById("hamburgerBtn").addEventListener("click", () => panel.classList.add("open"));
  document.getElementById("mobileCloseBtn").addEventListener("click", () => panel.classList.remove("open"));
  panel.querySelectorAll("a.mnav").forEach(a => a.addEventListener("click", () => panel.classList.remove("open")));
}

/* ---------- Filtros: listeners ---------- */
function setupFilters() {
  document.getElementById("searchInput").addEventListener("input", (e) => { state.search = e.target.value; aplicarFiltros(); });
  document.getElementById("filterCategoria").addEventListener("change", (e) => { state.categoria = e.target.value; aplicarFiltros(); });
  document.getElementById("filterUbicacion").addEventListener("change", (e) => { state.ubicacion = e.target.value; aplicarFiltros(); });
  document.getElementById("filterTipo").addEventListener("change", (e) => { state.tipo = e.target.value; aplicarFiltros(); });

  document.querySelectorAll("#chipFilters .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#chipFilters .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.chip = chip.dataset.chip;
      aplicarFiltros();
    });
  });

  document.querySelectorAll("#needFilterRow .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#needFilterRow .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.need = chip.dataset.need;
      renderOportunidades();
    });
  });

  const filtersBar = document.getElementById("filtersBar");
  const toggleBtn = document.getElementById("filterToggleBtn");
  const closeBtn = document.getElementById("closeFiltersBtn");
  toggleBtn.addEventListener("click", () => { filtersBar.classList.add("open"); closeBtn.style.display = "block"; });
  closeBtn.addEventListener("click", () => filtersBar.classList.remove("open"));
}

/* ---------- Cerrar modales con click fuera o Esc ---------- */
function setupModalDismiss() {
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"), (document.body.style.overflow = ""); });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.querySelectorAll(".modal-overlay.open").forEach(o => { o.classList.remove("open"); document.body.style.overflow = ""; });
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  poblarSelects();
  renderDestacados();
  renderCategorias();
  aplicarFiltros();
  renderOportunidades();
  renderEventos();
  renderPatrocinadores();
  setupFilters();
  setupNavbar();
  setupModalDismiss();
  setupGlobalReveal();
  document.dispatchEvent(new CustomEvent("app:ready"));
});
