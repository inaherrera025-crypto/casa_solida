/* =========================================================
   CASA SÓLIDA — main.js
   Navbar al hacer scroll, modo oscuro/claro, idioma,
   botones flotantes, y utilidades generales del sitio.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Inicializar AOS (animaciones al hacer scroll) ---- */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---- Navbar: efecto al hacer scroll ---- */
  const navbar = document.querySelector('.navbar-cs');
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    const botonArriba = document.querySelector('.fab-arriba');
    if (botonArriba) {
      if (window.scrollY > 500) botonArriba.classList.add('visible');
      else botonArriba.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---- Resaltar enlace activo del menú ---- */
  const rutaActual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-cs .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === rutaActual) link.classList.add('active');
  });

  /* ---- Modo oscuro / claro ---- */
  const temaGuardado = localStorage.getItem('cs-tema');
  if (temaGuardado === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  document.querySelectorAll('[data-toggle-tema]').forEach(btn => {
    actualizarBotonTema(btn);
    btn.addEventListener('click', () => {
      const esOscuro = document.documentElement.getAttribute('data-theme') === 'dark';
      if (esOscuro) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('cs-tema', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('cs-tema', 'dark');
      }
      actualizarBotonTema(btn);
    });
  });
  function actualizarBotonTema(btn) {
    const esOscuro = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = esOscuro ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  }

  /* ---- Selector de idioma (ES / EN) simple, guarda preferencia ---- */
  const idiomaGuardado = localStorage.getItem('cs-idioma') || 'es';
  document.querySelectorAll('[data-idioma]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.idioma === idiomaGuardado);
    btn.addEventListener('click', () => {
      localStorage.setItem('cs-idioma', btn.dataset.idioma);
      document.querySelectorAll('[data-idioma]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      alert(btn.dataset.idioma === 'en'
        ? 'English version coming soon. All text can be translated by editing each .html file.'
        : 'La versión en inglés está en preparación. Puedes traducir todo el texto editando cada archivo .html.');
    });
  });

  /* ---- Botón "volver arriba" ---- */
  const botonArriba = document.querySelector('.fab-arriba');
  if (botonArriba) {
    botonArriba.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Favoritos (localStorage) ---- */
  document.querySelectorAll('.badge-favorito').forEach(btn => {
    const codigo = btn.dataset.codigo;
    const favoritos = JSON.parse(localStorage.getItem('cs-favoritos') || '[]');
    if (favoritos.includes(codigo)) btn.classList.add('activo');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let favs = JSON.parse(localStorage.getItem('cs-favoritos') || '[]');
      if (favs.includes(codigo)) {
        favs = favs.filter(c => c !== codigo);
        btn.classList.remove('activo');
      } else {
        favs.push(codigo);
        btn.classList.add('activo');
      }
      localStorage.setItem('cs-favoritos', JSON.stringify(favs));
    });
  });

  /* ---- Compartir en redes sociales (Web Share API con fallback) ---- */
  document.querySelectorAll('[data-compartir]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const datos = { title: document.title, url: window.location.href };
      if (navigator.share) {
        try { await navigator.share(datos); } catch (e) {}
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles.');
      }
    });
  });

  /* ---- Formulario de contacto (demo: valida y muestra confirmación) ---- */
  const formContacto = document.getElementById('form-contacto');
  if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!formContacto.checkValidity()) {
        formContacto.classList.add('was-validated');
        return;
      }
      document.getElementById('contacto-confirmacion').classList.remove('d-none');
      formContacto.reset();
      formContacto.classList.remove('was-validated');
    });
  }

  /* ---- Formulario de cotización rápida (hero / catálogo) ---- */
  document.querySelectorAll('.form-cotizacion').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias! Un asesor de Casa Sólida se pondrá en contacto contigo pronto.');
      form.reset();
    });
  });

});
