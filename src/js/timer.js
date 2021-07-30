'use strict';

import Swal from 'sweetalert2';
import '../sass/timer.scss';

const inputFld = document.getElementById('date-selector');
const startBtn = document.querySelector('[data-startcount]');
const stopBtn = document.querySelector('[data-stopcount]')
const daysFld = document.querySelector('[data-days]');
const hoursFld = document.querySelector('[data-hours]');
const minutesFld = document.querySelector('[data-minutes]');
const secondsFld = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);
stopBtn.setAttribute('disabled', true);

let intervalId;
let dateMs = 0;
let inputDate;

const stopTimer = () => {
    Timer.stop();
}

const startTimer = () => {
    Timer.start();
    startBtn.classList.add('runningTimer');
    startBtn.setAttribute('disabled', true);
};

inputFld.addEventListener('input', (() => {
    if (startBtn.classList.contains('runningTimer')) {
        inputFld.setAttribute('disabled', true);
        Swal.fire("The timer is already running");
    } else {
        processValueFromInput()
    };
}));

function refreshInputValues() {
    const startTime = Date.now();
    inputDate = inputFld.value;
    dateMs = convertMs((new Date(inputDate).getTime() - 10800000) - startTime);
    Number(daysFld.textContent = dateMs.days);
    Number(hoursFld.textContent = dateMs.hours);
    Number(minutesFld.textContent = dateMs.minutes);
    Number(secondsFld.textContent = dateMs.seconds);
}


function processValueFromInput() {
    if (Date.now() < new Date(inputFld.value).getTime() && inputFld.value) {
        refreshInputValues();

        startBtn.removeAttribute('disabled');
        startBtn.addEventListener('click', startTimer);
    } else {
        startBtn.setAttribute('disabled', true);
        Swal.fire("Please choose a date in the future");
    }
};

const Timer = {
    start() {
        intervalId = setInterval(() => {
            const startTime = Date.now();
            refreshInputValues();
            if ((new Date(inputDate).getTime() - startTime) === 0) {
                Timer.stop();
                startBtn.removeAttribute('disabled');
                stopBtn.setAttribute('disabled', true);
            };
            inputFld.setAttribute('disabled', true);
            startBtn.setAttribute('disabled', true);
            stopBtn.removeAttribute('disabled');
        }, 1000);

        stopBtn.removeAttribute('disabled');

        stopBtn.addEventListener('click', stopTimer);
        window.removeEventListener('click', startTimer);

    },

    stop() {
        Number(daysFld.textContent = 0);
        Number(hoursFld.textContent = 0);
        Number(minutesFld.textContent = 0);
        Number(secondsFld.textContent = 0);
        clearInterval(intervalId);
        startBtn.classList.remove('runningTimer');
        console.log('Timer has stopped');
        startBtn.removeAttribute('disabled');
        stopBtn.setAttribute('disabled', true);
        inputFld.removeAttribute('disabled');
        window.removeEventListener('click', stopTimer);
    },
};



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};