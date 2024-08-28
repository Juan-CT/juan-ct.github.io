import { currencies } from "./CSV_data.js";

const URL = "https://api.exchangerate-api.com/v4/latest/";

// =================================================================

const dataAsArrObj = dataToArrObj();
// Converts the CSV data into an array of objects.
function dataToArrObj() {

  /* 
  1 - Split the string into an array of strings for each return found.
  2 - Each position of the array is split into an array of strings
  for each ';' found.
  3 - Targeting the result of (2), empty camps are removed.
  4 - Targeting the result of (1), empty lines are removed.
  */
  const data = currencies.split('\n')
    .map(line => line.split(';')
      .filter(camp => camp.length))
    .filter(line => line.length)
    ;

  // Extraction of the first array. Contains the keys for the object.
  const propKeys = data.shift();

  // Reducing the array of arrays into the specified acc.
  const arrObjs = data.reduce((acc, line) => {
    // Reducing each array into an object
    const obj = line.reduce((obj, v, i) => {
      // object created[keysForObject[position]] = value of the array.
      obj[propKeys[i]] = v;
      return obj;
    }, {}); // Init as an empty object.
    // Each obj pushed is a line of the array converted into an object.
    acc.push(obj);
    // Returns the acc updated.
    return acc;
  }, []); // Init as an empty array.

  return arrObjs;
}

// =================================================================

generateSelects();
addEventToSelects();
addEventToInputs();

// Insert a select element into the desired div elements
function generateSelects() {
  const divsCurrencies = document.querySelectorAll('.appCurrency-currencies-cont');
  const selectString = createSelect(dataAsArrObj);
  const selectNode = new DOMParser().parseFromString(selectString, 'text/html');
  divsCurrencies.forEach(div =>
    div.insertAdjacentElement('afterbegin', selectNode.body.firstChild.cloneNode(true))
  );

  const selects = document.querySelectorAll('select');
  selects[0].setAttribute('id', 'appCurency-currency-firstSel');
  selects[1].setAttribute('id', 'appCurency-currency-secondSel');
}

/* Creates a string with a select element and its options, 
taken from dataAsArrObj */
function createSelect(data) {
  const selectTemplate = `
  <select>
  ${objsToOption(data)}
  </select>
  `;
  return selectTemplate;

  function objsToOption(data) {
    let optionTemplate = ``;
    data.forEach(object => {
      optionTemplate += `<option value="${object.Código}">${object.País} (${object.Nombre})</option>`;

    })
    return optionTemplate;
  }
}

// The inputs elements will listen the input event
function addEventToInputs() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(element => {
    element.addEventListener('input', onValueChange);
  })
}

// The select elements will listen the change event
function addEventToSelects() {
  const selects = document.querySelectorAll('select');
  selects.forEach(element => {
    element.addEventListener('change', onValueChange);
  })
}

// The button elements will listen the click event
function addEventToButtons() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(element => {
    element.addEventListener('click', copyTextEvent);
  })
}

// Called when an input or select change, this will call the data request to the API
function onValueChange(evt) {
  const selects = document.querySelectorAll('select');
  evt.target.id === 'appCurency-currency-secondInp' ||
    evt.target.id === 'appCurency-currency-secondSel' ?
    requestDataFromAPI(URL + selects[1].value, processPetition, errorPet) :
    requestDataFromAPI(URL + selects[0].value, processPetition, errorPet)
    ;
}

/* Called when a button is clicked, this will attempt to copy the
adjacent text and notify the user*/
function copyTextEvent(evt) {
  const button = evt.target;
  const textToCopy = button.previousElementSibling.innerText;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy).then(function () {
      showTooltip(evt.pageX, evt.pageY);
    }).catch(function (err) {
      console.error('Could not copy the text to the clipboard', err);
    });
  } else {
    console.error('Could not copy the text to the clipboard');
  }

}

// Alter the input elements according to the new petition
function calculateInputs(rate, inputBase) {
  const inputs = document.querySelectorAll('input');
  if (inputBase.id === inputs[0].id) {
    inputs[1].value = (inputs[0].value * rate).toFixed(2);
  } else {
    inputs[0].value = (inputs[1].value * rate).toFixed(2);
  }
}

// Adds a temporary element next to the cursor
function showTooltip(x, y) {
  const tooltip = document.createElement('div');
  tooltip.setAttribute('id', 'tooltip');
  tooltip.textContent = "Copied!";
  tooltip.style.top = y + "px";
  tooltip.style.left = x + "px";

  document.body.appendChild(tooltip);

  setTimeout(() => {
    tooltip.style.opacity = '0';
    setTimeout(() => document.body.removeChild(tooltip), 200);
  }, 1000);
}

// =================================================================

// Petition to retrieve data from the chosen url
function requestDataFromAPI(url, success, error) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState != 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      success(JSON.parse(xhr.responseText));
    } else {
      error();
    }
  })

  xhr.open('GET', url);
  xhr.send();
}

// Receives the response from the AJAX petition.
function processPetition(json) {
  const selects = document.querySelectorAll('select');
  const inputs = document.querySelectorAll('input');
  const divChangeBase = document.querySelector('.appCurrency-base-change');
  const divChangeTotal = document.querySelector('.appCurrency-total-change');

  let inputToCalculate; let rateToCalculate;

  // Writes the base conversion according to the last currency chosen
  if (json.base === selects[0].value) {
    inputToCalculate = inputs[0];
    rateToCalculate = json.rates[selects[1].value];

    divChangeBase.innerHTML = `<p>
    1 ${selects[0].value}  = ${rateToCalculate} ${selects[1].value}
    </p>
    <button id="appCurrency-copy-base"></button>      
    `;

  } else {
    inputToCalculate = inputs[1];
    rateToCalculate = json.rates[selects[0].value];

    divChangeBase.innerHTML = `<p>
    1 ${selects[1].value}  = ${rateToCalculate} ${selects[0].value}
    </p>
    <button id="appCurrency-copy-base"></button>      
    `;

  }

  calculateInputs(rateToCalculate, inputToCalculate);

  // Writes the total conversion according to the last currency chosen
  divChangeTotal.innerHTML = `<p>
  ${inputs[0].value} ${selects[0].value} = 
  ${inputs[1].value} ${selects[1].value}
  </p>
  <button id="appCurrency-copy-total"></button>    
  `;

  addEventToButtons();
}

// Error message when the AJAX petition fails.
function errorPet() {
  console.error('Error encountered fetching the data.');
}