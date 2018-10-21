//Event Handling
const suggestionClicked = (e) => {
    inputId.value = e.currentTarget.dataset.id
    inputLat.value = e.currentTarget.dataset.lat 
    inputLon.value = e.currentTarget.dataset.lon
    hiddenForm.submit() 
}
const popupClicked = (id, lat, lon) => {
    inputId.value = id 
    inputLat.value = lat 
    inputLon.value = lon
    hiddenForm.submit() 
}

const handleMousedown = () => {
    isMousePressed = true
    searchResults.innerHTML = ''
    window.setTimeout(() => {
        if(isMousePressed) {
            mainTitle.style.opacity = 0.5
            searchInput.style.background = 'rgba(241, 241, 241, 0.507)'
        }
    }, 200)
}

const handleMouseup = () => {
    isMousePressed = false 
    mainTitle.style.opacity = 1
    searchInput.style.background = '#f1f1f1' 
}

const displaySuggestions = e => {
    let input = e === searchInput.value ? searchInput.value : e.target.value 
    if(data.cities.length != 0 && input.length >= 2) {
        const matches = data.cities.filter(data => data.city.findname.includes(input.toUpperCase()))
        const html = matches.slice(0,7).map(data => {
            return `
                <li class="suggestion" data-id=${data.city.id} data-lat=${data.city.coord.lat} data-lon=${data.city.coord.lon}>
                    <span class="item city">${data.city.name}, <span class="contrast">${convertCountryCode(data.city.country)}</span> </span> 
                    <span class="item temp">${convertTemperature(data.main.temp)}°  
                        <span class="desc contrast">${convertUppercase(data.weather[0].description)}</span> 
                    </span> 
                    <img class="img" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
                </li>
            `
        }).join('')
        searchResults.innerHTML = html 
    } else {
        searchResults.innerHTML = '' 
    }
    Array.from(document.querySelectorAll('.suggestion')).map(suggestion => suggestion.addEventListener('click', suggestionClicked))
}

const displayRecognition = e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    searchInput.value = transcript
    
    if (e.results[0].isFinal) {
        displaySuggestions(searchInput.value)
    }
}

const displayPopup = (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=7f87a407e59a9c89d77a588d3c51ed2b`)
    .then(blob => blob.json())
    .then(data => {
        L.popup({className: [`id${data.id} ${data.name}`]})    
        .setLatLng(e.latlng)
        .setContent(`
            <h1 class="name">${data.name}</h1> 
            <h2 class="temp">${convertTemperature(data.main.temp)}°C</h2>
            <span class="desc">${convertUppercase(data.weather[0].description)}</span>
            <div><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/></div>`)
        .openOn(map)
        const openPopup = document.querySelector(`.id${data.id}`)
        openPopup.addEventListener('click', (e) => {
            popupClicked(data.id, data.coord.lat, data.coord.lon)
        })
    })
}
