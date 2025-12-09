// Event Listener to get location input of user
document.getElementById("location-input").addEventListener('change', async () => {
    //get the user entered location
    const location = document.getElementById("location-input").value;
    
    //fetch the weather data
    const weatherData = await getWeatherData(location);

    //display the weather data on page
    displayWeatherData(weatherData);
});

const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }

    const apiKey = '5fc6f0fd9ab8f84c3a419c53b14c067f';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();

    return data;
}

function getBackgroundColor(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    } else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weatherData");

    if (Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Please enter location to see the weather."
    } else {
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
        <h3>${data.name}</h3>
       <p>Temperature: ${Math.floor(data.main.temp - 273.15)}C°</p>
       <p>Humidity: ${data.main.humidity}</p>
       <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
}

window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}