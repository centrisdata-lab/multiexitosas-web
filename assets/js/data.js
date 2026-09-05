/* =========================================================
   MULTIEXITOSAS — Datos DEMO
   Todo el contenido de este archivo es FICTICIO y sirve
   únicamente para demostrar el funcionamiento de la
   plataforma. Ningún emprendimiento, patrocinador, evento
   o cifra representa entidades reales.
   ========================================================= */

/* Solo se publican los emprendimientos que ya tienen fotografía de producto.
   Los demás quedan definidos abajo pero ocultos: para publicar uno, basta con
   agregar assets/img/emp/<id>.jpg y sumar su id a esta lista. */
const EMP_PUBLICADOS = [
  "raices-vivas", "ecociclo", "verde-hogar",
  "mujeres-que-crean", "biopack", "cafe-origen"
];

const EMPRENDIMIENTOS_TODOS = [
  {
    id: "raices-vivas",
    nombre: "Raíces Vivas",
    tagline: "Cosmética natural y sostenible",
    logo: "🌿",
    color: "#2F6B4F",
    categoria: "Cosmética natural",
    ubicacion: "Medellín, Antioquia",
    tipo: "Productos",
    esVerde: true,
    esNuevo: false,
    destacado: true,
    etiquetas: ["Cosmética natural", "Ingredientes locales", "Cruelty-free"],
    buscando: ["aliados", "clientes"],
    descripcionCorta: "Cosmética facial y corporal elaborada con plantas nativas e ingredientes de comercio justo.",
    historia: "Raíces Vivas nació en la cocina de Laura, quien empezó formulando cremas para su familia con plantas de su huerta. Hoy trabaja con más de 15 recolectoras rurales que le proveen materia prima bajo comercio justo.",
    productos: ["Crema facial de caléndula", "Jabones artesanales", "Aceites corporales", "Línea capilar sin sulfatos"],
    impacto: { social: "Compra directa a 15 familias recolectoras rurales.", ambiental: "Empaques 100% compostables.", economico: "Genera 6 empleos directos en zona rural." },
    contacto: { whatsapp: "573001112233", email: "hola@raicesvivas.demo", instagram: "@raicesvivas.demo", sitio: "raicesvivas.demo" },
    galeria: ["🌱", "🧴", "🌸"]
  },
  {
    id: "ecociclo",
    nombre: "EcoCiclo",
    tagline: "Soluciones de economía circular",
    logo: "♻️",
    color: "#1E6E63",
    categoria: "Economía circular",
    ubicacion: "Bello, Antioquia",
    tipo: "Servicios",
    esVerde: true,
    esNuevo: true,
    destacado: true,
    etiquetas: ["Reciclaje", "Logística inversa", "B2B"],
    buscando: ["aliados", "inversion"],
    descripcionCorta: "Recolección y transformación de residuos industriales en nuevas materias primas para empresas.",
    historia: "EcoCiclo conecta empresas que generan residuos aprovechables con transformadores locales, cerrando ciclos de materiales que antes terminaban en relleno sanitario.",
    productos: ["Recolección de residuos industriales", "Trazabilidad de materiales", "Asesoría en economía circular"],
    impacto: { social: "8 recicladores de oficio vinculados formalmente.", ambiental: "42 toneladas de residuos desviadas de relleno sanitario.", economico: "Reduce hasta 30% costos de disposición a sus clientes." },
    contacto: { whatsapp: "573002223344", email: "contacto@ecociclo.demo", instagram: "@ecociclo.demo", sitio: "ecociclo.demo" },
    galeria: ["♻️", "🏭", "📦"]
  },
  {
    id: "verde-hogar",
    nombre: "Verde Hogar",
    tagline: "Productos sostenibles para el hogar",
    logo: "🏡",
    color: "#3F7D3A",
    categoria: "Hogar sostenible",
    ubicacion: "Envigado, Antioquia",
    tipo: "Productos",
    esVerde: true,
    esNuevo: false,
    destacado: false,
    etiquetas: ["Limpieza biodegradable", "Cero plástico", "Recarga"],
    buscando: ["clientes", "proveedores"],
    descripcionCorta: "Línea de productos de aseo del hogar biodegradables, con sistema de recarga para reducir plástico.",
    historia: "Después de ver la cantidad de envases plásticos que desechaba su propia familia, Verde Hogar creó un sistema de recarga a domicilio para productos de limpieza.",
    productos: ["Detergentes biodegradables", "Desinfectantes naturales", "Sistema de recarga a domicilio"],
    impacto: { social: "Emplea a 4 madres cabeza de familia en logística.", ambiental: "Evita más de 3.000 envases plásticos al año.", economico: "Modelo de suscripción con precios 20% más bajos." },
    contacto: { whatsapp: "573003334455", email: "hola@verdehogar.demo", instagram: "@verdehogar.demo", sitio: "verdehogar.demo" },
    galeria: ["🧴", "🏡", "🌿"]
  },
  {
    id: "mujeres-que-crean",
    nombre: "Mujeres que Crean",
    tagline: "Artesanías de emprendedoras locales",
    logo: "🧶",
    color: "#7A3E65",
    categoria: "Artesanías",
    ubicacion: "Itagüí, Antioquia",
    tipo: "Productos",
    esVerde: false,
    esNuevo: false,
    destacado: true,
    etiquetas: ["Artesanal", "Comercio justo", "Hecho a mano"],
    buscando: ["clientes", "aliados"],
    descripcionCorta: "Cooperativa de artesanas que elabora tejidos, bisutería y decoración hecha 100% a mano.",
    historia: "Un grupo de 12 mujeres se unió para vender juntas lo que antes vendían por separado en la calle. Hoy tienen catálogo propio y participan en ferias regionales.",
    productos: ["Tejidos en telar", "Bisutería en semillas", "Decoración para el hogar"],
    impacto: { social: "Ingresos propios para 12 mujeres cabeza de familia.", ambiental: "Uso de fibras naturales y tintes vegetales.", economico: "Ventas colectivas 3x mayores que de forma individual." },
    contacto: { whatsapp: "573004445566", email: "contacto@mujeresquecrean.demo", instagram: "@mujeresquecrean.demo", sitio: "mujeresquecrean.demo" },
    galeria: ["🧶", "📿", "🪆"]
  },
  {
    id: "biopack",
    nombre: "BioPack",
    tagline: "Empaques biodegradables",
    logo: "📦",
    color: "#4C7A3F",
    categoria: "Empaques sostenibles",
    ubicacion: "Sabaneta, Antioquia",
    tipo: "Productos",
    esVerde: true,
    esNuevo: true,
    destacado: false,
    etiquetas: ["Empaques", "Fibra vegetal", "B2B"],
    buscando: ["clientes", "inversion"],
    descripcionCorta: "Empaques biodegradables a base de fibra de residuos agrícolas para reemplazar el icopor y plástico.",
    historia: "BioPack surgió de una tesis universitaria sobre residuos de la agroindustria del banano, convertidos hoy en una alternativa real al icopor.",
    productos: ["Bandejas biodegradables", "Empaques para alimentos", "Empaques personalizados por volumen"],
    impacto: { social: "Compra de residuos agrícolas a 5 fincas locales.", ambiental: "100% biodegradable en menos de 90 días.", economico: "Sustituye importación de empaques plásticos." },
    contacto: { whatsapp: "573005556677", email: "ventas@biopack.demo", instagram: "@biopack.demo", sitio: "biopack.demo" },
    galeria: ["📦", "🌾", "🥡"]
  },
  {
    id: "cafe-origen",
    nombre: "Café Origen",
    tagline: "Café producido responsablemente",
    logo: "☕",
    color: "#6B4226",
    categoria: "Alimentos y bebidas",
    ubicacion: "Andes, Antioquia",
    tipo: "Productos",
    esVerde: true,
    esNuevo: false,
    destacado: true,
    etiquetas: ["Café especial", "Comercio directo", "Trazable"],
    buscando: ["clientes", "aliados"],
    descripcionCorta: "Café especial de finca familiar, comercializado directamente sin intermediarios.",
    historia: "Tres generaciones de la misma familia han cultivado la misma tierra. Hoy exportan de forma directa y trazable, cuidando el bosque que rodea sus cultivos.",
    productos: ["Café en grano", "Café molido", "Experiencias de finca cafetera"],
    impacto: { social: "Comercio directo elimina intermediarios para el caficultor.", ambiental: "Cultivo bajo sombra que conserva bosque nativo.", economico: "Precio justo 40% mayor al de bolsa tradicional." },
    contacto: { whatsapp: "573006667788", email: "hola@cafeorigen.demo", instagram: "@cafeorigen.demo", sitio: "cafeorigen.demo" },
    galeria: ["☕", "🌄", "🫘"]
  },
  {
    id: "retela",
    nombre: "ReTela",
    tagline: "Moda a partir de materiales reutilizados",
    logo: "👕",
    color: "#B5541B",
    categoria: "Moda circular",
    ubicacion: "Medellín, Antioquia",
    tipo: "Productos",
    esVerde: true,
    esNuevo: true,
    destacado: false,
    etiquetas: ["Upcycling", "Moda circular", "Producción local"],
    buscando: ["proveedores", "colaboradores"],
    descripcionCorta: "Ropa y accesorios elaborados con retazos textiles rescatados de la industria de la confección.",
    historia: "ReTela recupera excedentes textiles de talleres de confección de Medellín y los transforma en prendas de edición limitada.",
    productos: ["Chaquetas patchwork", "Bolsos en denim reciclado", "Accesorios de temporada"],
    impacto: { social: "Trabajo para 3 costureras independientes.", ambiental: "Reutiliza más de 500 kg de textil al año.", economico: "Reduce costos de materia prima hasta en 50%." },
    contacto: { whatsapp: "573007778899", email: "hola@retela.demo", instagram: "@retela.demo", sitio: "retela.demo" },
    galeria: ["👕", "🧵", "👜"]
  },
  {
    id: "aula-verde",
    nombre: "Aula Verde",
    tagline: "Educación ambiental y experiencias pedagógicas",
    logo: "🌳",
    color: "#2E5D34",
    categoria: "Educación ambiental",
    ubicacion: "Rionegro, Antioquia",
    tipo: "Servicios",
    esVerde: true,
    esNuevo: false,
    destacado: false,
    etiquetas: ["Educación", "Talleres", "Infancia"],
    buscando: ["aliados", "colaboradores"],
    descripcionCorta: "Talleres y experiencias pedagógicas al aire libre para sensibilizar a niños y familias sobre el cuidado ambiental.",
    historia: "Un grupo de docentes creó Aula Verde para llevar la educación ambiental fuera del salón de clases, con huertas, senderos y actividades vivenciales.",
    productos: ["Talleres escolares", "Campamentos ambientales", "Formación a docentes"],
    impacto: { social: "Ha formado a más de 900 niños y niñas.", ambiental: "Mantiene 2 huertas comunitarias activas.", economico: "Genera empleo estacional a 5 educadores ambientales." },
    contacto: { whatsapp: "573008889900", email: "contacto@aulaverde.demo", instagram: "@aulaverde.demo", sitio: "aulaverde.demo" },
    galeria: ["🌳", "🧒", "🌻"]
  },
  {
    id: "semillas-del-oriente",
    nombre: "Semillas del Oriente",
    tagline: "Agricultura orgánica de pequeños productores",
    logo: "🌾",
    color: "#5B7B3A",
    categoria: "Agricultura orgánica",
    ubicacion: "La Ceja, Antioquia",
    tipo: "Productos",
    esVerde: true,
    esNuevo: true,
    destacado: false,
    etiquetas: ["Orgánico", "Agricultura familiar", "Mercado local"],
    buscando: ["clientes", "proveedores"],
    descripcionCorta: "Red de pequeños productores agrícolas que comercializan frutas y verduras orgánicas de forma asociativa.",
    historia: "Nueve familias campesinas se asociaron para vender juntas su producción orgánica y acceder a mejores canales de comercialización.",
    productos: ["Canastas orgánicas", "Frutas y verduras de temporada", "Venta a restaurantes"],
    impacto: { social: "Asociatividad entre 9 familias campesinas.", ambiental: "Cero uso de agroquímicos de síntesis.", economico: "Ingresos hasta 25% mayores frente a venta individual." },
    contacto: { whatsapp: "573009990011", email: "hola@semillasdeloriente.demo", instagram: "@semillasdeloriente.demo", sitio: "semillasdeloriente.demo" },
    galeria: ["🌾", "🥬", "🍅"]
  },
  {
    id: "robotica-para-todos",
    nombre: "Robótica para Todos",
    tagline: "Educación STEM y robótica educativa",
    logo: "🤖",
    color: "#3B5BA5",
    categoria: "Educación / Tecnología",
    ubicacion: "Medellín, Antioquia",
    tipo: "Servicios",
    esVerde: false,
    esNuevo: true,
    destacado: true,
    etiquetas: ["Robótica educativa", "Inteligencia artificial", "Infancia"],
    buscando: ["aliados", "inversion"],
    descripcionCorta: "Talleres de robótica e inteligencia artificial aplicada a la educación ambiental y social para niños y jóvenes.",
    historia: "Nace de la unión entre ingenieros y docentes que creen que la tecnología puede formar generaciones más conscientes del cuidado del planeta.",
    productos: ["Talleres de robótica escolar", "Kits educativos", "Formación docente en IA"],
    impacto: { social: "Ha llegado a 6 instituciones educativas públicas.", ambiental: "Contenidos enfocados en cuidado ambiental.", economico: "Alianzas con empresas para becas de formación." },
    contacto: { whatsapp: "573001231234", email: "hola@roboticaparatodos.demo", instagram: "@roboticaparatodos.demo", sitio: "roboticaparatodos.demo" },
    galeria: ["🤖", "🧠", "🔧"]
  },
  {
    id: "manos-del-mar",
    nombre: "Manos del Mar",
    tagline: "Pesca artesanal responsable",
    logo: "🐟",
    color: "#1F6F8B",
    categoria: "Alimentos y bebidas",
    ubicacion: "Turbo, Antioquia",
    tipo: "Productos",
    esVerde: true,
    esNuevo: false,
    destacado: false,
    etiquetas: ["Pesca artesanal", "Comercio justo", "Trazable"],
    buscando: ["clientes", "aliados"],
    descripcionCorta: "Comercialización directa de pesca artesanal responsable proveniente de comunidades del golfo de Urabá.",
    historia: "Manos del Mar conecta a pescadores artesanales con restaurantes y hogares, garantizando precio justo y prácticas de pesca sostenible.",
    productos: ["Pescado fresco", "Productos ahumados", "Venta a restaurantes"],
    impacto: { social: "Trabaja con 20 familias pescadoras.", ambiental: "Promueve tallas mínimas y vedas responsables.", economico: "Elimina intermediarios en la cadena de comercialización." },
    contacto: { whatsapp: "573002345678", email: "contacto@manosdelmar.demo", instagram: "@manosdelmar.demo", sitio: "manosdelmar.demo" },
    galeria: ["🐟", "🎣", "🌊"]
  },
  {
    id: "taller-recicla",
    nombre: "Taller ReCicla",
    tagline: "Muebles y objetos con madera recuperada",
    logo: "🪑",
    color: "#8A5A2B",
    categoria: "Economía circular",
    ubicacion: "Copacabana, Antioquia",
    tipo: "Productos",
    esVerde: true,
    esNuevo: false,
    destacado: false,
    etiquetas: ["Madera recuperada", "Diseño", "Upcycling"],
    buscando: ["clientes", "proveedores"],
    descripcionCorta: "Diseño y fabricación de muebles a partir de madera y pallets recuperados de la industria.",
    historia: "Lo que empezó como un taller de garaje hoy provee mobiliario a cafés y oficinas que buscan un toque sostenible y de diseño.",
    productos: ["Mesas y sillas a medida", "Mobiliario para negocios", "Restauración de muebles"],
    impacto: { social: "Emplea a 3 carpinteros de oficio.", ambiental: "Recupera más de 2 toneladas de madera al año.", economico: "Precios competitivos frente a mobiliario nuevo." },
    contacto: { whatsapp: "573003456789", email: "hola@tallerrecicla.demo", instagram: "@tallerrecicla.demo", sitio: "tallerrecicla.demo" },
    galeria: ["🪑", "🪵", "🛠️"]
  }
];

const EMPRENDIMIENTOS = EMPRENDIMIENTOS_TODOS.filter(e => EMP_PUBLICADOS.includes(e.id));

const CATEGORIAS = [...new Set(EMPRENDIMIENTOS.map(e => e.categoria))].sort();
const UBICACIONES = [...new Set(EMPRENDIMIENTOS.map(e => e.ubicacion))].sort();

const OPORTUNIDADES_TODAS = [
  { id: 1, empId: "ecociclo", texto: "EcoCiclo busca aliados comerciales para ampliar su red de distribución de materiales recuperados.", tipo: "aliados" },
  { id: 2, empId: "biopack", texto: "BioPack busca inversión para escalar su planta de producción de empaques biodegradables.", tipo: "inversion" },
  { id: 3, empId: "raices-vivas", texto: "Raíces Vivas busca puntos de venta aliados en tiendas naturistas y spas.", tipo: "clientes" },
  { id: 4, empId: "retela", texto: "ReTela busca talleres de confección que quieran donar o vender excedentes textiles.", tipo: "proveedores" },
  { id: 5, empId: "robotica-para-todos", texto: "Robótica para Todos busca empresas aliadas para becar talleres en colegios públicos.", tipo: "aliados" },
  { id: 6, empId: "aula-verde", texto: "Aula Verde busca colaboradores para desarrollar nuevos contenidos pedagógicos ambientales.", tipo: "colaboradores" },
  { id: 7, empId: "cafe-origen", texto: "Café Origen busca aliados para exportar su primer contenedor de café especial.", tipo: "aliados" },
  { id: 8, empId: "semillas-del-oriente", texto: "Semillas del Oriente busca restaurantes clientes interesados en compra directa.", tipo: "clientes" }
];

/* Solo las oportunidades de emprendimientos publicados. */
const OPORTUNIDADES = OPORTUNIDADES_TODAS.filter(o => EMP_PUBLICADOS.includes(o.empId));

const PATROCINADORES = [
  { nombre: "Fundación Horizonte", tipo: "Aliado social", icono: "🌅", descripcion: "Apoya programas de fortalecimiento a emprendimientos liderados por mujeres." },
  { nombre: "EcoFuture", tipo: "Patrocinador ambiental", icono: "🌎", descripcion: "Financia proyectos piloto de economía circular y negocios verdes." },
  { nombre: "Impacto Colombia", tipo: "Aliado estratégico", icono: "🤝", descripcion: "Conecta emprendimientos con redes de cooperación nacional e internacional." },
  { nombre: "Innovar+", tipo: "Patrocinador de innovación", icono: "💡", descripcion: "Impulsa procesos de innovación y tecnología aplicada al desarrollo sostenible." },
  { nombre: "Fundación Semilla", tipo: "Aliado comunitario", icono: "🌱", descripcion: "Acompaña procesos de formación y fortalecimiento comunitario." },
  { nombre: "Grupo Verde", tipo: "Patrocinador corporativo", icono: "🏢", descripcion: "Empresa aliada en programas de Responsabilidad Social Empresarial." }
];

const EVENTOS = [
  {
    id: "seminario-negocios-verdes",
    titulo: "Seminario de Negocios Verdes y Economía Circular",
    fecha: "2026-10-14",
    lugar: "Medellín, Antioquia",
    asistentes: 180,
    imagen: "🌿",
    descripcion: "Un espacio de formación e inspiración para emprendedores interesados en modelos de negocio sostenibles."
  },
  {
    id: "taller-gerencia-proyectos",
    titulo: "Taller de Gerencia de Proyectos para Emprendedores",
    fecha: "2026-10-28",
    lugar: "Envigado, Antioquia",
    asistentes: 95,
    imagen: "📊",
    descripcion: "Herramientas prácticas para diagnosticar, planear y ejecutar proyectos con impacto medible."
  },
  {
    id: "feria-emprendimientos",
    titulo: "Feria de Emprendimientos con Propósito",
    fecha: "2026-11-15",
    lugar: "Rionegro, Antioquia",
    asistentes: 320,
    imagen: "🎪",
    descripcion: "Espacio de exhibición y networking para emprendimientos del ecosistema MULTIEXITOSAS."
  },
  {
    id: "encuentro-inversionistas",
    titulo: "Encuentro con Inversionistas y Cooperación Internacional",
    fecha: "2026-12-03",
    lugar: "Medellín, Antioquia",
    asistentes: 60,
    imagen: "🌐",
    descripcion: "Rueda de negocios entre emprendimientos verdes y aliados de cooperación e inversión."
  }
];

const CONVERSACIONES_DEMO = [
  {
    id: "conv-1",
    participante: "EcoCiclo",
    logo: "♻️",
    mensajes: [
      { de: "EcoCiclo", texto: "Hola, vimos tu perfil y nos interesa mucho explorar una alianza logística.", hora: "09:12" },
      { de: "yo", texto: "¡Hola! Claro que sí, cuéntanos más sobre lo que tienen en mente.", hora: "09:20" },
      { de: "EcoCiclo", texto: "Buscamos aliados para ampliar nuestra red de distribución de materiales recuperados en el oriente antioqueño.", hora: "09:22" }
    ]
  },
  {
    id: "conv-2",
    participante: "Raíces Vivas",
    logo: "🌿",
    mensajes: [
      { de: "Raíces Vivas", texto: "Hola, soy Laura de Raíces Vivas. Me encantó tu emprendimiento, ¿conversamos sobre una posible colaboración?", hora: "ayer" },
      { de: "yo", texto: "Hola Laura, con gusto. ¿Qué tipo de colaboración tenías en mente?", hora: "ayer" }
    ]
  },
  {
    id: "conv-3",
    participante: "Café Origen",
    logo: "☕",
    mensajes: [
      { de: "Café Origen", texto: "Buen día, queremos invitarte a conocer nuestra finca y explorar una alianza de distribución.", hora: "lunes" }
    ]
  }
];
