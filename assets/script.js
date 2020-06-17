$(document).ready(function () {
  // var APIkey= "62bc91b04494ffcca055cb79a046bbf8d";
  var arrayOfCities= []

  $("#newSearch").on("click", function (event) {
    event.preventDefault();
    var searchCity = $("#searchCity").val();
    arrayOfCities.push(searchCity)
    // console.log(searchCity);
    localStorage.setItem("savedCity", JSON.stringify(arrayOfCities));
    var getCity = JSON.parse(localStorage.getItem("savedCity"));
    // console.log(getCity);
    getForecast(searchCity);

  });


  function getForecast(userCity) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      userCity +
      "&units=imperial&appid=6728f835388fdeed53f52d240faa84ef";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#pastSearchedCities").append(
          `<div class= 'card'>  <div class='card-body'> `+ userCity +` </div> </div>`)
          
    });
  }
});

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
