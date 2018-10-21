//Speech Recognition Variables
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.interimResults = true
recognition.lang = 'fr'

//DOM Variables
const searchInput = document.querySelector('.search-input')
const searchResults = document.querySelector('.search-results')
const mainTitle = document.querySelector('.main-title')

const hiddenForm = document.querySelector('.hidden-form') 
const inputId = document.querySelector('.input-id') 
const inputLat = document.querySelector('.input-lat') 
const inputLon = document.querySelector('.input-lon') 

//Data Variables
const data = {
    cities: [], 
    countries: {},
    mapboxKey: 'pk.eyJ1Ijoia2FhejAiLCJhIjoiY2phOWdnMjM1MGkwODJ4cjFubXB3YnZkdSJ9.E9tgYLmeRE4V6g7k0cIUYA',
    openWeatherKey: '7f87a407e59a9c89d77a588d3c51ed2b'
}
let isMousePressed = false

//Init Functions
const loadJSON = url => {   
    const xobj = new XMLHttpRequest()
    xobj.overrideMimeType("application/json")
    xobj.open('GET', url, true) 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            const response = JSON.parse(xobj.responseText)
            url.includes('weather') ? data.cities = response : data.countries = response
            console.log(data)
        }
    }
    xobj.send(null)
}

loadJSON('./data/weather.json') 
loadJSON('./data/country.json')

//Helper Functions
const convertUppercase = str => str.toLowerCase().split(' ').map(word => {if(word.length > 0) return word[0].toUpperCase() + word.substr(1)}).join(' ')
const convertCountryCode = code => data.countries[code].name
const convertTemperature = kelvin => (kelvin - 273.15).toFixed()