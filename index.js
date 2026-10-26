async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=dfa6fb647be79d6bbf55d4a515fb8879&units=metric`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function displayWeather(data) {
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('date').textContent = new Date().toLocaleDateString();
  document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

document.getElementById('get-weather').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value;
  if (!city) return alert('Enter a city name');
  try {
    const data = await getWeather(city);
    displayWeather(data);
  } catch (err) {
    document.getElementById('weather-container').innerHTML = `<p>Error: ${err.message}</p>`;
  }
});

