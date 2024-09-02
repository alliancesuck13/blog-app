export default function getStateFromLocalStorage(key = "", defaultState = null) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultState;
}
