const apiKey = 'dfa6fb647be79d6bbf55d4a515fb8879';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('city-input').value}&appid=${apiKey}&units=imperial`;

document.getElementById('get-weather').addEventListener('click', async () => {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    updateDOM(data);
  } catch (err) {
    document.getElementById('weather-display').innerHTML = `<p>Error: ${err.message}</p>`;
  }
});

function updateDOM(data) {
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°F`;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
}
