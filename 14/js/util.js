import { ALERT_SHOW_TIME } from './data.js';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { showAlert, debounce };
