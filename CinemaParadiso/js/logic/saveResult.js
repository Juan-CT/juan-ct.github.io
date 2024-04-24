import { saveData } from "./localeData.js";

/* 
This function creates a new row/seats template and records it in
the specified movTheater. After that, the new data is saved locally.
*/
export function saveResult(result, cinema, movTName) {
  let newSeatsTemplate = `
  <div class="filasButacas">` + result.innerHTML + `</div>`;
  
  cinema.arrMovT.forEach(movT =>
    movT.name === movTName ?
    movT.seatsTemplate = newSeatsTemplate : null);

  saveData('cinemaParadiso', cinema);
  
}