$(document).ready(function() {
    // console.log("hello world");
    
    
    var zomatoKey = "9f4de5189fa76ba5e2e854c84b47b2e3";
    var tripAdvAPIKey = "6d1747e19cmshe3ce0496d913f19p141f76jsn0977925b3e6b"
    
    var hotelsURL = "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + cityLocationHT;
      var cityLocationHT = $("#locationD")

    
    var departDate = $("#start-date")
    var returnDate = $("#end-date")
    var destinationInput = $("#destination")
    var maxBudgetInput = $("#max-price")


    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://tripadvisor1.p.rapidapi.com/locations/auto-complete?lang=en_US&units=km&query=Orlando",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126"
      }
    }
    
    var settingsTripAdvHotel = {
      async: true,
      crossDomain: true,
      url: `https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&price-max=${maxBudgetInput}&subcategory=hotel&currency=USD&limit=30&checkin=${departDate}&order=asc&lang=en_US&sort=recommended&nights=1&location_id=${destination}&adults=1&rooms=1`,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvAPIKey
      }
    }
   
    var settingsTripAdvFlightAirportSearch = {
      "async": true,
      "crossDomain": true,
      "url": "https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=new%20york",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126"
      }
    }

    var settingsTripAdvFlightCreateSession = {
      "async": true,
      "crossDomain": true,
      "url": "https://tripadvisor1.p.rapidapi.com/flights/create-session?currency=USD&ta=1&tc=11%252C5&c=0&d1=CNX&o1=DMK&dd1=2020-01-08",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126"
      }
    }
    
  
    function testAPI() {
     

      $.ajax(settingsZomato).then(function(response) {
        console.log("Zomato response:");
        console.log(response);
      });
      $.ajax(settingsTripAdvHotel).then(function (response) {
        console.log(response);
      });
    }
    testAPI();
  });
  