export const defaultData = {
   "salas":[
      {
         "nombre":"Sala 1",
         "id":1,
         "filas":8,
         "butacas": 16
      },
      {
         "nombre":"Sala 2",
         "id":2,
         "filas":6,
         "butacas": 12
      },
      {
         "nombre":"Sala 3",
         "id":3,
         "filas":4,
         "butacas": 12
      },
      {
         "nombre":"Sala 4",
         "id":4,
         "filas":6,
         "butacas": 12
      },
      {
         "nombre":"Sala 5",
         "id":5,
         "filas":10,
         "butacas": 16
      },
      {
         "nombre":"Sala 6",
         "id":6,
         "filas":8,
         "butacas": 12
      },
      {
         "nombre":"Sala 7",
         "id":7,
         "filas":4,
         "butacas": 8
      },
      {
         "nombre":"Sala 8",
         "id":8,
         "filas":4,
         "butacas": 8
      },
      {
         "nombre":"Sala 9",
         "id":9,
         "filas":6,
         "butacas": 12
      },
      {
         "nombre":"Sala 10",
         "id":10,
         "filas":12,
         "butacas": 16
      },
      {
         "nombre":"Sala 11",
         "id":11,
         "filas":15,
         "butacas": 16
      }
   ],
   "peliculas":[
      {
         "nombre":"Godzilla",
         "precio":12,
         "id": 1
      },
      {
         "nombre":"Dune - Part One",
         "precio":12,
         "id": 2,
         "seleccionada":true
      },
      {
         "nombre":"Star Wars - Episode IV",
         "precio":10,
         "id": 3
      },
      {
         "nombre":"Matrix",
         "precio":9,
         "id": 4
      },
      {
         "nombre":"ESDLA - La comunidad del anillo",
         "precio":10,
         "id": 5
      },
      {
         "nombre":"X-Men",
         "precio":10,
         "id": 6
      },
      {
         "nombre":"Mad Max - Fury Road",
         "precio":8,
         "id": 7
      },
      {
         "nombre":"Interstellar",
         "precio":12,
         "id": 8
      }
   ],
   "peliculas_salas":[
      {
         "id_pelicula":1,
         "id_salas":[
            2
         ]
      },
      {
         "id_pelicula":2,
         "id_salas":[
            1,4
         ]
      },
      {
         "id_pelicula":3,
         "id_salas":[
            3
         ]
      },
      {
         "id_pelicula":4,
         "id_salas":[
            5
         ]
      },
      {
         "id_pelicula":5,
         "id_salas":[
            6
         ]
      },
      {
         "id_pelicula":6,
         "id_salas":[
            7
         ]
      },
      {
         "id_pelicula":7,
         "id_salas":[
            8
         ]
      },
      {
         "id_pelicula":8,
         "id_salas":[
            9,10,11
         ]
      }
   ]
};