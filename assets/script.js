$(document).ready(function () {
  // var APIkey= "62bc91b04494ffcca055cb79a046bbf8d";
  var arrayOfCities = [];

  $("#newSearch").on("click", function (event) {
    event.preventDefault();
    var searchCity = $("#searchCity").val();
    arrayOfCities.push(searchCity);
    // console.log(searchCity);
    localStorage.setItem("savedCity", JSON.stringify(arrayOfCities));
    var getCity = JSON.parse(localStorage.getItem("savedCity"));
    // console.log(getCity);
    getCurrentForecast(searchCity);
  });

  function getCurrentForecast(userCity) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      userCity +
      "&units=imperial&appid=6728f835388fdeed53f52d240faa84ef";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(response.name);
      console.log(response.main.temp);
      console.log(response.main.humidity);
      console.log(response.wind.speed);
      //   console.log(response.weather.0.icon)
      console.log();
    //   $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".cityName").append("<h1>" + response.name + " Weather Details</h1>")
      $("#pastSearchedCities").append(
        `<div class= 'card'>  <div class='card-body'> ` + userCity +` </div> </div>`
      );
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

// In class activity code

/* <script type="text/javascript">
$(document).ready(function () {
  $("#new-search").on("click", function () {
    var searchTerm = $("#search-term").val();
    console.log(searchTerm);
    var queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=QuGZkvsKagwpqRQFv5NFKOLa7BLWbAQR&q=" +
      searchTerm;
​
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $("#articles").empty();
      for (var i = 0; i < 5; i++) {
        // console.log(response.response.docs[i]);
        var headline = response.response.docs[i].headline.main;
        console.log(headline);
        var byline = response.response.docs[i].byline.original;
​
        if (byline === null) {
          byline = "By New York Times";
        }
        console.log(byline);
​
        $("#articles").append($("<h1>" + headline + "</h1>"));
        $("#articles").append($("<h3>" + byline + "</h3>")); */
