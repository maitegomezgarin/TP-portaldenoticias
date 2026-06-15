// NOTICIAS POR DEFECTO
// Se guardan en localStorage la primera vez que se abre la web.

var NOTICIAS_DEFAULT = [
  {
    id: 1,
    titulo: "Koenigsegg pone en marcha el Ghost Squadron Tour",
    descripcion: "Más de veinte hypercars recorrerán rutas exclusivas de Europa y Medio Oriente. La iniciativa reúne algunos de los modelos más extremos de la marca sueca.",
    imagen: "https://koenigsegg-cdn-g7eehhd6f0ewcaff.z02.azurefd.net/drupal/styles/autox720/azure/2022-08/ac80a1f0b4c3bbf2_org.jpg?itok=qiyCZB2w"
  },
  {
    id: 2,
    titulo: "La Fashion Week se prepara para un reinicio histórico",
    descripcion: "La temporada SS26 reunirá debuts en varias de las principales casas de lujo. La industria espera una de las etapas más transformadoras de la última década.",
    imagen: "https://cdn.mos.cms.futurecdn.net/yQFbJ5fCFECwTEccKxt3KY.jpg"
  },
  {
    id: 3,
    titulo: "Gucci desembarca en la Fórmula 1",
    descripcion: "La casa italiana será title partner de Alpine desde 2027. El acuerdo marca un nuevo acercamiento entre el lujo y el deporte con mayor crecimiento global.",
    imagen: "https://www.ole.com.ar/images/2026/05/27/ROj0eNhPe_720x0__1.jpg"
  },
  {
    id: 4,
    titulo: "Chanel inaugura la era Matthieu Blazy",
    descripcion: "El nuevo director creativo presentó su primera colección para la maison francesa. Críticos y editores destacan una reinterpretación moderna del ADN de Chanel.",
    imagen: "https://cdn.mos.cms.futurecdn.net/MvGHPvoJpSHGCdXM3cxWAS.jpg"
  },
  {
    id: 5,
    titulo: "Coachella consolida su influencia cultural",
    descripcion: "El festival continúa marcando tendencias más allá de la música. Moda, marcas y celebridades convierten cada edición en un fenómeno global.",
    imagen: "https://esquirecolombia.com/wp-content/uploads/2026/04/PORTADA-ESQUIRE-2026-04-13T102623.974-860x484.png"
  },
  {
    id: 6,
    titulo: "Miami GP refuerza la unión entre lujo y automovilismo",
    descripcion: "La Fórmula 1 sigue expandiendo su dimensión lifestyle. Eventos exclusivos, moda y entretenimiento acompañan a uno de los fines de semana más importantes del calendario.",
    imagen: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Miami.webp"
  }
];



// NOTICIAS
// Devuelve el array de noticias desde localStorage.
// Si es la primera vez (localStorage vacio), guarda y devuelve las noticias por defecto.
function obtenerNoticias() {
  const guardadas = localStorage.getItem('noticias');
  if (guardadas !== null) {
    return JSON.parse(guardadas);
  }
  localStorage.setItem('noticias', JSON.stringify(NOTICIAS_DEFAULT));
  return NOTICIAS_DEFAULT;
}

// Guarda el array de noticias en localStorage
function guardarNoticias(noticias) {
  localStorage.setItem('noticias', JSON.stringify(noticias));
}

// Agrega una noticia nueva al principio del array
function agregarNoticia(titulo, descripcion, imagen) {
  const noticias = obtenerNoticias();
  const nueva = {
    id: Date.now(),
    titulo: titulo,
    descripcion: descripcion,
    imagen: imagen
  };
  noticias.unshift(nueva);
  guardarNoticias(noticias);
}

// Elimina la noticia con ese ID
function eliminarNoticia(id) {
  const noticias = obtenerNoticias();
  const actualizadas = noticias.filter(function(n) {
    return n.id !== id;
  });
  guardarNoticias(actualizadas);
}

// Reemplaza los datos de una noticia existente
function modificarNoticia(id, titulo, descripcion, imagen) {
  const noticias = obtenerNoticias();
  const index = noticias.findIndex(function(n) {
    return n.id === id;
  });
  if (index !== -1) {
    noticias[index] = { id: id, titulo: titulo, descripcion: descripcion, imagen: imagen };
    guardarNoticias(noticias);
  }
}

// Devuelve una noticia por su ID
function buscarNoticiaPorId(id) {
  const noticias = obtenerNoticias();
  return noticias.find(function(n) {
    return n.id === id;
  }) || null;
}
// Funciones de autenticación 
function estaLogueado() {

  if (!sessionStorage.getItem('sesionActiva')) {
    localStorage.removeItem('tokenAuth');
    return false;
  }
  return !!localStorage.getItem('tokenAuth');

}
function iniciarSesion(token) {
  localStorage.setItem('tokenAuth', token);
  sessionStorage.setItem('sesionActiva', '1');

}

function cerrarSesion() {
  localStorage.removeItem('tokenAuth');
  sessionStorage.removeItem('sesionActiva');
}

// DARK MODE
function obtenerModo() {
  return localStorage.getItem('darkMode') || 'light';
}

function guardarModo(modo) {
  localStorage.setItem('darkMode', modo);
}

function aplicarModo(modo) {
  if (modo === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}
// Alterna el modo y actualiza el boton
function toggleDarkMode() {
  var modoActual = obtenerModo();
  var nuevoModo = modoActual === 'dark' ? 'light' : 'dark';
  localStorage.setItem('darkMode', nuevoModo);
  aplicarModo(nuevoModo);
  actualizarBotonModo();
}

// Cambia el texto del boton segun el modo
function actualizarBotonModo() {
  var btn = document.getElementById('dark-mode-btn');
  var modo = obtenerModo();
  btn.textContent = modo === 'dark' ? 'Modo claro' : 'Modo oscuro';
}
