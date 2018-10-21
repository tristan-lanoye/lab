<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="./stylesheets/lib/reset.css">
        <link rel="stylesheet" href="./stylesheets/index.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
        <link rel="stylesheet" type="text/css" href="./stylesheets/common.css"/>
        <link rel="stylesheet" type="text/css" href="./stylesheets/leaflet-popup.css"/>
        <link rel="stylesheet" type="text/css" href="./stylesheets/leaflet-custom.css"/>
        <link rel="stylesheet" type="text/css" href="./stylesheets/lib/leaflet-openweathermap.css"/>
	    <script type="text/javascript" src="./js/lib/leaflet-openweathermap.js"></script>
        <title>API</title>
    </head>


    <body>
        <form class="hidden-form hidden" action="city.php" method="GET">
            <input class="input-id" type="hidden" name="id">
            <input class="input-lat" type="hidden" name="lat">
            <input class="input-lon" type="hidden" name="lon">
        </form>
        <div id="mapid"></div>
        <div class="form-container">
            <h1 class="main-title"> <a href="/php-weather">weather &amp; food</a> </h1>
            <input class="search-input" type="text" name="city" autocomplete="off" placeholder="Search for your city ... type it or say it out loud" autofocus>
            <ul class="search-results"></ul>
        </div>

        <div class="github">
            <a href="https://github.com/tristan-lanoye/php-weather">View code on github</a>    
        </div>

        <script src="./js/init.js"></script>
        <script src="./js/custom-leaflet.js"></script>
        <script src="./js/event-handling.js"></script>
        <script src="./js/event-listeners.js"></script>
    </body>
</html>