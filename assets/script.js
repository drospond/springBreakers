$(document).ready(function() {
    // console.log("hello world");
    
    // API keys
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
    var returnDate = $("#end-date");
    var destinationInputZom = "Atlanta";


   
    // var settingsTripAdvFlightAirportSearch = {
    //   async: true,
    //   crossDomain: true,
    //   url: "https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=" + destinationInput,
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    //     "x-rapidapi-key": tripAdvAPIKey
    //   }
    // }

    // var settingsTripAdvFlightCreateSession = {
    //   async: true,
    //   crossDomain: true,
    //   url: "https://tripadvisor1.p.rapidapi.com/flights/create-session?currency=USD&ta=1&tc=11%252C5&c=0&d1=CNX&o1=DMK&dd1=" + departDate,
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    //     "x-rapidapi-key": tripAdvAPIKey
    //   }
    // }

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
    // testAPI();
   
    //Data properties to pull from responses:
    //Zomato location ID: .location_suggestions[0].entity_id
    //TripAdvisor location ID: .data[0].result_object.location_id
    //TripAdvisor hotel:
      //Hotel Name: .data[i].name
      //Photo src: .data[i].photo.images.medium.url
      //Rating: .data[i].rating
      //Price Level format($$$): .data[i].price_level
      //Price: .data[i].price
      
    //Takes in destinationInput and passes the destination ID to a callback function which will be the getHotel info.  
    function getLocationIDTripAdvisor(destinationInput, maxBudgetInput, departDate, callback) {
      console.log(destinationInput);
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
      $.ajax(settingsTripAdvGetLocation_ID).then(function (response) {
        callback(maxBudgetInput, departDate, response.data[0].result_object.location_id);
      });
    }

    //Gets trip advisor hotel info. Pulls in parameters from getLocationIDTripAdvisor(). 
    //Currently console logs the response and some sample info. 
    //Price parameters are showing up in the url but don't change the response for some reason.
    function getHotelInfo(maxBudgetInput, departDate, destinationID){
      var queryURL = "https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&price-max=" + maxBudgetInput + "&subcategory=hotel&currency=USD&limit=30&checkin=" + departDate + "&order=asc&lang=en_US&sort=price&nights=1&location_id=" + destinationID + "&adults=1&rooms=1";
      var settingsTripAdvHotel = {
        async: true,
        crossDomain: true,
        url: queryURL,
        method: "GET",
        headers: {
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": tripAdvAPIKey
        }
      }
    // testing to make sure all calls work
      $.ajax(settingsTripAdvHotel).then(function (response) {
        console.log("tripadisor hotel: ");
        console.log(response);
        console.log(maxBudgetInput);
        console.log(departDate);
        console.log(queryURL);
        console.log("Hotel Name: " + response.data[0].name);
        console.log("Photo src: " + response.data[0].photo.images.medium.url);
        console.log("Rating: " + response.data[0].rating);
        console.log("Price Level format($$$): " + response.data[0].price_level);
        console.log("Price: " + response.data[0].price);
        console.log("link: " + response.data[0].hac_offers.offers[0].link)
        
        for(var i = 0; i < 5; i++){
          if(response.data[i].rating < 5){
            $("#Hotels_" +(i+1)).find(".title").text(response.data[i].name);
            $("#Hotels_" +(i+1)).find(".hotel-url").attr("href", response.data[i].hac_offers.offers.link);
            $("#Hotels_" +(i+1)).find(".hotel-price").text("Hotel price: " + response.data[i].price);
            $("#Hotels_" +(i+1)).find(".hotel-rating").text("Hotel rating: " + response.data[i].rating);
            
            $("#Hotels_" +(i+1)).find("img").attr("src", response.data[i].photo.images.medium.url);
          }
        }
      })
    }
        // JSON.stringify(response.data)
        // var pEl = $("<p>");
        // pEl.text(response.data[0].name);
        // $("#Hotels_").append(pEl);

        // var pEl1 = $("<p>");
        // pEl1.text(response.data[0].rating);
        // $("#Hotels_1").append(pEl1);

        // $("#Hotels_1").find("img").attr("src", response.data[0].photo.images.medium.url);


        // var pEl2 = $("<p>");
        // pEl2.text(response.data[0].price);
        // $("#Hotels_1").append(pEl2);
        
        // $("#Hotels_1").find("a").attr("href", response.data[0].hac_offers.offers[0].link);
        // var pEl3 = $("<a>");
        // // pEl3.text(href=) : ("response.data[0].hac_offers.offers[0].link");
        // pEl3.attr("href=", response.data[0].hac_offers.offers[0].link)
        // $("#Hotels_1").append(pEl3);


        // var pEl2 = $("<img>");
        // pEl2.append(response.data[0].photo.images.medium.url);
        // $("#image-1").photo(pEl2);
        

      
      // .done(function(data){
      //   $("#Hotels_1").append.
      // })
    

    //Gets the zomato city ID and passes it to the call back function which is getRestaurantInfo()
    function getLocationInfoZomato(destinationInput, callback){
      var zomatoURL = "https://developers.zomato.com/api/v2.1/locations?query=" + destinationInput + "&count=20"
      var settingsZomatoGETLocations = {
        async: true, 
        crossDomain: true,
        url: zomatoURL,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("user-key", "9f4de5189fa76ba5e2e854c84b47b2e3")
      },
        method: "GET",
      }
      $.ajax(settingsZomatoGETLocations).then(function(response) {
        callback(response.location_suggestions[0].entity_id);
      })
    }

    //Gets city info. The response includes top restaurants. 
    //Was thinking we can loop through that array and return anything with a price rating of 2 or lower to display in our results
    function getRestaurantInfo(cityID){
      var zomatoURL = "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + cityID + "&entity_type=city"
      var settingsZomatoLocationDetails = {
        async: true,
        crossDomain: true,
        url: zomatoURL,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("user-key", "9f4de5189fa76ba5e2e854c84b47b2e3")
        },
        method: "GET",
      }
      $.ajax(settingsZomatoLocationDetails).then(function (response) {
        console.log("Zomato Location Details: ");
        console.log(response);
        // $("#Food_1").append(JSON.stringify(response.data))
        
        // $("#Food_1").append(JSON.stringify(data))
        //Restaurant array: response.best_rated_restaurant
        //relevant info:
          //response.best_rated_restaurant[i].restaurant.name
          //response.best_rated_restaurant[i].restaurant.location.adress
          //response.best_rated_restaurant[i].restaurant.price_range (1-4, 4 being most expensive)
          //response.best_rated_restaurant[i].restaurant.menu_url
          //response.best_rated_restaurant[i].restaurant.cuisines (Food type)
          for(var i = 0; i < 5; i++){
            if(response.best_rated_restaurant[i].restaurant.price_range < 5){
              $("#Food_" +(i+1)).find(".title").text(response.best_rated_restaurant[i].restaurant.name);
              $("#Food_" +(i+1)).find(".restaurant-url").attr("href", response.best_rated_restaurant[i].restaurant.url);
              $("#Food_" +(i+1)).find(".cuisine-type").text("Cuisine type: " + response.best_rated_restaurant[i].restaurant.cuisines);
              $("#Food_" +(i+1)).find(".address").text("Address: " + response.best_rated_restaurant[i].restaurant.location.address);
              $("#Food_" +(i+1)).find(".menu").attr("href", response.best_rated_restaurant[i].restaurant.menu_url);
              $("#Food_" +(i+1)).find("img").attr("src", response.best_rated_restaurant[i].restaurant.featured_image);
            }
          }
        })
      }

    function search(event){
      event.preventDefault();
      var departDate = $("#start-date").val();
      var returnDate = $("#end-date");
      var destinationInput = $("#destination").val();
      var maxBudgetInput = $("#max-price").val();
      var startLocationInput = $("#your-city").val();
      getLocationIDTripAdvisor(destinationInput, maxBudgetInput, departDate, getHotelInfo);
      getLocationInfoZomato(destinationInput, getRestaurantInfo);
      // $("#Food_1").append(JSON.stringify(data))
      
    }
    
    
    $("#search").on("click", search)
    
    // $("#Food_1").append(JSON.stringify(data))
    

    
  });
  