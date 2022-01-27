import {fetchWeather, allWeather } from './search'
import { switchTemperature } from './switchTable'
import "@babel/polyfill";

// Add loading wheel on window load / refresh
window.addEventListener('DOMContentLoaded', (e) => {
    if (loader.style.display == '') {
        loader.style.display = 'block'
    }
    setTimeout(() => {
        loader.style.display = ''
    }, 600);
});


