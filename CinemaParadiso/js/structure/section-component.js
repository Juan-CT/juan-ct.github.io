
export function cinemaTemplate(seatTemplate) {
  return `
  <section class="contenedor">
    <div class="pantalla"></div>
    ${seatTemplate}
    <p>
      Has seleccionado <span id="count">0</span> butacas 
      con un precio total de <span id="total">0</span> €
    </p>
    <button id="buy">Comprar</button>
  </section>

  `;
}



