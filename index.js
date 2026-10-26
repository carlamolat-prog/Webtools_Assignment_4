const apiKey = 'dfa6fb647be79d6bbf55d4a515fb8879';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('city-input').value}&appid=${apiKey}&units=metric`;

document.getElementById('search-btn').addEventListener('click', async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();

    document.getElementById('city-name').textContent = data.name;
    document.getElementById('date').textContent = new Date().toLocaleDateString();
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  } catch (error) {
    document.getElementById('weather-card').innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
});

