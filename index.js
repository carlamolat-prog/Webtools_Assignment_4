const apiKey = "dfa6fb647be79d6bbf55d4a515fb8879";

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;

  fetch(`https://weather-maps.openweathermap.org//data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("weather-info").innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>${data.weather[0].description}</p>
      `;
    })
    .catch(() => {
      document.getElementById("weather-info").innerHTML = "City not found.";
    });
});
