
export class MovTheater {

  constructor(name, id, rows, seats) {
    this.name = name;
    this.id = id;
    this.rows = rows;
    this.seats = seats;
    this.seatsTemplate = this.genRows();
  }
  
  genRows() {
        
    let template = `<div class="filasButacas">`;
    for (let i = 0; i < this.rows; i++) {
      template += `
      <div class="fila" id="${i+1}">
        ${this.genSeats()}
      </div>
      `;
    }
    return template + `</div>`;
  }
  
  genSeats() {
    
    let seats = ``;
    for (let s = 0; s < this.seats; s++) {
      seats += `<div class="butacaSala id="${s+1}"></div>`;
    }
    return seats;
  }
}