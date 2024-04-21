import { cinemaTemplate } from "../structure/section-component.js";
import { saveResult } from "./saveResult.js";

export function eventInit(cinema) {

  const divSalas = document.querySelector('.salas');
  const inputFirst = divSalas.firstElementChild;
  inputFirst.checked = true;
  const movTheaterToShow = inputFirst.nextElementSibling.textContent;

  // Execute launcher
  launchInitialSeatsTemplate(cinema, movTheaterToShow);

}

// Function that calls initial seats template and events.
function launchInitialSeatsTemplate(cinema, movTName) {
  getInitialSeatsTemplate(cinema, movTName);
  inputsEvent(cinema);
  regenRadioSala(cinema);
  selectSeat();
  buySeats(cinema, movTName);
}

// Function that generates the initial template for seats
function getInitialSeatsTemplate(cinema, movTName) {
  cinema.arrMovT.forEach(sala =>
    sala.name === movTName ?
      document.body.insertAdjacentHTML(
        'beforeend', cinemaTemplate(sala.seatsTemplate)
      ) : null);
}

/* Function called when a new movie Theater is selected,
 that replaces the actual cinema template with the chosen one */
function regenSeatsTemplate(cinema, movTSelected) {
  document.querySelector('.contenedor').remove();

  cinema.arrMovT.forEach(movT =>
    movT.name === movTSelected ?
      document.body.insertAdjacentHTML(
        'beforeend', cinemaTemplate(movT.seatsTemplate)
      ) : null);

  const seats = document.querySelectorAll('.butacaSala');
  seats.forEach(seat => seat.classList.remove('seleccionada'));
  inputsEvent(cinema);
  selectSeat();
  buySeats(cinema, movTSelected);
}

// Event dedicated to regen the inputs when a new movie is selected
function regenRadioSala(cinema) {
  const selectMovies = document.getElementById('peli');

  selectMovies.addEventListener('change', function () {
    const salasAttr = selectMovies.options[selectMovies.selectedIndex].
      getAttribute('data-salas').split(',');

    const divSalas = document.querySelector('.salas');
    while (divSalas.hasChildNodes()) {
      divSalas.removeChild(divSalas.firstChild);
    }

    salasAttr.forEach(movT => {
      let input = document.createElement('input');
      input.setAttribute('type', 'radio');
      input.setAttribute('name', 'sala');
      let label = document.createElement('label');
      label.appendChild(document.createTextNode(`Sala ${movT}`));
      divSalas.appendChild(input);
      divSalas.insertAdjacentElement('beforeend', label);
    });

    const inputSala = divSalas.firstElementChild;
    inputSala.checked = true;

    const movTToShow = inputSala.nextElementSibling.textContent;
    regenSeatsTemplate(cinema, movTToShow);

  })
}

/* Event dedicated to listen the inputs and regen seats when a new 
Movie Theater is selected within the same movie.
*/
function inputsEvent(cinema) {
  const inputs = document.querySelectorAll('input[name="sala"]');
  inputs.forEach(input => {
    input.addEventListener('change', (evt) => {
      const selectedInput = evt.target;
      const movTToShow = selectedInput.nextElementSibling.textContent;
      regenSeatsTemplate(cinema, movTToShow);
    })
  })
}

// Event dedicated to highlight selected seats
function selectSeat() {
  const seats = document.querySelectorAll('.butacaSala');
  seats.forEach(seat => {
    seat.addEventListener('click', () => {
      if (!seat.classList.contains('ocupada')) {
        seat.classList.toggle('seleccionada');
        calcResult();
      }

    })
  })
}

// Event that calculates the price for the seats selected
function calcResult() {
  const seatsSelected = document.querySelectorAll('.seleccionada');
  const numSeats = document.querySelector('#count');
  const totalMoney = document.querySelector('#total');

  numSeats.innerHTML = seatsSelected.length - 1;

  const selectMovie = document.getElementById('peli');
  const priceMovie = selectMovie.options[selectMovie.selectedIndex].
    getAttribute('data-precio');

  totalMoney.innerHTML = priceMovie * (seatsSelected.length - 1);

}

// Event that converts seats to occupied when bought
function buySeats(cinema, movTSelected) {
  const buyButton = document.querySelector('#buy');
  
  buyButton.addEventListener('click', function () {
    const seatsSel = document.querySelectorAll('.butacaSala.seleccionada');
    seatsSel.forEach(seatTaken =>
      seatTaken.classList.replace('seleccionada', 'ocupada'));
    saveResult(document.querySelectorAll('.fila'), cinema, movTSelected);
  })
}

