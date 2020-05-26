
function takeDomElement(domElement) {
    return document.querySelector(domElement);
}

function fetchRequest(cityName) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=811b26bdde41b08213dc84b03e747002`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {

            console.log(data)
            takeDomElement('#town-state-country').textContent = `${data.name} ${data.sys.country}`;
            takeDomElement('#temperature-active').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            takeDomElement('#temperature-feels').innerHTML = Math.round(data.main.feels_like - 273) + '&deg;';
            takeDomElement('#temperature-max').innerHTML = Math.round(data.main.temp_max - 273) + '&deg;';
            takeDomElement('#temperature-min').innerHTML = Math.round(data.main.temp_min - 273) + '&deg;';

            takeDomElement('#humidity').textContent = data.main.humidity;
            takeDomElement('#pressure').textContent = data.main.pressure;
            takeDomElement('#wind').textContent = data.wind.speed;
            takeDomElement('#weather-discription').textContent = data.weather[0].description.toUpperCase();
            changingWeatherImage(data);
            changeBackgroungImage(data);

        })
        .catch(function () {
            // catch any errors
            console.log('error')
            cityNotFound();
        });
}
function findCity() {
    let city = takeDomElement('.find-city')
    fetchRequest(city.value.toLowerCase());
    city.value = ' '
}

function cityNotFound() {
    takeDomElement('.bubble-alert').classList.remove('hiden');
    takeDomElement('.find-city').oninput = setTimeout(function () { takeDomElement('.bubble-alert').classList.add('hiden') }, 5000);
}

function changingWeatherImage(data) {
    let id = data.weather[0].id;
    takeDomElement('.weather-image').setAttribute("class", "weather-image fas")
    if (id < 805 && id > 801) {
        takeDomElement('.weather-image').classList.add('fa-cloud');
    } else if (id == 801) {
        takeDomElement('.weather-image').classList.add('fa-cloud-sun');
    } else if (id == 800) {
        takeDomElement('.weather-image').classList.add('fa-sun');
    } else if (id < 800 && id >= 700) {
        takeDomElement('.weather-image').classList.add('fa-smog');
    } else if (id < 700 && id >= 600) {
        takeDomElement('.weather-image').classList.add('fa-snowflake');
    } else if (id < 600 && id >= 500) {
        takeDomElement('.weather-image').classList.add('fa-cloud-sun-rain');
    } else if (id < 400 && id >= 300) {
        takeDomElement('.weather-image').classList.add('fa-cloud-rain');
    } else if (id < 300 && id >= 200) {
        takeDomElement('.weather-image').classList.add('fa-poo-storm');
    } else {
        takeDomElement('.weather-image').classList.add('fa-umbrella');
    }

}

function changeBackgroungImage(data) {
    let icon = data.weather[0].icon;
    if (icon.search(/n/) != -1) {
        takeDomElement('.main-bg').style.backgroundImage = 'url(images/night.png)';
    }
    else {
        takeDomElement('.main-bg').style.backgroundImage = 'url(images/day.png)';

    }
}

takeDomElement('.find-city-btn').addEventListener('click', findCity);
takeDomElement('.find-city').addEventListener("keypress", event => { if (event.keyCode == 13) { findCity() } });

document.onload = fetchRequest('Kyiv');

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
takeDomElement('#date').innerHTML = new Date().toLocaleDateString('en-US', options);