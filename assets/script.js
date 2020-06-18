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

      //  ajax call for the UV Index 

      var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitudeEl + "&lon=" + longitudeEl + "&appid=6728f835388fdeed53f52d240faa84ef"
      $.ajax({
        url: UVqueryURL,
        method: "GET",
      }).then(function(UVresponse){
        // console.log(UVresponse.value);
        var UVindex = UVresponse.value
        $("#UVtext").text("UV Index:" + UVindex);

        // changing the color of the UV index 
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

      // ajax call for the 5 day forecast 

      var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&units=imperial&appid=6728f835388fdeed53f52d240faa84ef"
      $.ajax({
        url: fiveDayURL,
        method: "GET",
      }).then(function(fiveDayResponse){      
        //day one card variables 
        var dayOneDate = fiveDayResponse.list[0].dt_txt;
        var dayOneTemp = fiveDayResponse.list[0].main.temp;
        var dayOneHumidity = fiveDayResponse.list[0].main.humidity;
        console.log(dayOneDate);
        console.log(dayOneTemp);
        console.log(dayOneHumidity); 
        $("#date1").text(dayOneDate);
        $("#temp1").text("Temp:" + Math.round(dayOneTemp)+ String.fromCharCode(176)+ "F");
        $("#hum1").text("Humidity:" + dayOneHumidity);

        //day two card variables 
        var dayTwoDate = fiveDayResponse.list[14].dt_txt;
        var dayTwoTemp = fiveDayResponse.list[14].main.temp;
        var dayTwoHumidity = fiveDayResponse.list[14].main.humidity;
        console.log(fiveDayResponse)
        console.log(dayTwoDate);
        console.log(dayTwoTemp);
        console.log(dayTwoHumidity); 
        $("#date2").text(dayTwoDate);
        $("#temp2").text("Temp:" + Math.round(dayTwoTemp)+ String.fromCharCode(176)+ "F");
        $("#hum2").text("Humidity:" + dayTwoHumidity);

        // day three card variables 
        var dayThreeDate = fiveDayResponse.list[22].dt_txt;
        var dayThreeTemp = fiveDayResponse.list[22].main.temp;
        var dayThreeHumidity = fiveDayResponse.list[22].main.humidity;
        console.log(fiveDayResponse)
        console.log(dayThreeDate);
        console.log(dayThreeTemp);
        console.log(dayThreeHumidity); 
        $("#date3").text(dayThreeDate);
        $("#temp3").text("Temp:" + Math.round(dayThreeTemp)+ String.fromCharCode(176)+ "F");
        $("#hum3").text("Humidity:" + dayThreeHumidity);

        // day four card variables 
        var dayFourDate = fiveDayResponse.list[30].dt_txt;
        var dayFourTemp = fiveDayResponse.list[30].main.temp;
        var dayFourHumidity = fiveDayResponse.list[30].main.humidity;
        console.log(fiveDayResponse)
        console.log(dayFourDate);
        console.log(dayFourTemp);
        console.log(dayFourHumidity); 
        $("#date4").text(dayFourDate);
        $("#temp4").text("Temp:" + Math.round(dayFourTemp)+ String.fromCharCode(176)+ "F");
        $("#hum4").text("Humidity:" + dayFourHumidity);

        // day five card variables 
        var dayFiveDate = fiveDayResponse.list[38].dt_txt;
        var dayFiveTemp = fiveDayResponse.list[38].main.temp;
        var dayFiveHumidity = fiveDayResponse.list[38].main.humidity;
        console.log(fiveDayResponse)
        console.log(dayFiveDate);
        console.log(dayFiveTemp);
        console.log(dayFiveHumidity); 
        $("#date5").text(dayFiveDate);
        $("#temp5").text("Temp:" + Math.round(dayFiveTemp)+ String.fromCharCode(176)+ "F");
        $("#hum5").text("Humidity:" + dayFiveHumidity);
      })
    });
  }
});

