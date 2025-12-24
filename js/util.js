import { ALERT_SHOW_TIME, MAX_UNIQUE_PICTURES } from './data.js';

const randomArrayElements = (array, count) => {

}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert, randomArrayElements };
