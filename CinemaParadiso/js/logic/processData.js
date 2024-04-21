import { Cinema } from "../objs/cinema-object.js";
import { MovTheater } from "../objs/movTheater-object.js";
import { Movie } from "../objs/movie-object.js";

export function processData(data) {

  const cinema = new Cinema();

  // When data comes from LocalStorage.
  if (typeof data === 'object' && data.arrMovies && data.arrMovT) {
    cinema.arrMovies = data.arrMovies;
    cinema.arrMovT = data.arrMovT;

  // When data comes from the default data.  
  } else {

    data.salas.forEach(sala => {
      cinema.arrMovT.push(new MovTheater(
        sala.nombre,
        sala.id
      ));
    });

    data.peliculas.forEach(movie => {
      const movieInSalas = [];

      data.peliculas_salas.forEach(movSala => {
        movSala.id_pelicula == movie.id ? movieInSalas.push(movSala.id_salas) : null;
      })

      cinema.arrMovies.push(new Movie(
        movie.nombre,
        movie.precio,
        movie.id,
        movie.seleccionada ? true : false,
        movieInSalas
      ));
    });

  }

  return cinema;
}