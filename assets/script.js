$(document).ready(function () {

  var arrayOfCities = [];

// click event to save searched city to local storage
  $("#newSearch").on("click", function (event) {
    event.preventDefault();
    var searchCity = $("#searchCity").val();
    arrayOfCities.push(searchCity);
    localStorage.setItem("savedCity", JSON.stringify(arrayOfCities));
    var getCity = JSON.parse(localStorage.getItem("savedCity"));
    console.log(getCity);
    getCurrentForecast(searchCity);
  });

// displaying local storage items on the page 
  var previousSearches = JSON.parse(Object.assign({}, window.localStorage).savedCity)
  console.log(previousSearches);
  for (let i = 0; i < previousSearches.length; i++) {
    console.log(previousSearches[i]);
    $("#pastSearchedCities").append(`<div class= 'card'>  <div class='card-body'> ` + previousSearches[i] +` </div> </div>`
    );
  }
// Getting the weather data for the city the user searched 
  function getCurrentForecast(userCity) {
    var forecastqueryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=6728f835388fdeed53f52d240faa84ef";
    $.ajax({
      url: forecastqueryURL,
      method: "GET",
    }).then(function (forecastResponse) {
      var cityName= forecastResponse.name;
      var temperature = forecastResponse.main.temp;
      var humidity = forecastResponse.main.humidity
      var windSpeed = forecastResponse.wind.speed;
// appending the data to the page 
      $("#cityNameText").text(cityName);
      $("#tempText").text("Temperature:"+ Math.round(temperature)+ String.fromCharCode(176)+ "F");
      $("#humidityText").text("Humidity:"+ humidity + "%");
      $("#windText").text("Wind Speed:" + windSpeed + "MPH");
    
    var longitudeEl = forecastResponse.coord.lon
    var latitudeEl = forecastResponse.coord.lat
    // console.log(longitudeEl);
    // console.log(latitudeEl);
      
      var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitudeEl + "&lon=" + longitudeEl + "&appid=6728f835388fdeed53f52d240faa84ef"
      $.ajax({
        url: UVqueryURL,
        method: "GET",
      }).then(function(UVresponse){
        console.log(UVresponse.value);
        var UVindex = UVresponse.value
        $("#UVtext").text("UV Index:" + UVindex);
//not sure why the color get's stuck going from red to green but not always green to red
      if(UVindex < 3){
        $("#UVtext").addClass("badge badge-success");
      }
      else if(UVindex > 7){
        $("#UVtext").addClass("badge badge-danger");
      }
      else{
        $("#UVtext").addClass("badge badge-warning")
      }
      })


      var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=6728f835388fdeed53f52d240faa84ef"
      $.ajax({
        url: fiveDayURL,
        method: "GET",
      }).then(function(fiveDayResponse){
        console.log(fiveDayResponse);
      })
     
    
    });
  }

});

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
