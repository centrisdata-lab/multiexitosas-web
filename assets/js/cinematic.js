/* =========================================================
   MULTIEXITOSAS — Capa cinematográfica
   Depende de: GSAP + ScrollTrigger (assets/js/vendor/, servidos localmente
   para no depender de un CDN externo), data.js, app.js (ya cargados).
   No modifica ninguna variable global existente. Si GSAP no cargó
   por cualquier motivo, aborta limpio y el sitio funcional sigue intacto.
   ========================================================= */
(function () {
  "use strict";

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("[MULTIEXITOSAS] GSAP no disponible — capa cinematográfica desactivada, el sitio funcional sigue operando.");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const Cine = {};

  /* ---------------------------------------------------------
     0. Detección de capacidades
     --------------------------------------------------------- */
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mqTouch = window.matchMedia("(hover: none), (pointer: coarse)");

  function condiciones() {
    const reduced = mqReduced.matches;
    const esTouch = mqTouch.matches;
    const anchoChico = window.innerWidth < 768;
    return { reduced, esTouch, anchoChico, liviano: reduced || esTouch || anchoChico };
  }

  /* ---------------------------------------------------------
     1. Canvas de partículas del hero
     --------------------------------------------------------- */
  function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    const hero = document.getElementById("inicio");
    if (!canvas || !hero) return;

    const { liviano } = condiciones();
    if (liviano) {
      // El video ya es el fondo; las partículas son un lujo prescindible en móvil.
      canvas.remove();
      return;
    }

    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    let particles = [];
    const COUNT = 34;
    const colors = ["rgba(240,225,190,0.5)", "rgba(217,164,65,0.42)", "rgba(255,255,255,0.32)"];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.offsetWidth;
      h = hero.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.04 - Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
        drift: 0.006 + Math.random() * 0.014,
        c: colors[Math.floor(Math.random() * colors.length)]
      };
    }

    function initParticles() {
      particles = Array.from({ length: COUNT }, makeParticle);
    }

    let raf;
    let running = true;
    // Motas de luz flotando en el aire, como polvo en un haz de sol.
    // Sin líneas de conexión: sobre video real ensucian la imagen.
    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.phase += p.drift;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;

        const twinkle = 0.55 + 0.45 * Math.sin(p.phase);
        ctx.beginPath();
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    resize();
    initParticles();
    tick();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); }, 200);
    });

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) tick(); else cancelAnimationFrame(raf);
    });

    gsap.to(canvas, {
      opacity: 0, ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* ---------------------------------------------------------
     1b. Capas de video: parallax, grading y performance
     --------------------------------------------------------- */
  function initHeroVideoParallax() {
    const hero = document.getElementById("inicio");
    const video = document.getElementById("heroVideo");
    if (!hero || !video) return;
    const { liviano } = condiciones();

    // Deriva de cámara continua: sin esto la página está congelada mientras
    // el usuario no scrollea, que es justo el momento de la primera impresión.
    if (!liviano) {
      gsap.to(video, {
        keyframes: [
          { xPercent: -1.6, yPercent: -0.8, duration: 9, ease: "sine.inOut" },
          { xPercent: 0.8, yPercent: 0.6, duration: 11, ease: "sine.inOut" },
          { xPercent: 0, yPercent: 0, duration: 9, ease: "sine.inOut" }
        ],
        repeat: -1
      });
    }

    // Sin zoom: el clip ya es un plano cerrado de mesa. Ampliarlo dejaba las
    // manos gigantes y desenfocadas, y el movimiento dejaba de leerse.
    gsap.fromTo(video,
      { scale: 1 },
      { scale: 1.04, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } }
    );
    gsap.to(".hero-inner > div:first-child", {
      yPercent: liviano ? -12 : -34, opacity: 0, ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
    });
    gsap.to(".hero-visual", {
      yPercent: liviano ? -6 : -16, opacity: 0, ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
    });
    // El overlay sólo se refuerza al final del hero, para el empalme con la
    // sección siguiente; antes arrancaba ya oscureciendo la escena.
    gsap.fromTo(".cine-hero-overlay",
      { opacity: 1 },
      {
        opacity: 1.25, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
      }
    );
  }

  /* ---------------------------------------------------------
     1c. Apertura cinematográfica del hero
     Antes: todo el hero aparecía de golpe con opacity 1 en el frame 0.
     --------------------------------------------------------- */
  function initHeroEntrance() {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const { reduced } = condiciones();
    if (reduced) return;

    const video = document.getElementById("heroVideo");
    const badge = hero.querySelector(".hero-badge");
    const h1 = hero.querySelector("h1");
    const lead = hero.querySelector(".lead");
    const actions = hero.querySelector(".hero-actions");
    const stats = gsap.utils.toArray(hero.querySelectorAll(".hero-stat"));
    const visual = hero.querySelector(".flow-card");
    const minis = gsap.utils.toArray(hero.querySelectorAll(".mini-card"));
    const cue = hero.querySelector(".hero-scroll-cue");
    const overlay = hero.querySelector(".cine-hero-overlay");

    // El título se revela por líneas, tras una máscara: es el gesto de apertura.
    if (h1) envolverLineasTitulo(h1);
    const lineas = h1 ? gsap.utils.toArray(h1.querySelectorAll(".cine-line-inner")) : [];

    // Estado inicial explícito ANTES del primer pintado: si el navegador
    // alcanza a pintar el hero terminado, la apertura pasa desapercibida.
    gsap.set([badge, lead, cue], { opacity: 0 });
    gsap.set(lineas, { yPercent: 100 });
    gsap.set(actions ? actions.children : [], { opacity: 0 });
    gsap.set(stats, { opacity: 0 });
    gsap.set([visual].concat(minis), { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      // Se revela el hero justo cuando la timeline arranca, nunca antes.
      onStart: () => document.documentElement.classList.remove("cine-intro-pending")
    });

    // Sin zoom de apertura: 1.34 dejaba el plano tan ampliado que la escena
    // se veía como una mancha borrosa durante los primeros segundos.
    tl.from(video, { scale: 1.08, duration: 2.2, ease: "power2.out" }, 0)
      .to(badge, { opacity: 1, y: 0, duration: 0.7, startAt: { y: 26 } }, 0.3)
      .to(lineas, { yPercent: 0, duration: 1.25, stagger: 0.14, ease: "power4.out" }, 0.45)
      .to(lead, { opacity: 1, y: 0, duration: 0.9, startAt: { y: 34 } }, 1.15)
      .to(actions ? actions.children : [], { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.12, startAt: { y: 28, scale: 0.92 } }, 1.4)
      .to(stats, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, startAt: { y: 24 } }, 1.65)
      .to(visual, { opacity: 1, x: 0, duration: 1.1, startAt: { x: 70 } }, 0.95)
      .to(minis, { opacity: 1, x: 0, duration: 0.8, stagger: 0.14, startAt: { x: 60 } }, 1.2)
      .to(cue, { opacity: 1, y: 0, duration: 0.7, startAt: { y: -16 } }, 2.0)
      .add(() => {
        // Liberar memoria GPU: la apertura ocurre una sola vez.
        lineas.forEach((l) => { l.style.willChange = "auto"; });
      });

    return tl;
  }

  // Envuelve cada línea del título en una máscara para el reveal vertical.
  function envolverLineasTitulo(h1) {
    if (h1.dataset.split === "1") return;
    const html = h1.innerHTML;
    // Se parte por <br> si existe; si no, por el <em> como bloque semántico.
    const partes = html.split(/<br\s*\/?>/i);
    h1.innerHTML = partes
      .map((p) => `<span class="cine-line-mask"><span class="cine-line-inner">${p}</span></span>`)
      .join("");
    h1.dataset.split = "1";
  }

  // Pausa todo video fuera del viewport y respeta reduced-motion.
  function initVideoPerformance() {
    const videos = document.querySelectorAll(".cine-video");
    if (!videos.length) return;
    const { reduced } = condiciones();

    if (reduced) {
      // Antes se pausaban por completo y el hero quedaba como una foto fija.
      // Un plano de fondo suave no produce parpadeo ni movimiento brusco:
      // se reproduce muy lento en lugar de congelarse.
      videos.forEach((v) => {
        try {
          // Los videos diferidos nunca cargaban su fuente en esta rama y
          // quedaban en negro; hay que activarla igual.
          if (v.dataset.lazySrc && !v.dataset.loaded) {
            v.querySelectorAll("source[data-src]").forEach((s) => { s.src = s.dataset.src; });
            v.load();
            v.dataset.loaded = "1";
          }
          v.playbackRate = 1;
          v.loop = true;
          const pr = v.play();
          if (pr && pr.catch) pr.catch(() => {});
        } catch (e) {}
      });
      return;
    }

    // Los clips ya vienen a 30fps y ~10s con interpolación de movimiento,
    // así que se reproducen a velocidad normal en bucle. El vaivén anterior
    // rebobinaba moviendo currentTime frame a frame y eso provocaba saltos:
    // el navegador tenía que redecodificar desde el único keyframe del archivo.
    videos.forEach((v) => {
      v.playbackRate = 1;
      v.loop = true;
      delete v.dataset.dir;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.isIntersecting) {
          if (v.dataset.lazySrc && !v.dataset.loaded) {
            v.querySelectorAll("source[data-src]").forEach((s) => { s.src = s.dataset.src; });
            v.load();
            v.dataset.loaded = "1";
          }
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        } else {
          try { v.pause(); } catch (e) {}
        }
      });
    }, { threshold: 0.1, rootMargin: "150px" });

    videos.forEach((v) => io.observe(v));

    document.addEventListener("visibilitychange", () => {
      videos.forEach((v) => {
        if (document.hidden) { try { v.pause(); } catch (e) {} }
      });
    });
  }

  /* ---------------------------------------------------------
     2. Cursor personalizado (desktop only)
     --------------------------------------------------------- */
  function initCustomCursor() {
    const { liviano } = condiciones();
    if (liviano) return;

    const cursor = document.createElement("div");
    cursor.className = "cine-cursor";
    document.body.appendChild(cursor);
    document.documentElement.classList.add("cine-has-custom-cursor");

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let cx = x, cy = y;
    document.addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
      cursor.classList.add("visible");
    });
    document.addEventListener("mouseleave", () => cursor.classList.remove("visible"));

    function loop() {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    const hoverSelector = "a, button, .card-emp, .cine-node, input, select, textarea, .cat-pill, .sponsor-card, .chip";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverSelector)) cursor.classList.add("cine-cursor-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverSelector)) cursor.classList.remove("cine-cursor-hover");
    });
  }

  /* ---------------------------------------------------------
     2·0. Marcas SVG en lugar de emoji
     Los emoji dependen de la fuente del sistema y se leen como
     algo informal; estas marcas son geométricas y consistentes.
     --------------------------------------------------------- */
  function aplicarLogosSVG() {
    if (typeof LOGOS === "undefined") return;

    // Emprendimientos con fotografía de producto propia. El resto conserva
    // el degradado de color de su categoría.
    const CON_FOTO = new Set([
      "raices-vivas", "ecociclo", "verde-hogar",
      "mujeres-que-crean", "biopack", "cafe-origen"
    ]);

    const pintar = () => {
      // Tarjetas del directorio y destacados
      document.querySelectorAll(".card-emp[data-id]").forEach((card) => {
        const id = card.dataset.id;
        const cover = card.querySelector(".cover");
        if (cover && CON_FOTO.has(id) && !cover.dataset.foto) {
          cover.style.backgroundImage =
            `linear-gradient(180deg, rgba(12,26,18,.12), rgba(12,26,18,.45)), url("assets/img/emp/${id}.jpg")`;
          cover.style.backgroundSize = "cover";
          cover.style.backgroundPosition = "center";
          cover.dataset.foto = "1";
        }

        const svg = LOGOS[id];
        if (!svg) return;
        const circulo = card.querySelector(".logo-circle");
        if (circulo && !circulo.dataset.svg) {
          circulo.innerHTML = svg;
          circulo.dataset.svg = "1";
        }
        // El emoji grande es el ÚLTIMO span de la portada: los primeros son
        // los distintivos "Negocio verde" y "Nuevo".
        const spans = card.querySelectorAll(".cover > span");
        const portada = spans[spans.length - 1];
        if (portada && !portada.dataset.svg && !portada.className) {
          portada.innerHTML = svg;
          portada.dataset.svg = "1";
          portada.classList.add("cine-cover-mark");
          portada.removeAttribute("style");
        }
      });

      // Portadas fotográficas de los eventos
      if (typeof EVENTOS !== "undefined") {
        const tarjetas = document.querySelectorAll("#gridEventos .card-event");
        tarjetas.forEach((card, i) => {
          const cover = card.querySelector(".cover");
          const ev = EVENTOS[i];
          if (!cover || !ev || cover.dataset.foto) return;
          cover.style.backgroundImage =
            `linear-gradient(180deg, rgba(12,26,18,.15), rgba(12,26,18,.55)), url("assets/img/ev/${ev.id}.jpg")`;
          cover.style.backgroundSize = "cover";
          cover.style.backgroundPosition = "center";
          cover.dataset.foto = "1";
          const marca = cover.querySelector(".ui-ico-wrap, .ui-ico");
          if (marca) marca.remove();
        });
      }

      // Iconos de las píldoras de categoría
      if (typeof ICONOS_CATEGORIA !== "undefined") {
        document.querySelectorAll("#catGrid .cat-pill").forEach((pill) => {
          const ic = pill.querySelector(".ic");
          const nombre = pill.querySelector("span");
          if (!ic || !nombre || ic.dataset.svg) return;
          const svg = ICONOS_CATEGORIA[nombre.textContent.trim()];
          if (svg) { ic.innerHTML = svg; ic.dataset.svg = "1"; }
        });
      }

      // Nodos de la red del ecosistema
      document.querySelectorAll(".cine-node[data-id]").forEach((n) => {
        const svg = LOGOS[n.dataset.id];
        const punto = n.querySelector(".cine-node-dot");
        if (svg && punto && !punto.dataset.svg) {
          punto.innerHTML = svg;
          punto.dataset.svg = "1";
        }
      });

      // Momento de conexión y perfil abierto. Estos nodos no llevan data-id,
      // así que la marca se resuelve por el nombre visible.
      document.querySelectorAll(".cine-connect-node, .profile-head, .opp-from, .inbox-item, .chat-header")
        .forEach((bloque) => {
          const circulo = bloque.querySelector(".logo-circle, .profile-logo");
          if (!circulo || circulo.dataset.svg) return;
          const rotulo = bloque.querySelector("strong, h2");
          if (!rotulo || typeof EMPRENDIMIENTOS === "undefined") return;
          const emp = EMPRENDIMIENTOS.find((e) => e.nombre === rotulo.textContent.trim());
          if (emp && LOGOS[emp.id]) { circulo.innerHTML = LOGOS[emp.id]; circulo.dataset.svg = "1"; }
        });
    };

    pintar();
    // Se expone para repintar contenido creado más tarde, sin registrar
    // observers duplicados.
    Cine.repintarMarcas = pintar;
    ["gridExplorar", "gridDestacados"].forEach((id) => {
      const g = document.getElementById(id);
      if (g) new MutationObserver(pintar).observe(g, { childList: true });
    });
    document.addEventListener("profile:opened", (e) => {
      const id = e.detail && e.detail.id;
      const svg = LOGOS[id];
      const logo = document.querySelector(".profile-logo");
      if (logo && svg) { logo.innerHTML = svg; logo.dataset.svg = "1"; }

      // La galería mostraba emojis sueltos de data.js: se sustituyen por la
      // marca del emprendimiento, que es coherente con el resto del sitio.
      if (svg) {
        document.querySelectorAll(".gallery-row > div").forEach((celda) => {
          if (celda.dataset.svg) return;
          celda.innerHTML = svg;
          celda.dataset.svg = "1";
        });
      }
    });
  }

  /* ---------------------------------------------------------
     2·0b. Unificación de iconografía
     Recorre los nodos de texto y cambia cada emoji por su icono
     SVG equivalente, para que toda la página comparta un mismo
     lenguaje visual en vez de mezclar glifos del sistema.
     --------------------------------------------------------- */
  function unificarIconos(raiz) {
    if (typeof EMOJI_A_ICONO === "undefined") return;
    const objetivo = raiz || document.body;
    const claves = Object.keys(EMOJI_A_ICONO);
    if (!claves.length) return;

    // Ordenar por longitud: las secuencias compuestas (con selector de
    // variación o ZWJ) deben coincidir antes que sus formas simples.
    claves.sort((a, b) => b.length - a.length);
    const patron = new RegExp(claves.map(escaparRegex).join("|"), "g");

    const it = document.createTreeWalker(objetivo, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue || !patron.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        patron.lastIndex = 0;
        // No tocar campos de formulario ni contenido ya convertido.
        const p = n.parentElement;
        if (!p || p.closest("svg, script, style, textarea, input")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const pendientes = [];
    let nodo;
    while ((nodo = it.nextNode())) pendientes.push(nodo);

    pendientes.forEach((n) => {
      patron.lastIndex = 0;
      const html = n.nodeValue.replace(patron, (m) => EMOJI_A_ICONO[m] || m);
      const cont = document.createElement("span");
      cont.className = "ui-ico-wrap";
      cont.innerHTML = html;
      n.parentNode.replaceChild(cont, n);
    });
  }

  function escaparRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* ---------------------------------------------------------
     2a. Acentos de marca por categoría
     Reparte los colores del logo entre las categorías de forma
     estable, para que la identidad aparezca sin saturar.
     --------------------------------------------------------- */
  function aplicarAcentosDeMarca() {
    if (typeof CATEGORIAS === "undefined") return;
    const indice = {};
    CATEGORIAS.forEach((cat, i) => { indice[cat] = (i % 8) + 1; });

    const marcar = () => {
      document.querySelectorAll(".card-emp[data-id]").forEach((card) => {
        const emp = EMPRENDIMIENTOS.find((e) => e.id === card.dataset.id);
        if (emp) card.dataset.acento = indice[emp.categoria] || 1;
      });
      document.querySelectorAll("#catGrid .cat-pill").forEach((pill) => {
        const nombre = pill.querySelector("span");
        if (nombre) pill.dataset.acento = indice[nombre.textContent.trim()] || 1;
      });
    };

    marcar();
    // El explorador re-renderiza al filtrar: hay que volver a marcar.
    const grid = document.getElementById("gridExplorar");
    if (grid) new MutationObserver(marcar).observe(grid, { childList: true });
  }

  /* ---------------------------------------------------------
     2b. Entrada cinematográfica de rejillas de tarjetas
     El fade CSS anterior hacía aparecer todo casi a la vez.
     --------------------------------------------------------- */
  function animarRejilla(selectorContenedor, selectorItem, opts = {}) {
    const cont = document.querySelector(selectorContenedor);
    if (!cont) return;
    const items = gsap.utils.toArray(cont.querySelectorAll(selectorItem));
    if (!items.length) return;
    const { liviano, reduced } = condiciones();

    if (reduced) {
      items.forEach((el) => el.classList.add("in-view"));
      gsap.set(items, { clearProps: "all" });
      return;
    }

    // Se neutraliza la animación CSS previa para que no compita con GSAP.
    items.forEach((el) => el.classList.add("in-view"));

    // Sin esto, un contenedor que arranca fuera de viewport queda con los
    // valores finales aplicados y la entrada nunca se percibe.
    gsap.set(items, { opacity: 0 });

    // El blur va por-elemento y se limpia al terminar cada uno: mantener
    // decenas de tarjetas con filter:blur en espera dispara el compositing.
    items.forEach((el, i) => {
      gsap.fromTo(el,
        {
          y: liviano ? 22 : 46,
          opacity: 0,
          scale: liviano ? 1 : 0.965
        },
        {
          y: 0, opacity: 1, scale: 1,
          duration: liviano ? 0.6 : 0.85,
          ease: "power3.out",
          delay: i * (opts.each || (liviano ? 0.05 : 0.09)),
          onStart: () => { if (!liviano) el.style.filter = "blur(8px)"; },
          onUpdate: function () {
            if (liviano) return;
            const p = this.progress();
            el.style.filter = p > 0.92 ? "" : `blur(${(1 - p) * 8}px)`;
          },
          onComplete: () => { el.style.filter = ""; el.style.willChange = "auto"; },
          scrollTrigger: {
            trigger: cont,
            start: opts.start || "top 82%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }

  // Al filtrar, app.js reemplaza el innerHTML del grid: las tarjetas nuevas
  // aparecerían de golpe. Se observa el grid y se re-anima cada cambio.
  function initFiltroReanimado() {
    const grid = document.getElementById("gridExplorar");
    if (!grid) return;
    const { reduced } = condiciones();
    if (reduced) return;

    let pendiente;
    let primeraCarga = true;
    const mo = new MutationObserver(() => {
      // El primer render lo maneja animarRejilla(); si este observer también
      // actuara, su overwrite mataría aquella tween y dejaría el blur pegado.
      if (primeraCarga) { primeraCarga = false; return; }
      clearTimeout(pendiente);
      pendiente = setTimeout(() => {
        const items = gsap.utils.toArray(grid.querySelectorAll(".card-emp"));
        if (!items.length) return;
        items.forEach((el) => el.classList.add("in-view"));
        gsap.killTweensOf(items);
        gsap.fromTo(items,
          { y: 26, opacity: 0, scale: 0.97, filter: "blur(6px)" },
          {
            y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
            duration: 0.6, ease: "power3.out", stagger: { each: 0.045, from: "start" },
            clearProps: "filter"
          }
        );
      }, 30);
    });
    mo.observe(grid, { childList: true });
  }

  // Encabezados de sección: el eyebrow, el título y el texto entran escalonados
  // en vez de aparecer como un bloque plano.
  function initEncabezados() {
    const { reduced, liviano } = condiciones();
    if (reduced) return;

    gsap.utils.toArray(".section-head").forEach((head) => {
      const partes = gsap.utils.toArray(head.querySelectorAll(".eyebrow, h2, p"));
      if (!partes.length) return;
      // El IO de app.js también anima .fade-in: se marca como visible para
      // que no compita con esta timeline.
      head.classList.add("in-view");
      gsap.from(partes, {
        y: liviano ? 16 : 30,
        opacity: 0,
        duration: liviano ? 0.6 : 0.85,
        ease: "power3.out",
        stagger: 0.1,
        clearProps: "filter",
        scrollTrigger: { trigger: head, start: "top 86%", toggleActions: "play none none none" }
      });
    });
  }

  function initEntradasDeRejillas() {
    animarRejilla("#gridExplorar", ".card-emp");
    animarRejilla("#gridEventos", ".card-event");
    animarRejilla("#sponsorGrid", ".sponsor-card", { each: 0.07 });
    animarRejilla("#catGrid", ".cat-pill", { each: 0.05 });
    animarRejilla("#oppGrid", ".opp-card", { each: 0.08 });
    gsap.utils.toArray(".benefits-grid").forEach((grid, i) => {
      animarRejilla(`.benefits-grid:nth-of-type(${i + 1})`, ".benefit-card", { each: 0.08 });
    });
  }

  /* ---------------------------------------------------------
     3. Transiciones continuas entre secciones existentes
     --------------------------------------------------------- */
  function inicializarTransicionesSeccion() {
    const excluir = new Set(["cine-escenas", "proposito", "cine-final", "inicio"]);
    const { liviano, reduced } = condiciones();
    const secciones = document.querySelectorAll("body > section");

    // Con reduced-motion no se anima nada: ocultar secciones aquí las dejaría
    // invisibles si el trigger no llega a dispararse. El contenido manda.
    if (reduced) {
      secciones.forEach((sec) => gsap.set(sec, { clearProps: "all" }));
      return;
    }

    secciones.forEach((sec) => {
      if (excluir.has(sec.id)) return;
      sec.classList.add("cine-section");

      // Sin blur en el contenedor de sección: multiplicaba el coste de
      // compositing sobre todo su subárbol. La profundidad la aportan
      // los reveals internos (encabezados y tarjetas).
      const from = { autoAlpha: 0, y: liviano ? 16 : 34 };
      const to = { autoAlpha: 1, y: 0, duration: liviano ? 0.6 : 0.85, ease: "power2.out" };

      gsap.fromTo(sec, from, Object.assign({}, to, {
        onStart: () => sec.classList.add("is-animating"),
        onComplete: () => sec.classList.remove("is-animating"),
        scrollTrigger: {
          trigger: sec, start: "top 85%", end: "top 45%",
          toggleActions: "play none none reverse"
        }
      }));
    });
  }

  /* ---------------------------------------------------------
     4. Sistema de red de nodos (reutilizable)
     --------------------------------------------------------- */
  function construirNodosEcosistema({ incluirPatrocinadores = true, subsetEmprendimientos = null } = {}) {
    const nodos = [];
    nodos.push({ id: "core", tipo: "core", nombre: "MULTIEXITOSAS", logo: null });
    const lista = subsetEmprendimientos || EMPRENDIMIENTOS;
    lista.forEach((e) => nodos.push({
      id: e.id, tipo: "emprendimiento", nombre: e.nombre, logo: e.logo,
      desc: e.tagline, categoria: e.categoria, esVerde: e.esVerde, ref: e
    }));
    if (incluirPatrocinadores) {
      PATROCINADORES.forEach((p, i) => nodos.push({
        id: "sponsor-" + i, tipo: "patrocinador", nombre: p.nombre, logo: p.icono, desc: p.tipo, ref: p
      }));
    }
    return nodos;
  }

  function construirConexiones(nodos) {
    const conexiones = [];
    const core = nodos.find((n) => n.tipo === "core");
    nodos.forEach((n) => {
      if (n.tipo !== "core") conexiones.push({ from: core.id, to: n.id });
    });
    const emprendimientos = nodos.filter((n) => n.tipo === "emprendimiento");
    emprendimientos.forEach((a, i) => {
      let extra = 0;
      for (let j = i + 1; j < emprendimientos.length && extra < 2; j++) {
        const b = emprendimientos[j];
        if (a.ref.categoria === b.ref.categoria || a.ref.esVerde === b.ref.esVerde) {
          conexiones.push({ from: a.id, to: b.id, secundaria: true });
          extra++;
        }
      }
    });
    return conexiones;
  }

  function posicionOrbital(index, total, radioX, radioY, cx, cy) {
    const angulo = (index / total) * Math.PI * 2 + index * 0.37;
    const radioJitter = 0.85 + (index % 3) * 0.08;
    return {
      x: cx + Math.cos(angulo) * radioX * radioJitter,
      y: cy + Math.sin(angulo) * radioY * radioJitter
    };
  }

  function renderRed(contenedor, nodos, conexiones, opts = {}) {
    contenedor.innerHTML = "";
    const netWrap = document.createElement("div");
    netWrap.className = "cine-net-wrap";
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "cine-net-lines");
    netWrap.appendChild(svg);
    contenedor.appendChild(netWrap);

    const rect = contenedor.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const radioX = opts.radioX || rect.width * 0.36;
    const radioY = opts.radioY || rect.height * 0.32;

    const core = nodos.find((n) => n.tipo === "core");
    const emprendimientos = nodos.filter((n) => n.tipo === "emprendimiento");
    const sponsors = nodos.filter((n) => n.tipo === "patrocinador");
    const posiciones = { [core.id]: { x: cx, y: cy } };

    emprendimientos.forEach((n, i) => {
      posiciones[n.id] = posicionOrbital(i, emprendimientos.length, radioX, radioY, cx, cy);
    });
    sponsors.forEach((n, i) => {
      posiciones[n.id] = posicionOrbital(i + 0.5, sponsors.length, radioX * 1.32, radioY * 1.3, cx, cy);
    });

    const lineEls = {};
    conexiones.forEach((c) => {
      const p1 = posiciones[c.from], p2 = posiciones[c.to];
      if (!p1 || !p2) return;
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y);
      line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
      line.setAttribute("class", "cine-line");
      line.setAttribute("data-from", c.from);
      line.setAttribute("data-to", c.to);
      svg.appendChild(line);
      (lineEls[c.from] = lineEls[c.from] || []).push(line);
      (lineEls[c.to] = lineEls[c.to] || []).push(line);
    });

    const tooltip = document.createElement("div");
    tooltip.className = "cine-tooltip";
    contenedor.appendChild(tooltip);

    const nodeEls = [];
    nodos.forEach((n) => {
      const pos = posiciones[n.id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cine-node" + (n.tipo === "core" ? " cine-node-core" : "") + (n.tipo === "patrocinador" ? " cine-node-sponsor" : "");
      btn.style.left = pos.x + "px";
      btn.style.top = pos.y + "px";
      btn.dataset.id = n.id;
      // Marca SVG del emprendimiento si existe; si no, el icono genérico
      // por tipo. Nunca el emoji crudo de data.js.
      const marca = n.tipo === "core"
        ? '<img src="assets/img/logo-icon.png" alt="" style="width:28px;height:auto;">'
        : (typeof LOGOS !== "undefined" && LOGOS[n.id]) ||
          (typeof LOGOS_GENERICOS !== "undefined" && LOGOS_GENERICOS.patrocinadores) || "";
      btn.innerHTML = `<span class="cine-node-dot">${marca}</span><span class="cine-node-label">${n.nombre}</span>`;

      btn.addEventListener("mouseenter", () => {
        (lineEls[n.id] || []).forEach((l) => l.classList.add("cine-line-active"));
        nodeEls.forEach((el) => { if (el !== btn) el.classList.add("cine-dim"); });
        if (n.desc) {
          tooltip.innerHTML = `<strong>${n.nombre}</strong>${n.desc}`;
          tooltip.style.left = pos.x + "px";
          tooltip.style.top = pos.y + "px";
          tooltip.classList.add("visible");
        }
      });
      btn.addEventListener("mouseleave", () => {
        (lineEls[n.id] || []).forEach((l) => l.classList.remove("cine-line-active"));
        nodeEls.forEach((el) => el.classList.remove("cine-dim"));
        tooltip.classList.remove("visible");
      });
      btn.addEventListener("click", () => {
        if (n.tipo === "emprendimiento" && typeof abrirPerfil === "function") abrirPerfil(n.id);
        else if (n.tipo === "patrocinador") document.getElementById("patrocinadores").scrollIntoView({ behavior: "smooth" });
        else if (n.tipo === "core") document.getElementById("explorar").scrollIntoView({ behavior: "smooth" });
      });

      contenedor.appendChild(btn);
      nodeEls.push(btn);
    });

    // Movimiento idle sutil (desactivado en modo liviano)
    const { liviano } = condiciones();
    if (!liviano) {
      nodeEls.forEach((el, i) => {
        gsap.to(el, {
          y: "+=" + (6 + (i % 4) * 2),
          duration: 2.4 + (i % 5) * 0.4,
          ease: "sine.inOut",
          yoyo: true, repeat: -1,
          delay: i * 0.12
        });
      });
    }

    return { nodeEls, lineEls, svg };
  }

  /* ---------------------------------------------------------
     5. Escenas narrativas pineadas
     --------------------------------------------------------- */
  function initEscenasNarrativas() {
    const section = document.getElementById("cine-escenas");
    if (!section) return;
    const scenes = section.querySelectorAll(".cine-scene");
    const netContainer = section.querySelector(".cine-scene-net");
    const { liviano } = condiciones();

    const nodosEscena = construirNodosEcosistema({ subsetEmprendimientos: EMPRENDIMIENTOS.slice(0, 6) });
    const conexionesEscena = construirConexiones(nodosEscena);
    let red = null;
    if (netContainer) {
      red = renderRed(netContainer, nodosEscena, conexionesEscena, { radioX: netContainer.clientWidth * 0.34, radioY: netContainer.clientHeight * 0.3 });
      gsap.set(red.nodeEls, { opacity: 0, scale: 0.4 });
      gsap.set(Array.from(red.svg.children), { opacity: 0 });
    }

    if (liviano) {
      // Fallback: sin pin/scrub, todas las escenas visibles apiladas, red visible estática
      scenes.forEach((s) => { s.style.opacity = 1; });
      if (red) { gsap.set(red.nodeEls, { opacity: 1, scale: 1 }); gsap.set(Array.from(red.svg.children), { opacity: 1 }); }
      return;
    }

    gsap.set(scenes[0], { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: "top top", end: "bottom bottom",
        scrub: 1, pin: ".cine-scenes-viewport"
      }
    });

    for (let i = 0; i < scenes.length; i++) {
      if (i > 0) {
        tl.to(scenes[i - 1], { opacity: 0, y: -24, duration: 0.5 }, `scene${i}`);
        tl.to(scenes[i], { opacity: 1, y: 0, duration: 0.5 }, `scene${i}<`);
      }
      // Escena 2 (index 1): aparecen nodos de emprendimientos
      if (i === 1 && red) {
        const empNodes = red.nodeEls.filter((el) => el.dataset.id !== "core" && !el.dataset.id.startsWith("sponsor-"));
        tl.to(empNodes, { opacity: 1, scale: 1, stagger: 0.06, duration: 0.4 }, `scene${i}`);
      }
      // Escena 3 (index 2): líneas entre emprendimientos se dibujan
      if (i === 2 && red) {
        const secundarias = Array.from(red.svg.children).filter((l) => {
          const from = l.getAttribute("data-from"), to = l.getAttribute("data-to");
          return from !== "core" && to !== "core";
        });
        tl.to(secundarias, { opacity: 1, stagger: 0.05, duration: 0.3 }, `scene${i}`);
      }
      // Escena 4 (index 3): aparecen patrocinadores
      if (i === 3 && red) {
        const sponsorNodes = red.nodeEls.filter((el) => el.dataset.id.startsWith("sponsor-"));
        const sponsorLines = Array.from(red.svg.children).filter((l) => l.getAttribute("data-from") === "core" && l.getAttribute("data-to").startsWith("sponsor-"));
        tl.to(sponsorNodes, { opacity: 1, scale: 1, stagger: 0.06, duration: 0.4 }, `scene${i}`);
        tl.to(sponsorLines, { opacity: 1, stagger: 0.04, duration: 0.3 }, `scene${i}<`);
      }
      // Escena 5 (index 4): núcleo MULTIEXITOSAS aparece y todo converge
      if (i === 4 && red) {
        const coreNode = red.nodeEls.find((el) => el.dataset.id === "core");
        const coreLines = Array.from(red.svg.children).filter((l) => l.getAttribute("data-from") === "core");
        gsap.set(coreNode, { opacity: 0, scale: 0 });
        tl.to(coreNode, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, `scene${i}`);
        tl.to(coreLines, { opacity: 1, stagger: 0.02, duration: 0.4 }, `scene${i}<`);
      }
    }
  }

  /* ---------------------------------------------------------
     6. Sección Descubre progresiva (1 → 3 → 6)
     --------------------------------------------------------- */
  function revelarDestacadosProgresivo() {
    const grid = document.getElementById("gridDestacados");
    if (!grid) return;

    // Amplía el set a 6 reutilizando cardEmpHTML() ya existente en app.js
    const yaIds = new Set(EMPRENDIMIENTOS.filter((e) => e.destacado).map((e) => e.id));
    const extra = EMPRENDIMIENTOS.filter((e) => !yaIds.has(e.id)).slice(0, 2);
    if (extra.length && typeof cardEmpHTML === "function") {
      grid.insertAdjacentHTML("beforeend", extra.map(cardEmpHTML).join(""));
      if (typeof observeCards === "function") observeCards(grid);
    }

    const cards = Array.from(grid.querySelectorAll(".card-emp"));
    if (!cards.length) return;
    const { liviano, reduced } = condiciones();

    if (reduced) {
      // Sin animación de entrada: las tarjetas deben verse siempre.
      cards.forEach((c) => c.classList.add("in-view"));
      gsap.set(cards, { clearProps: "all" });
      return;
    }

    gsap.set(cards, { opacity: 0, y: liviano ? 12 : 28, scale: liviano ? 1 : 0.94 });
    cards.forEach((c) => c.classList.remove("in-view")); // evita doble animación con el IO de app.js

    const oleadas = [cards.slice(0, 1), cards.slice(1, 3), cards.slice(3, 6)];
    const tl = gsap.timeline({
      scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: "play none none none" }
    });
    oleadas.forEach((grupo, i) => {
      if (!grupo.length) return;
      tl.to(grupo, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: "power2.out" }, i === 0 ? 0 : "+=0.15");
    });
  }

  /* ---------------------------------------------------------
     6·9. Filtros de necesidad sin resultados
     Al publicarse solo los emprendimientos con fotografía, algunos
     tipos de búsqueda se quedan sin oportunidades. Se ocultan sus
     chips para que ningún filtro lleve a una lista vacía.
     --------------------------------------------------------- */
  function ocultarChipsSinResultados() {
    const fila = document.getElementById("needFilterRow");
    if (!fila || typeof OPORTUNIDADES === "undefined") return;
    const conDatos = new Set(OPORTUNIDADES.map((o) => o.tipo));
    fila.querySelectorAll(".chip[data-need]").forEach((chip) => {
      const tipo = chip.dataset.need;
      if (tipo !== "todos" && !conDatos.has(tipo)) chip.hidden = true;
    });
  }

  /* ---------------------------------------------------------
     7. Momento Conecta destacado (BioPack ↔ Café Origen)
     --------------------------------------------------------- */
  function initConnectMoment() {
    const target = document.getElementById("needFilterRow");
    if (!target) return;
    const cafe = EMPRENDIMIENTOS.find((e) => e.id === "cafe-origen");
    const bio = EMPRENDIMIENTOS.find((e) => e.id === "biopack");
    if (!cafe || !bio) return;

    const html = `
      <div class="cine-connect-moment" id="cineConnectMoment">
        <div class="cine-connect-head">
          <span class="eyebrow" style="justify-content:center;">Una historia real del ecosistema</span>
          <h3>Una conexión puede cambiarlo todo.</h3>
        </div>
        <div class="cine-connect-stage">
          <div class="cine-connect-node">
            <div class="logo-circle">${cafe.logo}</div>
            <strong>${cafe.nombre}</strong>
            <span>${cafe.tagline}</span>
          </div>
          <div class="cine-connect-line-wrap">
            <svg viewBox="0 0 200 40" preserveAspectRatio="none">
              <path id="cineConnectPath" class="cine-connect-path" d="M0,20 C60,0 140,40 200,20"></path>
              <circle class="cine-connect-pulse" r="4"></circle>
            </svg>
          </div>
          <div class="cine-connect-node">
            <div class="logo-circle">${bio.logo}</div>
            <strong>${bio.nombre}</strong>
            <span>${bio.tagline}</span>
          </div>
        </div>
        <p class="cine-connect-need"><strong>${cafe.nombre}</strong> busca empaques sostenibles para exportar su café con trazabilidad ambiental. <strong>${bio.nombre}</strong> produce exactamente esa solución y busca nuevos clientes.</p>
        <div class="cine-connect-cta">
          <button class="btn btn-primary" onclick="abrirChat('cafe-origen')">Conectar emprendimientos</button>
        </div>
      </div>`;
    target.insertAdjacentHTML("beforebegin", html);

    const el = document.getElementById("cineConnectMoment");
    const nodes = el.querySelectorAll(".cine-connect-node");
    const path = el.querySelector(".cine-connect-path");

    if (condiciones().reduced) {
      if (path) path.style.strokeDashoffset = "0";
      return;
    }

    gsap.set(nodes[0], { x: -30, opacity: 0 });
    gsap.set(nodes[1], { x: 30, opacity: 0 });

    gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none reverse" } })
      .to(nodes[0], { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
      .to(nodes[1], { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
      .to(path, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, 0.15)
      .from(el.querySelector(".cine-connect-need"), { opacity: 0, y: 10, duration: 0.4 }, 0.5)
      .from(el.querySelector(".cine-connect-cta"), { opacity: 0, y: 10, duration: 0.4 }, 0.6)
      .add(() => iniciarPulsoConexion(el), 0.85);
  }

  // Punto de luz que recorre la conexión: hace visible que el vínculo está activo.
  function iniciarPulsoConexion(contenedor) {
    if (condiciones().reduced) return;
    const path = contenedor.querySelector(".cine-connect-path");
    const pulse = contenedor.querySelector(".cine-connect-pulse");
    if (!path || !pulse || pulse.dataset.running === "1") return;
    pulse.dataset.running = "1";

    const largo = path.getTotalLength();
    gsap.to({ t: 0 }, {
      t: 1, duration: 2.6, ease: "power1.inOut", repeat: -1, repeatDelay: 1.1,
      onUpdate: function () {
        const t = this.targets()[0].t;
        const pt = path.getPointAtLength(t * largo);
        pulse.setAttribute("cx", pt.x);
        pulse.setAttribute("cy", pt.y);
        // Se desvanece en los extremos para que nazca y muera en los nodos.
        pulse.style.opacity = Math.sin(t * Math.PI) * 0.95;
      }
    });
  }

  /* ---------------------------------------------------------
     8. Patrocinadores: flotar y converger
     --------------------------------------------------------- */
  function initSponsorsFloat() {
    const grid = document.getElementById("sponsorGrid");
    if (!grid) return;
    const cards = grid.querySelectorAll(".sponsor-card");
    if (!cards.length) return;
    const { liviano } = condiciones();
    if (liviano) return;

    cards.forEach((c, i) => {
      const dx = (i % 2 === 0 ? -1 : 1) * (30 + (i * 7) % 40);
      const dy = (i % 3 === 0 ? -1 : 1) * (24 + (i * 5) % 30);
      gsap.set(c, { x: dx, y: dy, opacity: 0 });
    });
    gsap.to(cards, {
      x: 0, y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: grid, start: "top 78%", toggleActions: "play none none reverse" }
    });
  }

  /* ---------------------------------------------------------
     9. Reveal de la fundadora
     --------------------------------------------------------- */
  function initFundadoraReveal() {
    const photo = document.querySelector(".about-photo");
    if (!photo) return;
    const { liviano } = condiciones();

    if (liviano) {
      gsap.from(photo, { opacity: 0, duration: 0.6, scrollTrigger: { trigger: photo, start: "top 85%" } });
      return;
    }

    gsap.fromTo(photo,
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out",
        scrollTrigger: { trigger: photo, start: "top 88%", end: "top 40%", scrub: 1.4 }
      }
    );

    // Parallax interno: la imagen deriva dentro del marco, dando profundidad
    // sin que el bloque entero se desplace.
    const img = photo.querySelector("img");
    if (img) {
      gsap.fromTo(img,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6, scale: 1.12, ease: "none",
          scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: 1.2 }
        }
      );
    }

    const quote = document.querySelector(".about-quote-float");
    if (quote) {
      gsap.from(quote, {
        opacity: 0, y: 26, scale: 0.96, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: quote, start: "top 92%", toggleActions: "play none none reverse" }
      });
    }

    // El texto entra pausado, en bloques: ritmo humano, no técnico.
    const texto = document.querySelector(".about-text");
    if (texto) {
      const bloques = gsap.utils.toArray(texto.querySelectorAll(".eyebrow, h2, .about-role, p, .about-pillars"));
      gsap.from(bloques, {
        opacity: 0, y: 24, filter: "blur(4px)",
        duration: 1, ease: "power2.out", stagger: 0.13,
        scrollTrigger: { trigger: texto, start: "top 78%", toggleActions: "play none none none" }
      });
    }
  }

  /* ---------------------------------------------------------
     10. Sección Propósito
     --------------------------------------------------------- */
  function initProposito() {
    const section = document.getElementById("proposito");
    if (!section) return;
    const words = section.querySelectorAll(".cine-word");
    const { liviano } = condiciones();

    if (liviano) {
      words.forEach((w) => { w.style.opacity = 1; });
      return;
    }

    gsap.set(words[0], { opacity: 1 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: "top top", end: "bottom bottom",
        scrub: 1, pin: ".cine-purpose-viewport"
      }
    });
    for (let i = 1; i < words.length; i++) {
      tl.to(words[i - 1], { opacity: 0, scale: 0.92, duration: 0.5 }, `w${i}`);
      tl.to(words[i], { opacity: 1, scale: 1, duration: 0.5 }, `w${i}<`);
    }
  }

  /* ---------------------------------------------------------
     11. Final cinematográfico
     --------------------------------------------------------- */
  function initFinale() {
    const container = document.querySelector("#cine-final .cine-finale-nodes");
    if (!container) return;

    const G = typeof LOGOS_GENERICOS !== "undefined" ? LOGOS_GENERICOS : {};
    const actores = [
      { logo: G.emprendedores || "", nombre: "Emprendedores" },
      { logo: G.empresas || "", nombre: "Empresas" },
      { logo: G.comunidades || "", nombre: "Comunidades" },
      { logo: G.patrocinadores || "", nombre: "Patrocinadores" },
      { logo: G.instituciones || "", nombre: "Instituciones" },
      { logo: G.aliados || "", nombre: "Aliados" }
    ];
    // Arco simétrico sobre el título: enmarca el texto en vez de invadirlo.
    actores.forEach((a, i) => {
      const t = actores.length === 1 ? 0.5 : i / (actores.length - 1);
      const angulo = Math.PI * (0.08 + t * 0.84); // de izquierda a derecha, por arriba
      const el = document.createElement("div");
      el.className = "cine-node";
      el.style.left = (50 - Math.cos(angulo) * 42) + "%";
      el.style.top = (78 - Math.sin(angulo) * 58) + "%";
      el.innerHTML = `<span class="cine-node-dot">${a.logo}</span><span class="cine-node-label">${a.nombre}</span>`;
      container.appendChild(el);
    });

    const nodeEls = container.querySelectorAll(".cine-node");
    const { liviano } = condiciones();
    if (liviano) { gsap.set(nodeEls, { opacity: 1, scale: 1 }); return; }

    gsap.set(nodeEls, { opacity: 0, scale: 0.5 });
    gsap.timeline({ scrollTrigger: { trigger: "#cine-final", start: "top 70%", toggleActions: "play none none reverse" } })
      .to(nodeEls, { opacity: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.6)" });
  }

  /* ---------------------------------------------------------
     12. Navbar transparente sobre el hero
     --------------------------------------------------------- */
  function initNavbarOnHero() {
    const nav = document.getElementById("navbar");
    const hero = document.getElementById("inicio");
    if (!nav || !hero) return;

    // Estado directo por scroll: fiable también en la carga inicial (top de página).
    const update = () => {
      const limite = hero.offsetHeight - nav.offsetHeight - 40;
      nav.classList.toggle("on-hero", window.scrollY < limite);
      nav.classList.toggle("is-compact", window.scrollY > limite + 200);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------------------------------------------------------
     13. Hook: modal de perfil más inmersivo
     --------------------------------------------------------- */
  function initProfileModalAnim() {
    document.addEventListener("profile:opened", () => {
      const box = document.getElementById("profileModalBox");
      if (!box) return;
      const cover = box.querySelector(".profile-cover");
      const sections = box.querySelectorAll(".profile-section, .profile-head");
      if (cover) gsap.fromTo(cover, { scale: 1.15, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" });
      if (sections.length) gsap.fromTo(sections, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.1, ease: "power2.out" });
    });
  }

  /* ---------------------------------------------------------
     Bootstrap
     --------------------------------------------------------- */
  function boot() {
    initHeroCanvas();
    initHeroEntrance();
    initHeroVideoParallax();
    initVideoPerformance();
    initCustomCursor();
    initNavbarOnHero();
    initEscenasNarrativas();
    initProposito();
    revelarDestacadosProgresivo();
    aplicarLogosSVG();
    aplicarAcentosDeMarca();
    unificarIconos();

    // El contenido dinámico (modales, resultados de filtro) nace con emoji:
    // se convierte en cuanto aparece.
    ["profileModalBox", "chatModalBox", "wizardModalBox", "inboxGrid",
     "gridExplorar", "gridEventos", "sponsorGrid", "oppGrid",
     "gridDestacados", "catGrid", "mobilePanel", "cine-final"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      new MutationObserver(() => unificarIconos(el)).observe(el, { childList: true, subtree: true });
    });
    document.addEventListener("profile:opened", () => unificarIconos(document.getElementById("profileModalBox")));

    // El momento Conecta y las oportunidades se construyen después de la
    // primera pasada: hay que repintar sus marcas.
    requestAnimationFrame(() => {
      if (Cine.repintarMarcas) Cine.repintarMarcas();
      unificarIconos();
    });
    initEncabezados();
    initEntradasDeRejillas();
    initFiltroReanimado();
    ocultarChipsSinResultados();
    initConnectMoment();
    initSponsorsFloat();
    initFundadoraReveal();
    initFinale();
    initProfileModalAnim();
    inicializarTransicionesSeccion();

    ScrollTrigger.refresh();
  }

  if (document.readyState !== "loading") {
    // app.js ya pudo haber disparado app:ready antes de que este script corriera
  }
  document.addEventListener("app:ready", boot, { once: true });

  window.Cine = Cine;
})();
