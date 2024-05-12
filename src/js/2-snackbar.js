import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';


const valueDelay = document.querySelector('[type="number"]');
const createNotification = document.querySelector('[type="submit"]');
const fulfilled = document.querySelector('[value="fulfilled"]');
const rejected = document.querySelector('[value="rejected"]');

const createPromis = waitingTime => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fulfilled.checked
        ? resolve(`✅ Fulfilled promise in ${waitingTime}ms`)
        : reject(`❌ Rejected promise in ${waitingTime}ms`);
    }, waitingTime);
  });
};

const pressClick = ev => {
  ev.preventDefault(ev);

  createPromis(valueDelay.value).then(
    value => {
      iziToast.show({
        message: value,
      });
    },
    error => {
      iziToast.show({
        message: error,
      });
    }
    );

    formCleaning();
};

createNotification.addEventListener('click', pressClick);

function formCleaning() {
    valueDelay.value = null
    fulfilled.checked = false;
    rejected.checked = false;
}
