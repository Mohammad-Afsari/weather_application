// Get Elements
const switchDegrees = document.querySelector('.round')


const switchTemperature = (() => {
    // Loop through all minimum temperatures
    switchDegrees.addEventListener('click', function(e){
        // Alternate class
        if (switchDegrees.classList.contains('clicked')) {
            switchDegrees.classList.remove('clicked')
        } else {
            switchDegrees.classList.add('clicked')
        }

        for (let i = 0; i <= 40; i++) {
            if (e.target.parentElement.parentElement.children[7].children[0].children[i].className == 'tableResults') {
                if (e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent.includes('C')) {
                    // Min Temperature
                    const minTemps = Math.floor(parseInt(e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent.substr(0, e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent.indexOf('°'))) * (9/5) + 32)
                    
                    // Max Temperature
                    const maxTemps = Math.floor(parseInt(e.target.parentElement.parentElement.children[7].children[0].children[i].children[4].children[0].textContent.substr(0, e.target.parentElement.parentElement.children[7].children[0].children[i].children[4].children[0].textContent.indexOf('°'))) * (9/5) + 32)

                    // Min Temperatures set to ''
                    e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent = ''

                    // Max Temperatures set to ''
                    e.target.parentElement.parentElement.children[7].children[0].children[i].children[4].children[0].textContent = ''

                    // Set element to Farenh
                    e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent = `${minTemps}°F`
                    e.target.parentElement.parentElement.children[7].children[0].children[i].children[4].children[0].textContent = `${maxTemps}°F`

                } else {
                    // Min Temperature
                    const minTemps = Math.floor((parseInt(e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent.substr(0, e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent.indexOf('°'))) -32) * (5/9))
                    
                    // Max Temperature
                    const maxTemps = Math.floor((parseInt(e.target.parentElement.parentElement.children[7].children[0].children[i].children[4].children[0].textContent.substr(0, e.target.parentElement.parentElement.children[7].children[0].children[i].children[4].children[0].textContent.indexOf('°'))) -32) * (5/9))

                    // Min Temperatures set to ''
                    e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent = ''

                    // Max Temperatures set to ''
                    e.target.parentElement.parentElement.children[7].children[0].children[i].children[4].children[0].textContent = ''

                    // Set element to Farenh
                    e.target.parentElement.parentElement.children[7].children[0].children[i].children[3].children[0].textContent = `${minTemps}°C`
                    e.target.parentElement.parentElement.children[7].children[0].children[i].children[4].children[0].textContent = `${maxTemps}°C`
                }
            }
        }
    })
})();









export default { switchTemperature }