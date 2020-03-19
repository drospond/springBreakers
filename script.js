$(document).ready(function() {
  console.log("hello world");
  
  var apiKeyHotels = "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126";
  var tokenFlights = "fe9a566d2984e0bfc2f4a6330188eaac";
  var apiKeyFlights = "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126";
  var zomatoKey = "9f4de5189fa76ba5e2e854c84b47b2e3"
  

  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=new%20york",
    method: "GET",
    headers: {
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
      "x-rapidapi-key": apiKeyHotels
    }
  };
  var payoutURL =
    "http://api.travelpayouts.com/v1/prices/cheap?origin=MOW&destination=HKT&depart_date=2017-11&return_date=2017-12&token=" +
    apiKeyFlights;
  var settings2 = {
    async: true,
    crossDomain: true,
    url:
      "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/?destination=LED&origin=MOW",
    method: "GET",
    headers: {
      "x-rapidapi-host":
        "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
      "x-rapidapi-key": apiKeyFlights,
      "x-access-token": tokenFlights
    }
  };
  var zomatoURL = "https://developers.zomato.com/api/v2.1/locations?query="
  var settingsZomato = {
    

  }


  function testAPI() {
    $.ajax(settings).then(function(response) {
      console.log("hotel response:");
      console.log(response);
    });

    $.ajax(settings2).then(function(response) {
      console.log("flights response:");
      console.log(response);
    });
  }
  testAPI();
});
