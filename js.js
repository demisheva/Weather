
// take all cities list from json
let cityList;
var request = new XMLHttpRequest();
request.open('GET', 'city.list.json');
request.responseType = 'json';
request.send();
request.onload = function () {
    cityList = request.response;
    return cityList
}

let cityId = 703448;

function takeDomElement(domElement) {
    return document.querySelector(domElement);
}

function fechRequest() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=811b26bdde41b08213dc84b03e747002`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data)
            document.querySelector('#town-state-country').textContent = `${data.name} ${data.sys.country}`;
            document.querySelector('#temperature-active').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('#temperature-feels').innerHTML = Math.round(data.main.feels_like - 273) + '&deg;';
            document.querySelector('#temperature-max').innerHTML = Math.round(data.main.temp_max - 273) + '&deg;';
            document.querySelector('#temperature-min').innerHTML = Math.round(data.main.temp_min - 273) + '&deg;';

            document.querySelector('#humidity').textContent = data.main.humidity;
            document.querySelector('#pressure').textContent = data.main.pressure;
            document.querySelector('#wind').textContent = data.wind.speed;
            document.querySelector('#weather-discription').textContent = data.weather[0].description.toUpperCase();
            // document.querySelector('#weather-image').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        })
        .catch(function () {
            // catch any errors
        });
}

function choseCity() {
    let city = takeDomElement('.find-city');
    let cityArray = [];
    cityList.forEach(element => {
        if (city.value.toLowerCase() == element.name.toLowerCase()) {
            cityArray.push(element);
        }
    });

    if (cityArray.length > 1) {
        cityListSelect(cityArray);
    } else if (cityArray.length == 0) {
        takeDomElement('.bubble-alert').classList.remove('hiden');
        takeDomElement('.find-city').oninput = setTimeout(function () { takeDomElement('.bubble-alert').classList.add('hiden') }, 5000);
    } else {
        cityId = cityArray[0].id
    }
    fechRequest();
    city.value = '';
};

function cityListSelect(cityArray) {
    let citySelectOption = '';
    cityArray.forEach(element => {
        citySelectOption += `<option value= '${element.id}'>${element.name} ${element.state} ${element.country} </option>`
    })
    takeDomElement('input.find-city').classList.add('hiden')
    takeDomElement('select.select-city').classList.remove('hiden');
    takeDomElement('select.select-city').innerHTML = `<option disabled selected>Please, select the exact location from the list:</option>${citySelectOption}`;
    takeDomElement('select.select-city').onchange = function () {
        cityId = takeDomElement('select.select-city').options[this.selectedIndex].value;
        fechRequest();
        takeDomElement('select.select-city').classList.add('hiden')
        takeDomElement('input.find-city').classList.remove('hiden')
    }
}

takeDomElement('.find-city-btn').addEventListener('click', choseCity);
takeDomElement('.find-city').addEventListener("keypress", event => { if (event.keyCode == 13) { choseCity() } });

document.onload = fechRequest();

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
takeDomElement('#date').innerHTML = new Date().toLocaleDateString('en-US', options);

// data.weather[0].description
// <i class="fas fa-cloud-rain"></i>
// <i class="fas fa-wind"></i>
// <i class="fas fa-cloud"></i>
// <i class="fas fa-cloud-sun"></i>
// <i class="fas fa-cloud-showers-heavy"></i>
// <i class="fas fa-cloud-rain"></i>
// <i class="fas fa-sun"></i>
// <i class="far fa-snowflake"></i>