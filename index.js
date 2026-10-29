const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('city-input').value}&appid=${API_KEY}&units=metric`;

document.getElementById('city-input').addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = document.getElementById('city-input').value;
  if (!city) return alert('Please enter a city name');

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();

    // Update DOM
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('date').textContent = new Date().toLocaleDateString();
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;

  } catch (err) {
    document.getElementById('weather-container').innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
});

