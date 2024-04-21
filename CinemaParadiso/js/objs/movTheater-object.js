
export class MovTheater {

  seatsTemplate = this.rows();
  

  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  rows() {
        
    let template = ``;
    for (let i = 0; i < 6; i++) {
      template += `
      <div class="fila">
        ${this.seats()}
      </div>
      `;
    }
    return template;
  }
  
  seats() {
    let seats = ``;
    for (let s = 0; s < 16; s++) {
      seats += `<div class="butacaSala"></div>`;
    }
    return seats;
  }
}