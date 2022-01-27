'use strict'

// Modules
import { max } from "lodash"
import { test } from "media-typer"

import "@babel/polyfill";
import 'regenerator-runtime/runtime'

// Elements
const searchLocation = document.getElementById('searchLocation')

// Card Elements for the data NOW
const locationNow = document.getElementById('location')
const weatherIconNow = document.getElementById('icon')
const tempNow = document.getElementById('tempNow')
const weatherDescriptionNow = document.getElementById('description')

const population = document.getElementById('population')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const feelsLike = document.getElementById('feelsLike')
const minTemp = document.getElementById('minTemp')
const maxTemp = document.getElementById('maxTemp')
const humidity = document.getElementById('humidity')
const windSpeed = document.getElementById('windSpeed')

// Fetched data
let initialWeatherData;
let initialTableData;
let weatherData;

// Weather API call
class fetchWeather {
    constructor(location) {
        this.location = location
        this.apiKey = '7b0a92ca908a86b25062d51d02ac730b'
    }

    async getWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&appid=${this.apiKey}`)
            const weatherData = await response.json();

            return weatherData;
        } catch(error) {
            console.log(error)
        }
    }

    // Async function only to load results on first page
    async initialPageWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=london&appid=${this.apiKey}`)
            const weatherData = await response.json();

            return weatherData;
        } catch(error) {
            console.log(error)
        }
    }
}

// Initial on load results
const pageOnLoad = (() => {
    // Create an instance of the Fetch Weather class
    const initialWeather = new fetchWeather(searchLocation.value)
    const resolveWeather = initialWeather.initialPageWeather()

    resolveWeather.then((data) => {
        // Set the initial weather data to global variable
        initialWeatherData = data
        initialTableData = data
        cardData(initialWeatherData)
        dataTable(initialTableData)
    })
    .catch((error) => {
        console.log(error)
    })
})();


// Set loader for on search
searchLocation.addEventListener('change', function() {
    const loader = document.querySelector('.loader')
    if (loader.style.display == '') {
        loader.style.display = 'block'
    }
    setTimeout(() => {
        loader.style.display = ''
        allWeather()
        
    }, 350);
})

// Return all weathered related data for the chosen location
function allWeather() {
    // Create an instance of the Fetch Weather class
    const searchWeather = new fetchWeather(searchLocation.value)
    const resolveWeather = searchWeather.getWeather()
    
    // Resolve Weather is a promise hence resolve (error is handled in the class)
    resolveWeather.then((data) => {
        // Reset value after search
        searchLocation.value = ''

        // Set the weather data to global variable
        weatherData = data

        // Reset the click button
        const switchButton = document.querySelector('.round')

        if (switchButton.classList.contains('clicked')) {
            switchButton.click()
            switchButton.classList.remove('clicked')
        }

        // Push data to the card
        cardData(weatherData);

        // Put data to the table
        dataTable(weatherData);
    })
    .catch((error) => {
        const errorMsg = document.querySelector('.errorMessage')
        // Alert user if there is an error
        if(error.toString() == "TypeError: Cannot read properties of undefined (reading 'name')") {
            // Initially show the error message and then remove it after three seconds
            errorMsg.style.visibility = 'visible'
            setTimeout(() => {
                errorMsg.style.visibility = 'hidden'
            }, 3000);
        }
    })
}

//Push data onto the DOM
const cardData = (data) => {
    // Left side of card details
    const locationData = data.city.name
    const iconNowData = data.list[0].weather[0].icon
    const tempNowData = data.list[0].main.temp
    const descriptionNowData = data.list[0].weather[0].description

    // Right handside of card details
    const populationData = data.city.population
    const sunriseData = data.city.sunrise
    const sunsetData = data.city.sunset
    const feelslikeNowData = data.list[0].main.feels_like
    const minTempNowData = data.list[0].main.temp_min
    const maxTempNowData = data.list[0].main.temp_max
    const humidityNowData = data.list[0].main.humidity
    const windData = data.list[0].wind.speed
    
    // Calculations for temperature (from Kelvin to Celcius)
    let tempNowDataCelc = toCelcius(tempNowData)
    let feelslikeNowDataCelc = toCelcius(feelslikeNowData)
    let minTempNowDataCelc = toCelcius(minTempNowData) 
    let maxTempNowDataCelc = toCelcius(maxTempNowData) 

    // =============================== Temperature ===============================
    const switchDegrees = document.querySelector('.round')
    let tempNowCurrent = `<span id="tNow">${tempNowDataCelc}</span><span id="cf">°</span><span id="c"> C</span>`
    let feelslikeCurrent = `Feels like: ${feelslikeNowDataCelc}°C`
    let minTempCurrent = `Min. Temp: ${minTempNowDataCelc}°C`
    let maxTempCurrent = `Max. Temp: ${maxTempNowDataCelc}°C`

    // Alternator for C / F
    let alternator = 1

    switchDegrees.addEventListener('click', function(e){
        // Alternate between odd / even for F / C
        alternator++

        if (alternator % 2 == 0) {
            // Faren
            tempNowCurrent = `<span id="tNow">${Math.floor((tempNowDataCelc * (9/5)) + 32)}</span><span id="cf">°</span><span id="c"> F</span>`
            feelslikeCurrent = `Feels like: ${Math.floor((feelslikeNowDataCelc * (9/5)) + 32)}°F`
            minTempCurrent = `Min. Temp: ${Math.floor((minTempNowDataCelc * (9/5)) + 32)}°F`
            maxTempCurrent = `Max. Temp: ${Math.floor((maxTempNowDataCelc * (9/5)) + 32)}°F`

            tempNow.innerHTML = tempNowCurrent
            feelsLike.innerHTML = feelslikeCurrent
            minTemp.innerHTML = minTempCurrent
            maxTemp.innerHTML = maxTempCurrent
        } else {
            // Celcius
            tempNowCurrent = `<span id="tNow">${tempNowDataCelc}</span><span id="cf">°</span><span id="c"> C</span>`
            feelslikeCurrent = `Feels like: ${feelslikeNowDataCelc}°C`
            minTempCurrent = `Min. Temp: ${minTempNowDataCelc}°C`
            maxTempCurrent = `Max. Temp: ${maxTempNowDataCelc}°C`

            tempNow.innerHTML = tempNowCurrent
            feelsLike.innerHTML = feelslikeCurrent
            minTemp.innerHTML = minTempCurrent
            maxTemp.innerHTML = maxTempCurrent
        }
        
    })

    // =============================== Temperature ===============================

    // Calculations for time
    const sunriseDataActual = (new Date(sunriseData * 1000)).toLocaleTimeString()
    const sunsetDataActual = (new Date(sunsetData * 1000)).toLocaleTimeString()
    
    // Set elements to the correct values
    locationNow.innerHTML = locationData
    weatherIconNow.src = `http://openweathermap.org/img/wn/${iconNowData}@2x.png`
    //tempNow.innerHTML = `<span id="tNow">${tempNowDataCelc}</span><span id="cf">°</span><span id="c"> C</span>`
    tempNow.innerHTML = tempNowCurrent // UPDATED
    weatherDescriptionNow.innerHTML = descriptionNowData
    population.innerHTML = `Population: ${populationData}`
    sunrise.innerHTML = `Sunrise: ${sunriseDataActual}`
    sunset.innerHTML = `Sunset: ${sunsetDataActual}`
    
    // feelsLike.innerHTML = `Feels like: ${feelslikeNowDataCelc}°`
    feelsLike.innerHTML = feelslikeCurrent // UPDATED
   
    // minTemp.innerHTML = `Min. Temp: ${minTempNowDataCelc}°`
    minTemp.innerHTML =  minTempCurrent // UPDATED
    // maxTemp.innerHTML = `Max. Temp: ${maxTempNowDataCelc}°`
    maxTemp.innerHTML =  maxTempCurrent // UPDATED

    humidity.innerHTML = `Humidity: ${humidityNowData}%`
    windSpeed.innerHTML = `Wind: ${windData}mph`
}

// Data table 
const dataTable = (data) => {
    // Elements
    const dataTable = document.querySelector('.dataTable')
    const tableHeadingsParent = document.querySelector('.tableHeadingsParent')

    // Data array
    const weatherDataArray = data.list

    // Empty the data table
    dataTable.innerHTML = ''

    // Table headings
    const tableHeadings = `
        <tr class="tableHeadingsParent">
            <th>Date</th>
            <th>Icon</th>
            <th>Humidity</th>
            <th>Min. Temp</th>
            <th>Max. Temp</th>
        </tr>
    `
    dataTable.innerHTML = tableHeadings

    // Loop through array
    for (let i=0; i<weatherDataArray.length; i++){
        // Create tr element and append to dataTable
        const newRow = document.createElement('tr')
        newRow.classList.add('tableResults')

        // New date in date format
        const rowDate = new Date(`${weatherDataArray[1].dt_txt}`)

        newRow.innerHTML = `
            <td>${(weatherDataArray[i].dt_txt).substr(11,5)} ${rowDate.toString().substr(0,15)}</td>
            <td><img src="http://openweathermap.org/img/wn/${weatherDataArray[i].weather[0].icon}@2x.png" alt="" id="icon"></td>
            <td>${weatherDataArray[i].main.humidity}%</td>
            <td class="minTempTab"><span class="cel">${toCelcius(weatherDataArray[i].main.temp_min)}°C</span></td>
            <td class="maxTempTab"><span class="cel">${toCelcius(weatherDataArray[i].main.temp_max)}°C</span></td>
        `

        // Append to table
        dataTable.appendChild(newRow)
    }
}

// Temperature Calculations (Celcius / Kelvin)
const toCelcius = (k) => {
    return Math.floor(k - 273.15)
}

export { fetchWeather, allWeather}



