// main.js
// Logica de la pagina de inicio (index.html)

document.addEventListener('DOMContentLoaded', function() {
  
  // Mostrar link de login o admin segun estado de sesion
  mostrarLinkHeader();

  // Mostrar las noticias guardadas en localStorage
  mostrarNoticias();

  // Traer la cotizacion del dolar desde la API
  cargarDolar();

});


// Muestra Iniciar sesion o Panel Admin/ Cerrar sesion en el header
function mostrarLinkHeader() {
  var contenedor = document.getElementById('auth-links');

  if (estaLogueado()) {
    contenedor.innerHTML = '<a href="admin.html">Panel Admin</a> | <a href="#" id="btn-logout">Cerrar sesión</a>';
    document.getElementById('btn-logout').addEventListener('click', function(e) {
      e.preventDefault();
      cerrarSesion();
      window.location.reload();
    });
  } else {
    contenedor.innerHTML = '<a href="login.html">Iniciar sesión</a>';
  }
}

// Genera y muestra las tarjetas de noticias
function mostrarNoticias() {
  var contenedor = document.getElementById('noticias-container');
  var noticias = obtenerNoticias();

  if (noticias.length === 0) {
    contenedor.innerHTML = '<p>No hay noticias disponibles.</p>';
    return;
  }

  var html = '';
  for (var i = 0; i < noticias.length; i++) {
    var n = noticias[i];
    html += '<article class="noticia-card">';
    html += '<img src="' + n.imagen + '" alt="' + n.titulo + '" onerror="this.src=\'https://placehold.co/600x170?text=Sin+imagen\'">';
    html += '<div class="noticia-card-cuerpo">';
    html += '<h3>' + n.titulo + '</h3>';
    html += '<p>' + n.descripcion + '</p>';
    html += '</div>';
    html += '</article>';
  }
  contenedor.innerHTML = html;
}


// Llama a la API de Bluelytics y muestra la cotizacion del dolar blue
async function cargarDolar() {
  var elemento = document.getElementById('valor-dolar');

  try {
    var respuesta = await fetch('https://api.bluelytics.com.ar/v2/latest');

    if (!respuesta.ok) {
      throw new Error('Error en la API');
    }

    var datos = await respuesta.json();
    var compra = datos.blue.value_buy;
    var venta = datos.blue.value_sell;

    elemento.textContent = 'Compra $' + compra + ' / Venta $' + venta;

  } catch (error) {
    console.error('No se pudo cargar la cotizacion:', error);
    elemento.textContent = 'No disponible';
  }
}