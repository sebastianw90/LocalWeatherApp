var x = document.getElementById("weather-info");

window.open = getLocation();

var btnChangeTemp = document.getElementById("temp-unit-btn");

function getLocation() {
	if (!navigator.geolocation) {
		x.innerHTML = "Your browser doesn't support geolocation :(";
		return;
	}

	function getWeather() {
		var myRequest = new XMLHttpRequest();
		var reqAdress = "https://fcc-weather-api.glitch.me/api/current?lat=" + latRound + "&lon=" + lonRound;
		myRequest.open('GET', reqAdress);
		myRequest.onload = function() {
			var weatherData = JSON.parse(myRequest.responseText);
			var tempInfo = weatherData.main.temp + ' \u2103';
			function resultWriting() {
				x.innerHTML = weatherData.name + ", " + weatherData.sys.country + "<br>" + tempInfo + 
							"<br><img src=\"" + weatherData.weather[0].icon + "\" alt=\"weather icon\">"
							+ "<br>" + weatherData.weather[0].main;
			}
			resultWriting();
			btnChangeTemp.style.visibility = "visible";	
			btnChangeTemp.addEventListener('click', function() {
				if (btnChangeTemp.innerHTML == "Change temp to Fahrenheit") {
					btnChangeTemp.innerHTML = "Change temp to Celsius";
					tempInfo = (weatherData.main.temp * (9/5) + 32) + " F";
					resultWriting();
				} else {
					btnChangeTemp.innerHTML = "Change temp to Fahrenheit";
					tempInfo = weatherData.main.temp + ' \u2103';
					resultWriting();
				}
			});	
		};
		myRequest.send();
	}

	function success(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		latRound = Math.round(latitude * 10) / 10;
		lonRound = Math.round(longitude * 10) / 10;

		getWeather();
	}

	function error() {
		x.innerHTML = "Unable to get your location :(";
	}

	x.innerHTML = "Locating...";

	navigator.geolocation.watchPosition(success, error);
}