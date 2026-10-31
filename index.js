// 1. Select all the HTML elements we need to interact with
const weatherForm = document.querySelector('form');
const cityInput = document.getElementById('city-input');

const cityName = document.getElementById('city-name');
const dateDisplay = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

// 2. Add an event listener to handle the form submission
weatherForm.addEventListener('submit', function (event) {
  // Prevent the default browser behavior (refreshing the page)
  event.preventDefault();

  // Get the value the user typed and trim any accidental spaces
  const city = cityInput.value.trim();

  if (city) {
    getWeatherData(city);
  } else {
    alert('Please enter a city name.');
  }
});
