
export function seatList() {
  return `
  <ul>
    <li>
      <div class="butaca"></div>
      <small>Libre</small>
    </li>
    <li>
      <div class="butaca seleccionada"></div>
      <small>Seleccionada</small>
    </li>
    <li>
      <div class="butaca ocupada"></div>
      <small>Ocupada</small>
    </li>
  </ul>
  <div class="salas">
    <input type="radio" name="sala"><label>Sala 1</label>
    <input type="radio" name="sala"><label>Sala 4</label>
  </div>
  `;
}