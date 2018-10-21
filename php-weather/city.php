<?php
    $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $dayNumber = 1; 
    $id = isset($_GET['id']) ? $_GET['id'] : '2950159';
    $lat = isset($_GET['lat']) ? $_GET['lat'] : '52.5200';
    $lon = isset($_GET['lon']) ? $_GET['lon'] : '13.4050';

    define('OWM_KEY', '7f87a407e59a9c89d77a588d3c51ed2b');
    define('OWM_URL', 'http://api.openweathermap.org/data/2.5/forecast?appid='.OWM_KEY.'&id='.$id.'&units=metric');
    define('DARK_KEY', '86f7e20d18537e27e1716214973667c7');
    define('DARK_URL', 'https://api.darksky.net/forecast/'.DARK_KEY.'/'.$lat.','.$lon);
    define('YELP_KEY', 'Authorization: Bearer vOCR5RaQCrzbhwHfuftCjVOeiwySubHLmI2QOMFFTfpLhIpTGX7C_a3RxvNNoTcjXaXe-cpntXSamHtI6rZsNDwsM1LoC2HMD_VQ34nj1y8cRha8rfaROVKykXeyWnYx');
    define('YELP_URL', 'https://api.yelp.com/v3/businesses/search?radius=10000&latitude='.$lat.'&longitude='.$lon); 

    
    $owmCurl = curl_init();
    curl_setopt_array($owmCurl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => OWM_URL,
    ));
    $owmData = json_decode(curl_exec($owmCurl));
    curl_close($owmCurl);
    
    $darkCurl = curl_init();
    curl_setopt_array($darkCurl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => DARK_URL,
    ));
    $darkData = json_decode(curl_exec($darkCurl));
    curl_close($darkCurl);
    
    //(°F - 32) / 1.8 = °C
    
    $yelpCurl = curl_init();
    curl_setopt_array($yelpCurl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => YELP_URL,
        CURLOPT_HTTPHEADER => array(YELP_KEY),
    ));
    $yelpData = json_decode(curl_exec($yelpCurl));
    curl_close($yelpCurl);    
    
    $dateArray = array(); 
    foreach ($owmData->list as $forecast) {
        if(!isset($newDay) || $newDay != date('Y-m-d H:i', $forecast->dt)[8] . date('Y-m-d H:i', $forecast->dt)[9]) {
            $newDay = date('Y-m-d H:i', $forecast->dt)[8] . date('Y-m-d H:i', $forecast->dt)[9];              
            array_push($dateArray, substr(date("F j, Y, g:i a", $forecast->dt),0,14)); 
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./stylesheets/lib/reset.css">
    <link rel="stylesheet" href="./stylesheets/common.css">
    <link rel="stylesheet" href="./stylesheets/city.css">
    <script type="text/javascript"> 
        const dateArray = <?php echo json_encode($dateArray); ?> 
    </script>   
    <title><?= $owmData->city->name?> - Weather Forecast</title>
</head>
    <body>
        <section class="section-1 orange">
            <div class="back align">
                <!-- <a href="/php-weather">Back to main menu</a> -->
                <a class="orange" href="https://www.tristan-lanoye.com/lab/php-weather"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(0, 115, 187)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> Back to main menu</a>
            </div>    
            <div class="main align">
                <div class="title">
                    <span class="name"><?= $owmData->city->name ?> <?= $yelpData->businesses[0]->location->country ?>
                        <img class="desc-icon" src="https://openweathermap.org/img/w/<?= $owmData->list[0]->weather[0]->icon ?>.png" alt="">
                    </span>
                </div>
                <div class="temp"><?= round($owmData->list[0]->main->temp) ?>°
                    <span class="desc-txt"><?= ucwords($owmData->list[0]->weather[0]->description) ?></span> 
                </div>
                <div class="high-details">
                    <div class="item"> <span class="contrast">Feels Like </span> <?= round((round($darkData->currently->apparentTemperature) - 32) / 1.8) ?> °</div>
                    <div class="item"> <span class="contrast">Humidity </span> <?= round($darkData->currently->humidity * 100) ?> %</div>
                    <div class="item"> <span class="contrast">Wind Speed </span> <?= round($darkData->currently->windSpeed) ?> m/s</div>
                    <div class="item"> <span class="contrast">Cloudiness </span> <?= round($darkData->currently->cloudCover * 100) ?> %</div>
                    <div class="item"> <span class="contrast">Precipitation Probability </span> <?= round($darkData->currently->precipProbability) ?> %</div>
                    <div class="item"> <span class="contrast">Visibility </span> <?= round($darkData->currently->visibility) ?> km</div>
                </div>
            </div>
        </section>
    
        <section class="section-2">
            <ul class="cat weather align">
                <li data-section="3" class="cat-button weather active">Weather Forecast</li>
                <li data-section="4" class="cat-button yelp">What to do in <?= $owmData->city->name ?></li>
            </ul>
        </section>

        <section class="section-5">
            <section class="section-item section-3 align active">
                <div class="option option-week"><span>This Week</span></div>
                <ul class="forecast forecast-week ">
                    <?php foreach ($owmData->list as $forecast): 
                    if(!isset($currentDay) || $currentDay != date('Y-m-d H:i', $forecast->dt)[8] . date('Y-m-d H:i', $forecast->dt)[9]) {
                        $currentDay = date('Y-m-d H:i', $forecast->dt)[8] . date('Y-m-d H:i', $forecast->dt)[9];
                        $dayNumber++; 
                        ?>
                        
                        <li class="day <?php if($currentDay == date('Y-m-d H:i', $owmData->list[0]->dt)[8] . date('Y-m-d H:i', $owmData->list[0]->dt)[9]) { echo 'day-active';}?>" data-id="<?= $currentDay ?>">
                            <div class="date">
                                <span class="date-number"><?= $currentDay ?></span>
                                <span class="date-day"><?= substr(strftime("%A",strtotime(date('y-m-d', $forecast->dt))), 0, 3)?></span>
                            </div>
                            <div class="desc">
                                <span><?= ucfirst($forecast->weather[0]->description) ?></span>
                            </div>
                            <div class="icon">
                                <img src="https://openweathermap.org/img/w/<?= $forecast->weather[0]->icon ?>.png" alt="">
                            </div>
                            <div class="temp">
                                <span class="temp-max"><?= round($forecast->main->temp_max) ?>°</span>
                                <span class="temp-min"><?= round($forecast->main->temp_min) ?>°</span>
                            </div>
                        </li>
                    <?php } endforeach ?>
                </ul>
                <div class="option option-day"><span><?= substr(date("F j, Y, g:i a", $owmData->list[0]->dt),0,14); ?></span></div>
                <ul class="forecast forecast-day ">
                    <?php foreach ($owmData->list as $forecast): 
                        if(!isset($currentDay) || $currentDay != date('Y-m-d H:i', $forecast->dt)[8] . date('Y-m-d H:i', $forecast->dt)[9]) {
                            $currentDay = date('Y-m-d H:i', $forecast->dt)[8] . date('Y-m-d H:i', $forecast->dt)[9]; } 
                            ?>
                            
                            <li data-id="<?= $currentDay ?>" 
                            class="hour <?php if($currentDay == date('Y-m-d H:i', $owmData->list[0]->dt)[8] . date('Y-m-d H:i', $owmData->list[0]->dt)[9]) { echo 'hour-active';}?>"
                            >
                                <div class="date">
                                    <span class="date-hour"><?= $forecast->dt_txt[11] . $forecast->dt_txt[12] ?> <span class="contrast">h</span></span>
                                </div>
                                <div class="desc">
                                    <span><?= ucfirst($forecast->weather[0]->description) ?></span>
                                </div>
                                <div class="icon">
                                    <img src="https://openweathermap.org/img/w/<?= $forecast->weather[0]->icon ?>.png" alt="">
                                </div>
                                <div class="temp">
                                    <span class="temp-max"><?= round($forecast->main->temp_max) ?>°</span>
                                </div>
                            </li>
                    <?php endforeach ?>
                </ul>
                <div class="low-details">
                    <?php for ($i = 1; $i < $dayNumber; $i++) { ?>
                        <div class="detail detail-<?= $i ?> <?php if($i == 1) { echo 'detail-active'; } ?>">
                            <div class="item summary"><?= $darkData->daily->data[$i]->summary ?></div>                            
                            <div class="item"> <span class="contrast">Temperature Max</span> <?= round((round($darkData->daily->data[$i]->temperatureHigh) - 32) / 1.8) ?> °</div>
                            <div class="item"> <span class="contrast">Temperature Min</span> <?= round((round($darkData->daily->data[$i]->temperatureLow) - 32) / 1.8) ?> °</div>
                            <div class="item"> <span class="contrast">Sunrise Time</span> <?= date("H:i:s",$darkData->daily->data[$i]->sunriseTime) ?></div>
                            <div class="item"> <span class="contrast">Sunset Time</span> <?= date("H:i:s",$darkData->daily->data[$i]->sunsetTime) ?></div>
                            <div class="item"> <span class="contrast">Pressure</span> <?= round($darkData->daily->data[$i]->pressure) ?> hPa</div>
                            <div class="item"> <span class="contrast">Precipitation Probability</span> <?= round($darkData->daily->data[$i]->precipProbability) ?> %</div>
                            <div class="item"> <span class="contrast">Precipitation Intensity</span> <?= round($darkData->daily->data[$i]->precipIntensity) ?> mm/h</div>
                            <div class="item"> <span class="contrast">Precipitation Type</span> <?= ucwords($darkData->daily->data[$i]->precipType) ?></div>
                            <div class="item"> <span class="contrast">Dew Point</span> <?= round($darkData->daily->data[$i]->dewPoint) ?> °</div>
                            <div class="item"> <span class="contrast">Moonphase</span> <?= round($darkData->daily->data[$i]->moonPhase) ?></div>
                            <div class="item"> <span class="contrast">UV Index</span> <?= round($darkData->daily->data[$i]->uvIndex) ?></div>
                            <div class="item"> <span class="contrast">Ozone</span> <?= round($darkData->daily->data[$i]->ozone) ?> DU</div>
                        </div>
                    <?php } ?>
                </div>
            </section>
            <section class="section-item section-4 align yelp-places">
                <?php for ($i = 0; $i < min(20, count($yelpData->businesses)); $i++) { ?>
                    <a class="place" href="<?= $yelpData->businesses[$i]->url ?>">
                        <div class="img-container">
                            <img src="<?= $yelpData->businesses[$i]->image_url ?>" alt="<?= $yelpData->businesses[$i]->name ?>"> 
                        </div>
                        <div class="content">
                            <div class="content-1">
                                <div class="name"><?= $yelpData->businesses[$i]->name ?>
                                    <span class="price"><?= $yelpData->businesses[$i]->price ?></span>
                                </div>
                                <ul class="categories">
                                    <?php foreach ($yelpData->businesses[$i]->categories as $category) : ?>
                                        <li class="category"><?= $category->title ?></li>
                                    <?php endforeach ?> 
                                </ul>
                                <div class="grades">
                                    <span class="rating"><?= $yelpData->businesses[$i]->rating ?> <img src="./svg/star.svg" class="star" alt=""></span>
                                    <span class="count contrast">[<?= $yelpData->businesses[$i]->review_count ?> reviews]</span>
                                </div>
                                <?php if($yelpData->businesses[$i]->is_closed) { ?>
                                    <div class="status"> <img src="./svg/clock.svg" alt=""> Currently Closed</div>
                                    <?php } else { ?>
                                        <div class="status"> <img src="./svg/clock.svg" alt=""> Currently Open</div>
                                <?php } ?>
                            </div>
                            <div class="content-2">
                                <ul class="address">
                                    <?php $j = 0; foreach ($yelpData->businesses[$i]->location->display_address as $addressPart) : $j++;?>
                                        <li class="addressPart address-<?= $j ?>"><?= $addressPart ?></li>
                                    <?php endforeach ?>
                                </ul>
                                <div class="phone"> <img src="./svg/phone.svg" alt=""> <span><?= $yelpData->businesses[$i]->display_phone ?></span> </div>
                            </div>
                            </ul>
                        </div>
                    </a>
                <?php } ?>
            </section>
        </section>
        <script src="./js/city.js"></script>
    </body>
</html>