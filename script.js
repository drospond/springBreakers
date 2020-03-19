$(document).ready(function() {
    // console.log("hello world");
    
    // var apiKeyHotels = "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126";
    // var tokenFlights = "fe9a566d2984e0bfc2f4a6330188eaac";
    // var apiKeyFlights = "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126";
    var zomatoKey = "9f4de5189fa76ba5e2e854c84b47b2e3";
    var tripAdvAPIKey = "6d1747e19cmshe3ce0496d913f19p141f76jsn0977925b3e6b"
    
    var hotelsURL = "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + cityLocationHT;
      var cityLocationHT = $("#locationD")

    // var settings = {
    //   async: true,
    //   crossDomain: true,
    //   url: hotelsURL,
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-host": "hotels4.p.rapidapi.com",
    //     "x-rapidapi-key": apiKeyHotels
    //   }
      

    // };
    var departDate = $("#start-date")
    var returnDate = $("#end-date")
    var destinationInput = $("#destination")
    var maxBudgetInput = $("#max-price")

    var settingsTripAdv = {
      async: true,
      crossDomain: true,
      url: `https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&price-max=${maxBudgetInput}&subcategory=hotel&currency=USD&limit=30&checkin=${departDate}&order=asc&lang=en_US&sort=recommended&nights=1&location_id=${destination}&adults=1&rooms=1`,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvAPIKey
      }
    }
    // var payoutURL =
    //   "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?depart_date="+ departDate +"&destination="+ destination +"&origin="+ origin +"&currency=USD&page=None" +
    //   apiKeyFlights;
    //   var departDate = "";
    //   var destination = "";
    //   var origin = "";
    // var settings2 = {
    //   async: true,
    //   crossDomain: true,
    //   url:payoutURL,
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-host":
    //       "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
    //     "x-rapidapi-key": apiKeyFlights,
    //     "x-access-token": tokenFlights
    //   }
    // };
    // var zomatoURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entity_id + "&entity_type=city&sort=rating"
    // var settingsZomato = {
    //   async : true,
    //   crossDomain : true,
    //   url: zomatoURL,
    //   method: "GET"
  
    // }
  
  
    function testAPI() {
      // $.ajax(settings).then(function(response) {
      //   console.log("hotel response:");
      //   console.log(response);
      // });
  
      // $.ajax(settings2).then(function(response) {
      //   console.log("flights response:");
      //   console.log(response);
      // });  

      // $.ajax(settingsZomato).then(function(response) {
      //   console.log("Zomato response:");
      //   console.log(response);
      // });
      $.ajax(settingsTripAdv).then(function (response) {
        console.log(response);
      });
    }
    testAPI();
  });
  