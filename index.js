const apiKey = "dfa6fb647be79d6bbf55d4a515fb8879";

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  getWeather(city);
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);

    if (!response.ok) {
      showError("City not found. Please try again.");
      return;
    }

    const data = await response.json();
    displayWeather(data);
  } catch {
    showError("Network error. Please try again.");
  }
}

function displayWeather(data) {
  document.getElementById("error-message").classList.add("hidden");

  document.getElementById("city-name").textContent = data.name;
  document.getElementById("temp").textContent = `${data.main.temp}°F`;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("wind").textContent = `Wind: ${data.wind.speed} mph`;

  const icon = data.weather[0].icon;
  document.getElementById("weather-icon").src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  document.getElementById("weather-info").classList.remove("hidden");
}

function showError(msg) {
  const err = document.getElementById("error-message");
  err.textContent = msg;
  err.classList.remove("hidden");
  document.getElementById("weather-info").classList.add("hidden");
}
