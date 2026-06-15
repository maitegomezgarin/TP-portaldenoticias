document.addEventListener('DOMContentLoaded', function () {
  aplicarModo(obtenerModo());
  actualizarBotonModo();
  // Si ya está logueado, redirigir al panel admin

  if (estaLogueado()) {

    window.location.href = 'admin.html';

    return;

  }

  // Evento del formulario
  document.getElementById('login-form').addEventListener('submit', manejarLogin);
 document.getElementById('dark-mode-btn').addEventListener('click', toggleDarkMode);
});

async function manejarLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();

  const password = document.getElementById('password').value;

  const btnEnviar = document.getElementById('btn-enviar');

  const msgError = document.getElementById('msg-error');

  const msgExito = document.getElementById('msg-exito');

  msgError.style.display = 'none';
  msgExito.style.display = 'none';

  btnEnviar.disabled = true;
  btnEnviar.textContent = 'Iniciando sesión...';

  try {

    const respuesta = await fetch('https://dummyjson.com/auth/login', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 60

      })

    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.message || 'Credenciales incorrectas');

    }
    iniciarSesion(datos.token);
    msgExito.textContent = `¡Bienvenido, ${datos.firstName || username}! Redirigiendo...`;
    msgExito.style.display = 'block';

    setTimeout(function () {
      window.location.href = 'admin.html';

    }, 1000);

  } catch (error) {

    console.error('Error en el login:', error);

    msgError.textContent = error.message === 'Failed to fetch'

      ? 'Error de conexión. Verificá tu acceso a internet.'
      : 'Usuario o contraseña incorrectos.';
    msgError.style.display = 'block';

    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Iniciar sesión';
  }
}
