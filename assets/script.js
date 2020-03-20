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

    //hardcoded parameters
    //delete once search function is finished
    var departDate = "2020-04-24";
    var returnDate = $("#end-date");
    var destinationInput = "293919";
    var destinationInputZom = "Atlanta";
    var maxBudgetInput = "500";

    // Need destination ID


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
    var zomatoURL = "https://developers.zomato.com/api/v2.1/locations?query=Boston&count=20"
    var settingsZomatoGETLocations = {
      async: true,
      crossDomain: true,
      // url: "https://developers.zomato.com/api/v2.1/locations?query=" + destinationInputZom + "&count=20",
      url: zomatoURL,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("user-key", "9f4de5189fa76ba5e2e854c84b47b2e3")
      },
      method: "GET",
    }
    
    var zomatoURL2 = "https://developers.zomato.com/api/v2.1/location_details?entity_id=36932&entity_type=group"
    var settingsZomatoLocationDetails = {
      async: true,
      crossDomain: true,
      // url: "https://developers.zomato.com/api/v2.1/locations?query=" + destinationInputZom + "&count=20",
      url: zomatoURL2,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("user-key", "9f4de5189fa76ba5e2e854c84b47b2e3")
      },
      method: "GET",
    }

    function testAPI() {
      $.ajax(settingsTripAdvFlightAirportSearch).then(function (response) {
        console.log("Airport Search: ");
        console.log(response);
      });
      $.ajax(settingsTripAdvFlightCreateSession).then(function (response) {
        console.log("Create Session: ");
        console.log(response);
      });
      $.ajax(settingsTripAdvGetLocation_ID).then(function (response) {
        console.log("GET Location_ID: ");
        console.log(response);
      });

      $.ajax(settingsZomatoGETLocations).then(function(response) {
        console.log("Zomato response:");
        console.log(response);
      });
      $.ajax(settingsTripAdvHotel).then(function (response) {
        console.log("tripadisor hotel: ");
        console.log(response);
      });
      $.ajax(settingsZomatoLocationDetails).then(function (response) {
        console.log("Location Details: ");
        console.log(response);
      });
      
    }
    testAPI();
    
    function search(event){
      event.preventDefault();
      var departDate = $("#start-date").val();
      var returnDate = $("#end-date");
      var destinationInput = $("#destination").val();
      var maxBudgetInput = $("#max-price").val();
      var startLocationInput = $("#your-city").val();
    }

    $("#search").on("click", search);

    //Data properties to pull from responses:
    //Zomato location ID: .location_suggestions[0].entity_id
    //TripAdvisor location ID: .data[0].result_object.location_id
    //TripAdvisor hotel: .data[i] for each hotel
      //Hotel Name: .data[i].name
      //Photo: .data[]
      
    function getLocationID(settingsTripAdvGetLocation_ID) {
      var destinationID = $(".data[0].result_object.location_id"),
      
      
      




    }
    














  });
  