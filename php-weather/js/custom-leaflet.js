function myOwmMarker(data) {
	// just a Leaflet default marker
	return L.marker([data.coord.lat, data.coord.lon])
}

const standard = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    minZoom: 3,
    maxZoom: 18,
    id: 'mapbox.wheatpaste',
    accessToken: data.mapboxKey
})

const map = L.map('mapid', { center: new L.LatLng(47.3772, -1.8870), zoom: 6, layers: [standard]})
const baseMaps = { 
    "Mapbox Wheatpaste": standard, 
    "Mapbox Light": L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox.light',
        accessToken: data.mapboxKey
    }), 
    "Mapbox Dark": L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: data.mapboxKey
    }), 
    "Mapbox Streets": L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: data.mapboxKey
    }), 
    "Mapbox Outdoors": L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox.outdoors',
        accessToken: data.mapboxKey
    }), 
    "Mapbox Pencil": L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox.pencil',
        accessToken: data.mapboxKey
    }), 
    "Mapbox Streets Satellite": L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox.streets-satellite',
        accessToken: data.mapboxKey
    }),
}
const overlayMaps = {
    "Temperature": L.OWM.temperature({showLegend: false, opacity: 0.3, appId: data.openWeatherKey}),
    "Wind": L.OWM.wind({showLegend: false, opacity: 0.3, appId: data.openWeatherKey}), 
    "Clouds": L.OWM.clouds({showLegend: false, opacity: 0.5, appId: data.openWeatherKey}),
    "Pressure": L.OWM.pressure({showLegend: false, opacity: 0.3, appId: data.openWeatherKey}),
    "Snow": L.OWM.snow({showLegend: false, opacity: 0.5, appId: data.openWeatherKey}),
    "Rain": L.OWM.rain({showLegend: false, opacity: 0.5, appId: data.openWeatherKey}),
    "Precipitation": L.OWM.precipitation({showLegend: false, opacity: 0.5, appId: data.openWeatherKey}),
}

const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map)