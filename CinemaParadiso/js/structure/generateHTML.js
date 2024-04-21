import { seatList } from "./seatList-component.js";
import { selectMovie } from "./select-component.js";

export function generateHTML(cinema) {
  document.body.insertAdjacentHTML('beforeend',selectMovie(cinema));
  document.body.insertAdjacentHTML('beforeend', seatList());
}