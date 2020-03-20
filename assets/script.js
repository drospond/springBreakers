$(document).ready(function() {
    // console.log("hello world");
    
    
    var zomatoKey = "9f4de5189fa76ba5e2e854c84b47b2e3";
    var tripAdvAPIKey = "6d1747e19cmshe3ce0496d913f19p141f76jsn0977925b3e6b";
    
    var hotelsURL = "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + cityLocationHT;
    var cityLocationHT = $("#locationD");

    
    // var departDate = $("#start-date");
    // var returnDate = $("#end-date");
    // var destinationInput = $("#destination");
    // var maxBudgetInput = $("#max-price");

    var departDate = $("#start-date");
    var returnDate = $("#end-date");
    var destinationInput = $("#destination");
    var maxBudgetInput = $("#max-price");


    var settingsTripAdvGetLocation_ID = {
      async: true,
      crossDomain: true,
      url: "https://tripadvisor1.p.rapidapi.com/locations/auto-complete?lang=en_US&units=km&query=" + destinationInput,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvAPIKey
      }
    }

    var settingsTripAdvHotel = {
      async: true,
      crossDomain: true,
      url: "https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&price-max=" + maxBudgetInput + "&subcategory=hotel&currency=USD&limit=30&checkin=" + departDate + "&order=asc&lang=en_US&sort=recommended&nights=1&location_id=" + destinationInput + "&adults=1&rooms=1",
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvAPIKey
      }
    }
   
    var settingsTripAdvFlightAirportSearch = {
      async: true,
      crossDomain: true,
      url: "https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=" + destinationInput,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvAPIKey
      }
    }

    var settingsTripAdvFlightCreateSession = {
      async: true,
      crossDomain: true,
      url: "https://tripadvisor1.p.rapidapi.com/flights/create-session?currency=USD&ta=1&tc=11%252C5&c=0&d1=CNX&o1=DMK&dd1=" + departDate,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvAPIKey
      }
    }
    var settingsZomatoGETLocations = {
      async: true,
      crossDomain: true,
      url: "https://developers.zomato.com/api/v2.1/locations?query=" + destinationInput + "&count=20",
      method: "GET",
      header: {"user-key": zomatoKey}
    }
    
  
    function testAPI() {
      $.ajax(settingsTripAdvFlightAirportSearch).then(function (response) {
        console.log("Airport Search: ")
        console.log(response);
      });
      $.ajax(settingsTripAdvFlightCreateSession).then(function (response) {
        console.log("Create Session: ")
        console.log(response);
      });
      $.ajax(settingsTripAdvGetLocation_ID).then(function (response) {
        console.log("GET Location_ID: ")
        console.log(response);
      });

      // $.ajax(settingsZomato).then(function(response) {
      //   console.log("Zomato response:");
      //   console.log(response);
      // });
      $.ajax(settingsTripAdvHotel).then(function (response) {
        console.log(response);
      });
    }
    testAPI();
  });
  