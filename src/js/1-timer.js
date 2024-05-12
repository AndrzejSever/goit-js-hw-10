import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const variables = {
  inputValue: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[type="button"]'),
  userSelectedDate: null,

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    function pad(value) {
      return String(value).padStart(2, '0');
    }

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  },
};

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
const dataStart = Date.now()
        console.log(selectedDates[0]);
      if (selectedDates[0]>dataStart) {
        variables.userSelectedDate = selectedDates[0];
      }
      else {
        //   window.alert('Please choose a date in the future');
          variables.buttonStart.removeEventListener('click', listenerCallback); 
         iziToast.show({
           message: 'Please choose a date in the future',
         });
          
    }
  },
});

function listenerCallback() {
     
       setInterval(() => {
         const initialTime = new Date();
         const deltaTime = variables.userSelectedDate - initialTime;
         console.log(deltaTime);
         const time = variables.convertMs(deltaTime);

         console.log(time);
       }, 1000);
    
}

variables.buttonStart.addEventListener('click', listenerCallback);


