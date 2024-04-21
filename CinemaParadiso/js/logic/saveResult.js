import { saveData } from "./localeData.js";

/* 
This function creates a new row/seats template and records it in
the specified movTheater
*/
export function saveResult(result, cinema, movTName) {
  let newSeatsTemplate = ``;
  
  result.forEach(div => {
    newSeatsTemplate += `<div class="fila">` + div.innerHTML + `</div>`;
  });

  cinema.arrMovT.forEach(movT =>
    movT.name === movTName ?
    movT.seatsTemplate = newSeatsTemplate : null);

  saveData('cinemaParadiso', cinema);
  
}