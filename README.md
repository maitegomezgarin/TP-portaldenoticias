# Portal de Noticias — TDI 1

Trabajo Práctico Final de Taller de Internet 1.
Portal de noticias desarrollado con HTML, CSS y JavaScript Vanilla.

---

## Cómo ejecutar el proyecto

### Opción 1: Abrir directo en el navegador
Abrir el archivo `index.html` en cualquier navegador moderno.

### Opción 2: Con servidor local (recomendado para evitar problemas de CORS)
```bash
# Si tenés Python instalado:
python3 -m http.server 8080
# Luego abrir: http://localhost:8080
```

---

## Credenciales de administrador

Las credenciales se validan contra la API de [DummyJSON](https://dummyjson.com/docs/auth).

| Campo    | Valor        |
|----------|-------------|
| Usuario  | `emilys`    |
| Contraseña | `emilyspass` |

> También funcionan otros usuarios de DummyJSON (ver docs).

---

## Estructura del proyecto

```
/
├── index.html        → Página pública (home)
├── login.html        → Formulario de login para admins
├── admin.html        → Panel de administración (protegido)
├── css/
│   └── styles.css    → Todos los estilos (incluye dark mode)
└── js/
    ├── storage.js    → Funciones compartidas: localStorage, auth, dark mode
    ├── main.js       → Lógica de la home: noticias, dólar, dark mode
    ├── login.js      → Lógica del formulario de login
    └── admin.js      → Lógica del panel: agregar, editar, eliminar noticias
```

---

## Funcionalidades implementadas

- Página home pública con listado de noticias
- Cotización del dólar blue en tiempo real (API Bluelytics)
- Dark mode persistido en localStorage
- Login con autenticación por API (DummyJSON)
- Sesión persistida en localStorage (se borra al cerrar el navegador)
- Panel de administración protegido
- CRUD completo de noticias (crear, leer, actualizar, eliminar)
- 6 noticias precargadas en localStorage al primer acceso
- Diseño responsive
- Manejo de errores de API

---

## APIs utilizadas

- **Autenticación**: `https://dummyjson.com/auth/login`
- **Cotización dólar**: `https://api.bluelytics.com.ar/v2/latest`