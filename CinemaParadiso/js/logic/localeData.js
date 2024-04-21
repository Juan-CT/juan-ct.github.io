
export function readData(name) {
  return localStorage.getItem(name);
}

export function saveData(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}