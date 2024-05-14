import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const valueDelay = document.querySelector('[type="number"]');
const createNotification = document.querySelector('[type="submit"]');
const fulfilled = document.querySelector('[value="fulfilled"]');
const rejected = document.querySelector('[value="rejected"]');
const formState = document.querySelector('fieldset');

const saveToLocalStorage = () => {
  const settings = {
    delay: valueDelay.value,
    fulfilledChecked: fulfilled.checked,
    rejectedChecked: rejected.checked,
  };
  localStorage.setItem('formSettings', JSON.stringify(settings));
};

const loadFromLocalStorage = () => {
  const settings = JSON.parse(localStorage.getItem('formSettings'));
  if (settings) {
    valueDelay.value = settings.delay || '';
    fulfilled.checked = settings.fulfilledChecked;
    rejected.checked = settings.rejectedChecked;
  }
};

const createPromise = waitingTime => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilled.checked) {
        resolve(`✅ Fulfilled promise in ${waitingTime}ms`);
      } else {
        reject(`❌ Rejected promise in ${waitingTime}ms`);
      }
    }, waitingTime);
  });
};

const showNotification = (message, type = 'info') => {
   iziToast.show({
     title: 'info',
     message: 'Time is up!',
     color: '#4CAF50',
     position: 'topRight',
     messageColor: '#fff',
     titleColor: '#fff',
   });
};

const pressClick = ev => {
  ev.preventDefault();

  const delayValue = valueDelay.value;
  if (!delayValue || delayValue < 0) {
    showNotification('Please enter a valid delay time.', 'error');
    return;
  }

  saveToLocalStorage();

  createPromise(delayValue).then(
    value => showNotification(value),
    error => showNotification(error, 'error')
  );
};

// Load settings from local storage on page load
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

createNotification.addEventListener('click', pressClick);
