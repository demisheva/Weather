let cityList;
var request = new XMLHttpRequest();
request.open('GET', 'city.list.json');
request.responseType = 'json';
request.send();
request.onload = function () {
    cityList = request.response;
    return cityList
}

let cityId = 1703269;

document.querySelector('.find-city-btn').addEventListener('click', chosenCity);
document.querySelector('.find-city').addEventListener('keyup', chosenCity);

function chosenCity() {
    let city = document.querySelector('.find-city');
    cityList.forEach(element => {
        if (city.value.toLowerCase() == element.name.toLowerCase()) {
            cityId = element.id;
            console.log(cityId)
        }
    });
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