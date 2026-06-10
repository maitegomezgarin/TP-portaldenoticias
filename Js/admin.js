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
  const contenedor = document.getElementById('admin-noticias');
  const noticias = obtenerNoticias();

  if (noticias.length === 0) {
    contenedor.innerHTML = '<p>No hay noticias. Agregá una.</p>';
    return;
  }

  let html = '';
  for (let i = 0; i < noticias.length; i++) {
    const n = noticias[i];
    html += '<div class="item-noticia" id="item-' + n.id + '">';
    html += '<img src="' + n.imagen + '" alt="' + n.titulo + '" onerror="this.src=\'https://placehold.co/70x50?text=?\'">';
    html += '<div class="info">';
    html += '<h4>' + n.titulo + '</h4>';
    html += '<p>' + n.descripcion + '</p>';
    html += '</div>';
    html += '<div class="item-acciones">';
    html += '<button class="btn-azul btn-chico" onclick="iniciarEdicion(' + n.id + ')">Editar</button>';
    html += '</div>';
    html += '</div>';
  }
  contenedor.innerHTML = html;

}

// Guarda noticia nueva o actualiza una existente
function guardarNoticia() {
  const titulo = document.getElementById('input-titulo').value.trim();
  const descripcion = document.getElementById('input-descripcion').value.trim();
  const imagen = document.getElementById('input-imagen').value.trim();
  const editId = document.getElementById('edit-id').value;
  const msgError = document.getElementById('form-error');
  const msgExito = document.getElementById('form-exito');

  msgError.style.display = 'none';
  msgExito.style.display = 'none';

  if (!titulo || !descripcion || !imagen) {
    msgError.textContent = 'Todos los campos son obligatorios.';
    msgError.style.display = 'block';
    return;
  }

  if (editId) {
    modificarNoticia(Number(editId), titulo, descripcion, imagen);
    msgExito.textContent = 'Noticia actualizada correctamente.';
  } else {
    agregarNoticia(titulo, descripcion, imagen);
    msgExito.textContent = 'Noticia agregada.';
  }

  msgExito.style.display = 'block';
  limpiarFormulario();
  mostrarNoticias();

  setTimeout(function() {
    msgExito.style.display = 'none';
  }, 3000);

}


// Carga los datos de la noticia en el formulario para editarla
function iniciarEdicion(id) {
  const noticia = buscarNoticiaPorId(id);
  if (!noticia) return;

  document.getElementById('edit-id').value = noticia.id;
  document.getElementById('input-titulo').value = noticia.titulo;
  document.getElementById('input-descripcion').value = noticia.descripcion;
  document.getElementById('input-imagen').value = noticia.imagen;

  document.getElementById('form-titulo').textContent = 'Editar noticia';
  document.getElementById('btn-cancelar').style.display = 'inline-block';

  document.querySelector('.formulario-noticia').scrollIntoView({ behavior: 'smooth' });

}

function cancelarEdicion() {
  limpiarFormulario();
  document.getElementById('form-error').style.display = 'none';
  document.getElementById('form-exito').style.display = 'none';

}

function limpiarFormulario() {
  document.getElementById('edit-id').value = '';
  document.getElementById('input-titulo').value = '';
  document.getElementById('input-descripcion').value = '';
  document.getElementById('input-imagen').value = '';
  document.getElementById('form-titulo').textContent = 'Agregar noticia';
  document.getElementById('btn-cancelar').style.display = 'none';

}