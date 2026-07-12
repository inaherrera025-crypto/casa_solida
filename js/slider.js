/* =========================================================
   CASA SÓLIDA — slider.js
   Carga el carrusel de testimonios desde data/testimonios.json
   ========================================================= */

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('carrusel-testimonios');
  if (!contenedor) return;

  try {
    const res = await fetch('data/testimonios.json');
    const testimonios = await res.json();

    const indicadores = document.getElementById('testimonios-indicadores');

    contenedor.innerHTML = testimonios.map((t, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <div class="testimonio-card">
          <img src="${t.foto}" alt="Foto de ${t.nombre}">
          <div class="estrellas">${'★'.repeat(t.calificacion)}${'☆'.repeat(5 - t.calificacion)}</div>
          <p class="fst-italic">"${t.comentario}"</p>
          <h6 class="mb-0 font-display">${t.nombre}</h6>
          <small class="text-muted">${t.ciudad}</small>
        </div>
      </div>
    `).join('');

    if (indicadores) {
      indicadores.innerHTML = testimonios.map((_, i) => `
        <button type="button" data-bs-target="#carouselTestimonios" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" aria-current="${i === 0}" aria-label="Testimonio ${i + 1}"></button>
      `).join('');
    }
  } catch (err) {
    contenedor.innerHTML = '<p class="text-center text-white">No se pudieron cargar los testimonios.</p>';
    console.error('Error cargando testimonios:', err);
  }
});
