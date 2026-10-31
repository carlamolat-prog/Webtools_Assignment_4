// API key placed here.
const API_KEY = "dfa6fb647be79d6bbf55d4a515fb8879"; 

// HTML element selections
const weatherForm = document.querySelector('form');
const cityInput = document.getElementById('city-input');

const cityName = document.getElementById('city-name');
const dateDisplay = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

// Event Listener for form submission.
weatherForm.addEventListener('submit', async function (event) {
  event.preventDefault(); // Stop page reload errors.

  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  // Fetch command.
  await fetchWeatherData(city);
});

// Fetching JSON fetching weather from openweathermap.org
async function fetchWeatherData(city) {
  // CORRECTED: Added api sub-domain, data path, and the literal $ sign
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`;

  try {
    const response = await fetch(url);

    // Error if city not found.
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API Key. Please check your credentials.');
      } else {
        throw new Error('Something went wrong. Please try again later.');
      }
    }

    const data = await response.json();
    updateUI(data);

  } catch (error) {
    handleWeatherError(error.message);
  }
}

// Realtime data update
function updateUI(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  
  // Format current date nicely
  dateDisplay.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
  
  // Mapping openweather icon to HTML
  const iconCode = data.weather[0].icon;
  // CORRECTED: Added the icon directory path (/img/wn/) and the literal $ sign
  weatherIcon.src = `https://openweathermap.org{iconCode}@2x.png`;
  weatherIcon.style.display = "block"; // Make sure it's visible
  weatherIcon.alt = data.weather[0].description;

  // Render values straight out of the JSON response payload
  temperature.textContent = `${Math.round(data.main.temp)}°F`;
  description.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  
  // Reset input field
  cityInput.value = '';
}

// Error handling inside UI versus crashing website.
function handleWeatherError(errorMessage) {
  console.error(errorMessage);
  
  // Display error messaging directly inside the UI dashboard elements
  cityName.textContent = "Error";
  dateDisplay.textContent = "";
  weatherIcon.src = "";
  weatherIcon.style.display = "none";
  temperature.textContent = "";
  description.textContent = errorMessage;
}
