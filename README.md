# CASA SÓLIDA — Sitio web corporativo

Sitio web completo, responsive y editable para **Casa Sólida**, constructora de vivienda prefabricada y tradicional. Construido en **HTML5, CSS3, JavaScript vanilla y Bootstrap 5**.

> "Tu casa, firme como tu futuro."

## 🎨 Identidad visual

| Uso | Color | Variable CSS |
|---|---|---|
| Azul oscuro (principal) | `#0E2A47` | `--azul-oscuro` |
| Dorado (acento) | `#D8A53A` | `--dorado` |
| Crema (fondo de contenido) | `#F7F4EE` | `--crema` |
| Texto | `#17191C` | `--negro-texto` |

Todos los colores, tipografías y espaciados se controlan desde **una sola fuente de verdad**: las variables `:root` al inicio de `css/styles.css`. Cambiar un color ahí lo actualiza en todo el sitio.

Tipografías: **Fraunces** (títulos) + **Inter** (texto), cargadas desde Google Fonts.

## 📁 Estructura del proyecto

```
CASA-SOLIDA/
├── index.html            Página de inicio
├── nosotros.html         Historia, misión, visión, equipo
├── casas.html             Catálogo de casas con filtros
├── modelos.html           Modelos, comparador
├── servicios.html         Tarjetas de servicios
├── proyectos.html         Proyectos realizados
├── galeria.html            Galería de fotos/renders
├── financiamiento.html    Opciones de pago + calculadora
├── blog.html               Artículos del blog
├── contacto.html           Formulario, mapa, FAQ
├── privacidad.html         Política de privacidad (editable)
├── terminos.html           Términos y condiciones (editable)
│
├── css/
│   ├── styles.css          Sistema de diseño y componentes
│   └── responsive.css      Ajustes para tablet/móvil
│
├── js/
│   ├── main.js              Navbar, tema oscuro, idioma, botones flotantes
│   ├── slider.js            Carrusel de testimonios
│   ├── filtros.js           Filtro del catálogo de casas
│   └── cotizador.js         Calculadora de financiamiento
│
├── img/                    Imágenes (placeholders SVG editables)
├── admin/
│   └── index.html           Panel simple para editar los JSON
├── data/
│   ├── casas.json
│   ├── modelos.json
│   ├── servicios.json
│   ├── proyectos.json
│   ├── testimonios.json
│   └── blog.json
├── assets/                 Recursos adicionales
├── sitemap.xml
├── robots.txt
└── README.md
```

## ✏️ Cómo editar el contenido

**Textos e imágenes de cada página:** abre el archivo `.html` correspondiente y edita directamente el texto entre etiquetas, o reemplaza los archivos dentro de `/img` manteniendo el mismo nombre.

**Catálogo, servicios, proyectos, testimonios y blog:** no necesitas tocar código. Edita los archivos `.json` dentro de `/data` (puedes usar el panel en `/admin` para hacerlo con una interfaz simple) siguiendo la misma estructura de los ejemplos incluidos.

**Colores y tipografía globales:** modifica las variables `:root` en `css/styles.css`.

**Logo:** el logo actual es un SVG inline dentro del menú y el pie de página (`parts` del HTML). Reemplázalo por tu archivo de logo real en `/img` y actualiza la etiqueta `<svg>` por una `<img>` si lo prefieres.

## 🖼️ Imágenes

Las imágenes actuales en `/img` son **placeholders editables** (ilustraciones SVG simples) para que el sitio se vea completo desde el primer momento. Reemplázalos por fotografías reales de tus proyectos, manteniendo los mismos nombres de archivo o actualizando las referencias en los `.json` y `.html`.

## 🔐 Panel de administración

`/admin/index.html` es un panel **100% del lado del cliente** (sin backend) que permite editar el JSON de cada sección y descargar el archivo actualizado. Debes subir manualmente el archivo descargado a `/data` para publicar los cambios. Si en el futuro conectas un backend (Node, PHP, Firebase, etc.), este panel es el punto de partida para escribir directamente en una base de datos.

Nota: por seguridad, `/admin` está bloqueado para buscadores en `robots.txt`. Si se despliega en producción, protégelo además con autenticación (usuario/contraseña o login).

## 🚀 Publicar el sitio

Al ser un sitio 100% estático, puedes subir la carpeta completa a cualquier hosting: Netlify, Vercel, GitHub Pages, cPanel, etc. No requiere build ni instalación de dependencias.

Para probarlo localmente con recarga de `fetch()` de los JSON (necesario para que carguen los datos), sirve la carpeta con un servidor local, por ejemplo:

```bash
npx serve .
# o
python3 -m http.server 8080
```

## ⚙️ Funcionalidades incluidas

- Menú fijo con efecto al hacer scroll y estado activo por página
- Modo claro / oscuro (persistente con `localStorage`)
- Selector de idioma ES/EN (base lista para traducir)
- Catálogo de casas con filtros por precio, tamaño, habitaciones y tipo
- Comparador de modelos
- Favoritos guardados en el navegador
- Calculadora de cuotas de financiamiento
- Carrusel de testimonios, acordeón de preguntas frecuentes
- Galería con filtros y lightbox
- Formulario de contacto con validación y mapa embebido de Google Maps
- Botones flotantes de WhatsApp, llamada y volver arriba
- Compartir en redes sociales
- SEO: meta etiquetas, Open Graph, Schema.org, sitemap.xml, robots.txt
- Animaciones suaves con AOS y transiciones CSS, con soporte de `prefers-reduced-motion`

## 📌 Pendientes sugeridos para producción

- Reemplazar todos los placeholders de `/img` por fotografía real
- Conectar el formulario de contacto a un servicio real de envío (Formspree, backend propio, etc.)
- Conectar `/admin` a una base de datos si se requiere edición sin descarga manual de archivos
- Actualizar el iframe del mapa en `contacto.html` con la dirección real de la empresa
- Completar la traducción al inglés si se activa el selector de idioma
