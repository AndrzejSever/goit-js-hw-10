

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const variables = {
  inputValue: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[type="button"]'),
  userSelectedDate: null,
  timer: null,

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const pad = value => String(value).padStart(2, '0');

    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  },
};

const addingMarkup = {
  addDays: document.querySelector('[data-days]'),
  addHours: document.querySelector('[data-hours]'),
  addMinutes: document.querySelector('[data-minutes]'),
  addSeconds: document.querySelector('[data-seconds]'),

  updateMarkup({ days, hours, minutes, seconds }) {
    this.addDays.textContent = days;
    this.addHours.textContent = hours;
    this.addMinutes.textContent = minutes;
    this.addSeconds.textContent = seconds;
  },
};

function startTimer() {
  const intervalId = setInterval(() => {
    const deltaTime = variables.userSelectedDate - new Date();
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      iziToast.show({
        title: 'info',
        message: 'Time is up!',
        color: '#4CAF50',
        position: 'topRight',
        messageColor: '#fff',
        titleColor: '#fff',
      });
      return;
    }
    const timeComponents = variables.convertMs(deltaTime);
    addingMarkup.updateMarkup(timeComponents);
  }, 1000);
}

function onDateSelected(selectedDates) {
  if (selectedDates[0] > new Date()) {
    variables.userSelectedDate = selectedDates[0];
    variables.buttonStart.classList.remove('hiddenBtn');
    variables.buttonStart.addEventListener('click', startTimer, { once: true });
  } else {
    variables.buttonStart.classList.add('hiddenBtn');
    iziToast.show({
      title: 'error',
      message: 'Please choose a date in the future',
      color: '#ef4040',
      position: 'topRight',
      messageColor: '#fff',
      titleColor: '#fff',
      imageWidth: '24',
    });
  }
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onDateSelected,
});

variables.buttonStart.classList.add('hiddenBtn');