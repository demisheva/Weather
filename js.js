
// take all list of cities from json
let cityList;
var request = new XMLHttpRequest();
request.open('GET', 'city.list.json');
request.responseType = 'json';
request.send();
request.onload = function () {
    cityList = request.response;
    return cityList
}

function takeDomElement(domElement) {
    return document.querySelector(domElement);
}

let cityId = 1703269;
function fechRequest() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=811b26bdde41b08213dc84b03e747002`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            // console.log(data)
            document.querySelector('#town').textContent = data.name;
            document.querySelector('#temperature-active').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('#temperature-feels').innerHTML = Math.round(data.main.feels_like - 273) + '&deg;';
            document.querySelector('#temperature-max').innerHTML = Math.round(data.main.temp_max - 273) + '&deg;';
            document.querySelector('#temperature-min').innerHTML = Math.round(data.main.temp_min - 273) + '&deg;';

            document.querySelector('#humidity').textContent = data.main.humidity;
            document.querySelector('#pressure').textContent = data.main.pressure;
            document.querySelector('#wind').textContent = data.wind.speed;
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
        takeDomElement('.find-city-wraper').innerHTML = `<input type="text" class="find-city red" placeholder="Can't find such town">`
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

    takeDomElement('.find-city-wraper').innerHTML = `<select class="find-city" autofocus><option disabled selected>Chose the city from list</option>${citySelectOption}</select>`;
    takeDomElement('select').onchange = function () {
        cityId = takeDomElement('select').options[this.selectedIndex].value;
        fechRequest();
        takeDomElement('.find-city-wraper').innerHTML = `<input type="text" class="find-city" placeholder="Search location ">`
    }
}



takeDomElement('.find-city-btn').addEventListener('click', choseCity);
takeDomElement('.find-city').addEventListener("keyup", event => { if (event.keyCode == 13) { choseCity() } });

document.onload = fechRequest();