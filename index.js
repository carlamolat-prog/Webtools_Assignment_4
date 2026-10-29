async function getWeather(city) {
  const apiKey = "dfa6fb647be79d6bbf55d4a515fb8879";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    updateDOM(data);
  } catch (err) {
    displayError(err.message);
  }
}

function updateDOM(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temperature").textContent = `Temp: ${data.main.temp}°F`;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

  document.getElementById("error").textContent = "";
}

function displayError(message) {
  document.getElementById("error").textContent = `Error: ${message}`;
}
