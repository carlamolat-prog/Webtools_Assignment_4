const apiKey = "dfa6fb647be79d6bbf55d4a515fb8879";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  getWeather(city);
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById("weatherResult").innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Conditions: ${data.weather[0].description}</p>
      `;
    })
    .catch(err => {
      document.getElementById("weatherResult").innerHTML = "City not found.";
    });
}
