const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // <-- Stops the page from refreshing
    
    const city = document.getElementById('city-input').value;
    console.log("Searching for:", city);
    // Call your weather API function here
});
