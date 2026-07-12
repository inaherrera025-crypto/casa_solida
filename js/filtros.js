/* =========================================================
   CASA SÓLIDA — filtros.js
   Carga el catálogo de casas y aplica filtros de
   precio, tamaño, habitaciones y tipo de vivienda.
   ========================================================= */

let todasLasCasas = [];

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('grid-casas');
  if (!grid) return;

  try {
    const res = await fetch('data/casas.json');
    todasLasCasas = await res.json();
    poblarFiltroTipo(todasLasCasas);
    renderCasas(todasLasCasas);
  } catch (err) {
    grid.innerHTML = '<p class="text-center">No se pudo cargar el catálogo. Verifica data/casas.json</p>';
    console.error(err);
  }

  const form = document.getElementById('form-filtros');
  if (form) {
    form.addEventListener('input', aplicarFiltros);
    form.addEventListener('submit', (e) => e.preventDefault());
    document.getElementById('btn-limpiar-filtros')?.addEventListener('click', () => {
      form.reset();
      renderCasas(todasLasCasas);
    });
  }

  const buscador = document.getElementById('buscador-modelos');
  if (buscador) buscador.addEventListener('input', aplicarFiltros);
});

function poblarFiltroTipo(casas) {
  const select = document.getElementById('filtro-tipo');
  if (!select) return;
  const tipos = [...new Set(casas.map(c => c.tipo))];
  tipos.forEach(tipo => {
    const opt = document.createElement('option');
    opt.value = tipo;
    opt.textContent = tipo;
    select.appendChild(opt);
  });
}

function aplicarFiltros() {
  const precioMax = Number(document.getElementById('filtro-precio')?.value || Infinity);
  const areaMin = Number(document.getElementById('filtro-area')?.value || 0);
  const habitaciones = document.getElementById('filtro-habitaciones')?.value;
  const tipo = document.getElementById('filtro-tipo')?.value;
  const texto = (document.getElementById('buscador-modelos')?.value || '').toLowerCase();

  const filtradas = todasLasCasas.filter(c => {
    if (c.precio > precioMax) return false;
    if (c.area < areaMin) return false;
    if (habitaciones && habitaciones !== 'todas' && Number(habitaciones) !== c.habitaciones) return false;
    if (tipo && tipo !== 'todas' && c.tipo !== tipo) return false;
    if (texto && !c.nombre.toLowerCase().includes(texto)) return false;
    return true;
  });

  renderCasas(filtradas);

  const label = document.getElementById('label-precio-max');
  if (label && document.getElementById('filtro-precio')) {
    label.textContent = formatearMoneda(document.getElementById('filtro-precio').value);
  }
}

function renderCasas(casas) {
  const grid = document.getElementById('grid-casas');
  if (!grid) return;

  if (casas.length === 0) {
    grid.innerHTML = '<div class="col-12 text-center py-5"><p class="fs-5">No encontramos casas con esos filtros. Intenta ampliar tu búsqueda.</p></div>';
    document.getElementById('contador-resultados').textContent = '0';
    return;
  }

  grid.innerHTML = casas.map(c => `
    <div class="col-md-6 col-lg-4" data-aos="fade-up">
      <div class="card-casa">
        <div class="img-wrap">
          <img src="${c.imagen}" alt="${c.nombre}" loading="lazy">
          <span class="codigo-badge">${c.codigo}</span>
          <span class="badge-favorito" data-codigo="${c.codigo}" title="Guardar en favoritos"><i class="bi bi-heart-fill"></i></span>
        </div>
        <div class="p-4">
          <h5 class="font-display mb-1">${c.nombre}</h5>
          <div class="specs mb-2">
            <span><i class="bi bi-arrows-fullscreen"></i> ${c.area} m²</span>
            <span><i class="bi bi-door-closed"></i> ${c.habitaciones} hab.</span>
            <span><i class="bi bi-droplet"></i> ${c.banos} baños</span>
          </div>
          <p class="small text-muted mb-3">${c.descripcion}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="precio">${formatearMoneda(c.precio)}</span>
            <a href="contacto.html?modelo=${encodeURIComponent(c.nombre)}" class="btn btn-azul btn-sm">Solicitar información</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const contador = document.getElementById('contador-resultados');
  if (contador) contador.textContent = casas.length;

  if (window.AOS) AOS.refreshHard();
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor);
}
