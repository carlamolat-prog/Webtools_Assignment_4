document.getElementById("submit").addEventListener("click", loadWeather);

async function loadWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city.");
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=imperial`
  );

  const data = await response.json();

  document.getElementById("city").textContent = data.name;
  document.getElementById("temp").textContent = `${data.main.temp}°F`;
  document.getElementById("conditions").textContent = data.weather[0].description;
}

