/* =========================================================
   CASA SÓLIDA — cotizador.js
   Calculadora simple de cuotas de financiamiento.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-calculadora');
  if (!form) return;

  const resultado = document.getElementById('resultado-cuota');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calcular();
  });
  form.addEventListener('input', calcular);
  calcular();

  function calcular() {
    const precio = Number(document.getElementById('calc-precio').value) || 0;
    const cuotaInicialPct = Number(document.getElementById('calc-inicial').value) || 0;
    const plazoAnios = Number(document.getElementById('calc-plazo').value) || 1;
    const tasaAnual = Number(document.getElementById('calc-tasa').value) || 0;

    const cuotaInicial = precio * (cuotaInicialPct / 100);
    const montoFinanciar = precio - cuotaInicial;
    const tasaMensual = (tasaAnual / 100) / 12;
    const numCuotas = plazoAnios * 12;

    let cuotaMensual;
    if (tasaMensual === 0) {
      cuotaMensual = montoFinanciar / numCuotas;
    } else {
      cuotaMensual = montoFinanciar * (tasaMensual * Math.pow(1 + tasaMensual, numCuotas)) / (Math.pow(1 + tasaMensual, numCuotas) - 1);
    }

    if (resultado) {
      document.getElementById('res-cuota-inicial').textContent = formatear(cuotaInicial);
      document.getElementById('res-monto-financiar').textContent = formatear(montoFinanciar);
      document.getElementById('res-cuota-mensual').textContent = formatear(cuotaMensual);
    }
  }

  function formatear(valor) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor || 0);
  }
});
