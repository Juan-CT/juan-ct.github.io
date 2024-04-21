
export function selectMovie(data) {
    
  return `
  <div>
    <label>Selecciona una película:</label>
    <select id="peli">
      
    ${data.arrMovies.map(movie => {
        return `
          <option data-precio="${movie.price}" 
          value="${movie.id}" 
          data-salas="${movie.salas.toString()}"
          ${movie.selecc == true ? `selected="selected"`: ``}>
          ${movie.name}
          </option>
        `;
      })}

      </select>
  </div>
  `;
}