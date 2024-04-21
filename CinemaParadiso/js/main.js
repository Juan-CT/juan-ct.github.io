'use strict';
import { defaultData } from "./objs/defaultData.js";
import { processData } from "./logic/processData.js";
import { generateHTML } from "./structure/generateHTML.js";
import { eventInit } from "./logic/events.js";
import { readData } from "./logic/localeData.js";

const name = "cinemaParadiso";

document.addEventListener('DOMContentLoaded', () => {
  
  const dataSaved = JSON.parse(readData(name));
  console.log(dataSaved)
  const cinema = dataSaved ? processData(dataSaved) : processData(defaultData);
  console.log(cinema);
  
  generateHTML(cinema);
  eventInit(cinema);
})



