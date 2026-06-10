// Logica del panel de administracion

document.addEventListener('DOMContentLoaded', function() {

  // Si no esta logueado, redirige al login
  if (!estaLogueado()) {
    window.location.href = 'login.html';
    return;
    
  }

  document.getElementById('btn-logout').addEventListener('click', function(e) {
    e.preventDefault();
    cerrarSesion();
    window.location.href = 'index.html';
  });

  mostrarNoticias();

});


// Muestra la lista de noticias existentes
function mostrarNoticias() {
  var contenedor = document.getElementById('admin-noticias');
  var noticias = obtenerNoticias();

  if (noticias.length === 0) {
    contenedor.innerHTML = '<p>No hay noticias. Agregá una.</p>';
    return;
  }


  var html = '';
  for (var i = 0; i < noticias.length; i++) {
    var n = noticias[i];
    html += '<div class="item-noticia" id="item-' + n.id + '">';
    html += '<img src="' + n.imagen + '" alt="' + n.titulo + '" onerror="this.src=\'https://placehold.co/70x50?text=?\'">';
    html += '<div class="info">';
    html += '<h4>' + n.titulo + '</h4>';
    html += '<p>' + n.descripcion + '</p>';
    html += '</div>';
    html += '</div>';
  }
  contenedor.innerHTML = html;
}