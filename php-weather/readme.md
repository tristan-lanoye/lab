# Weather & Food

Weather & Food is a 2-page website written in PHP/JS that allows you to select a city and see its weather forecast for the next 5 days or see restaurents and businesses in the area.

It is powered by APIs from OpenWeatherMap, Dark Sky, Yelp, Leaflet, Mapbox and the Speech Recognition API.

Warning : API may not all work locally, I ran into a problem where I had to make API calls with an HTTPS connection.

## Features 
#### First page
- Background is an interactive map powered by the Leaflet JS Library and Mapbox API. You can click on it to open a popup and click again to access the 2nd page.
- The map is customizable by hovering the menu icon in the upper right corner and selecting the options. You can change the style of the map or add layers to display more informations such as temperature or wind.
- Another way to access the 2nd page is using the input to search for a city. You can either type with a keyboard or speak out loud, and suggestions will appear, now you can click on the city you want.

#### Second page
- Weather forecast and informations are displayed with PHP from a mix of OpenWeatherMap and Dark Sky data, because they complement each other nicely.
- You can click on a day of the week to display another forecast for this day in particular. The grid and responsiveness is handled with Flexbox. 
- By clicking on "What to do in *", you open another section showing places to visit and restaurents in the vicinity. It is powered by Yelp API and by clicking on a business, you are redirected to its Yelp page. 

## Tools 
- PHP
- JS
- SCSS / Compass
- HTML5 / CSS3
- Flexbox

## Bug Report 
- After refreshing the first page, the first time you click on a suggestion from the input, nothing happens, but it works fine after that.
