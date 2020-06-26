
function takeDomElement(domElement) {
    return document.querySelector(domElement);
}

function fetchRequest(cityId) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=811b26bdde41b08213dc84b03e747002`)
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
        });
}

function cityNameInInput() {
    let city = takeDomElement('.find-city');
    let cityName = city.value.toLowerCase();

    for (const iterator of cityName) {
        if (iterator.match(/[a-z]/) == null) {
            console.log('no-latin')
            takeDomElement('.wrong-letters').classList.remove('hiden');
            takeDomElement('.find-city').oninput = setTimeout(function () { takeDomElement('.wrong-letters').classList.add('hiden') }, 5000);
        }
        break;
    }

    if (city.value.length < 3) {
        takeDomElement('.not-enough-letters').classList.remove('hiden');
        takeDomElement('.find-city').oninput = setTimeout(function () { takeDomElement('.not-enough-letters').classList.add('hiden') }, 5000);
    } else {
        fetchRequestToGetCityList(cityName);
        console.log(cityName);
    }

    city.value = '';
}

function fetchRequestToGetCityList(cityName) {
    fetch(`https://citiesfinder.herokuapp.com/${cityName}`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data.length)
            console.log(data)
            if (data.length > 1) {
                cityList(data);
            } else if (data.length == 0) {
                cityNotFound();
            } else {
                cityId = data[0].id
                fetchRequest(cityId);
            }
        })
        .catch(function () {
            // catch any errors
            console.log('error')
        });
}

function cityList(data) {
    let citySelectOption = '';
    data.forEach(element => {
        citySelectOption += `<li onclick = clickedItemInCityList('${element.id}')>${element.name} ${element.state} ${element.country} </li>`
    })
    takeDomElement('input.find-city').classList.add('hiden')
    takeDomElement('.select-city-wraper').classList.remove('hiden');
    takeDomElement('.select-city').innerHTML = `${citySelectOption}`;
}

function clickedItemInCityList(cityId) {
    fetchRequest(cityId);
    takeDomElement('.select-city-wraper').classList.add('hiden')
    takeDomElement('input.find-city').classList.remove('hiden')
}

function cityNotFound() {
    takeDomElement('.no-location').classList.remove('hiden');
    takeDomElement('.find-city').oninput = setTimeout(function () { takeDomElement('.no-location').classList.add('hiden') }, 5000);
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

takeDomElement('.find-city-btn').addEventListener('click', cityNameInInput);
takeDomElement('.find-city').addEventListener("keypress", event => { if (event.keyCode == 13) { cityNameInInput() } });

document.onload = fetchRequest('703448');
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
takeDomElement('#date').innerHTML = new Date().toLocaleDateString('en-US', options);
