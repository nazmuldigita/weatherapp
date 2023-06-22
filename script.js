document.getElementById("weatherForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  const apiKey = "71511c52d5d148c75d2c54b5ecdfc294";
  const city = document.getElementById("cityInput").value;

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let temperature = data.main.temp;
      let humidity = data.main.humidity;
      let wind = data.wind.speed;
      let windDirection = data.wind.deg;
      let clouds = data.clouds.all;

      // Convert wind direction in degrees to a cardinal direction
      let cardinalDirection = getCardinalDirection(windDirection);

      let weatherInfo = `Temperature in ${city}: ${temperature}°C, Humidity: ${humidity}%, Wind: ${wind} m/s, Wind Direction: ${cardinalDirection}, Cloud: ${clouds}`;
      document.getElementById("temperature").textContent = weatherInfo;
    })
    .catch(error => {
      console.log("Error fetching weather data:", error);
    });

    // Function to convert wind direction in degrees to a cardinal direction
    function getCardinalDirection(degrees) {
      const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const index = Math.round(degrees / 45) % 8;
      return directions[index];
    }
});
