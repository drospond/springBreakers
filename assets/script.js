$(document).ready(function () {
  // API keys
  var zomatoKey = "9f4de5189fa76ba5e2e854c84b47b2e3";
  var tripAdvAPIKey = "6d1747e19cmshe3ce0496d913f19p141f76jsn0977925b3e6b";

  function showResults() {
    $("#results-container").removeAttr("hidden");
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#results-container").offset().top,
      },
      500
    );
  }

  //Takes in destinationInput and passes the destination ID to a callback function which will be the getHotel info.
  function getLocationIDTripAdvisor(
    destinationInput,
    maxBudgetInput,
    departDate,
    callback
  ) {
    console.log(destinationInput);
    var settingsTripAdvGetLocation_ID = {
      async: true,
      crossDomain: true,
      url:
        "https://tripadvisor1.p.rapidapi.com/locations/auto-complete?lang=en_US&units=km&query=" +
        destinationInput,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvAPIKey,
      },
    };
    $.ajax(settingsTripAdvGetLocation_ID).then(function (response) {
      callback(
        maxBudgetInput,
        departDate,
        response.data[0].result_object.location_id
      );
    });
  }

  //Gets trip advisor hotel info. Pulls in parameters from getLocationIDTripAdvisor().
  //Price parameters are showing up in the url but don't change the response for some reason.
  function getHotelInfo(maxBudgetInput, departDate, destinationID) {
    var queryURL =
      "https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&price-max=" +
      maxBudgetInput +
      "&subcategory=hotel&currency=USD&limit=30&checkin=" +
      departDate +
      "&order=asc&lang=en_US&sort=price&nights=1&location_id=" +
      destinationID +
      "&adults=1&rooms=1";
    var settingsTripAdvHotel = {
      async: true,
      crossDomain: true,
      url: queryURL,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvAPIKey,
      },
    };
    $.ajax(settingsTripAdvHotel).then(function (response) {
      for (var i = 0; i < 5; i++) {
        if (response.data[i].rating < 5) {
          const hotelCard = $("<div>").addClass("card");
          const cardImage = $("<div>").addClass("card-image");
          const figure = $("<figure>").addClass("image is-4by3");
          const hotelImage = $("<img>")
            .attr("alt", "Hotel")
            .attr("src", response.data[i].photo.images.medium.url);
          const cardContent = $("<div>").addClass("card-content");
          const mediaContent = $("<div>").addClass("media-content");
          const hotelName = $("<p>")
            .addClass("title is-4")
            .text(response.data[i].name);
          const hotelRating = $("<p>").text(
            "Hotel rating: " + response.data[i].rating
          );
          const hotelPrice = $("<p>").text(
            "Hotel price: " + response.data[i].price
          );
          const dealLink = $("<a>")
            .text("View Deal!")
            .attr("href", response.data[i].hac_offers.offers[0].link);

          hotelCard.append(cardImage).append(cardContent);
          cardImage.append(figure);
          figure.append(hotelImage);
          cardContent.append(mediaContent);
          mediaContent
            .append(hotelName)
            .append(hotelRating)
            .append(hotelPrice)
            .append(dealLink);
          $("#hotel-results").append(hotelCard);
        }
      }
      showResults();
    });
  }

  //Gets the zomato city ID and passes it to the call back function which is getRestaurantInfo()
  function getLocationInfoZomato(destinationInput, callback) {
    var zomatoURL =
      "https://developers.zomato.com/api/v2.1/locations?query=" +
      destinationInput +
      "&count=20";
    var settingsZomatoGETLocations = {
      async: true,
      crossDomain: true,
      url: zomatoURL,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("user-key", "9f4de5189fa76ba5e2e854c84b47b2e3");
      },
      method: "GET",
    };
    $.ajax(settingsZomatoGETLocations).then(function (response) {
      callback(response.location_suggestions[0].entity_id);
    });
  }

  //Gets city info. The response includes top restaurants.
  //Was thinking we can loop through that array and return anything with a price rating of 2 or lower to display in our results
  function getRestaurantInfo(cityID) {
    var zomatoURL =
      "https://developers.zomato.com/api/v2.1/location_details?entity_id=" +
      cityID +
      "&entity_type=city";
    var settingsZomatoLocationDetails = {
      async: true,
      crossDomain: true,
      url: zomatoURL,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("user-key", "9f4de5189fa76ba5e2e854c84b47b2e3");
      },
      method: "GET",
    };
    $.ajax(settingsZomatoLocationDetails).then(function (response) {
      for (var i = 0; i < 5; i++) {
        //Conditional set above possible range for time being
        if (response.best_rated_restaurant[i].restaurant.price_range < 5) {
          const restaurantCard = $("<div>").addClass("card");
          const cardImage = $("<div>").addClass("card-image");
          const figure = $("<figure>").addClass("image is-4by3");
          const restaurantImage = $("<img>")
            .attr("alt", "Restaurant")
            .attr(
              "src",
              response.best_rated_restaurant[i].restaurant.featured_image
            );
          const cardContent = $("<div>").addClass("card-content");
          const mediaContent = $("<div>").addClass("media-content");
          const restaurantName = $("<a>")
            .attr("href", response.best_rated_restaurant[i].restaurant.url)
            .append(
              `<p class="title is-4">${response.best_rated_restaurant[i].restaurant.name}</p>`
            );
          const cuisineType = $("<p>").text(
            "Cuisine Type: " +
              response.best_rated_restaurant[i].restaurant.cuisines
          );
          const address = $("<p>").text(
            response.best_rated_restaurant[i].restaurant.location.address
          );
          const menuLink = $("<a>")
            .text("Menu")
            .attr(
              "href",
              response.best_rated_restaurant[i].restaurant.menu_url
            );

          restaurantCard.append(cardImage).append(cardContent);
          cardImage.append(figure);
          figure.append(restaurantImage);
          cardContent.append(mediaContent);
          mediaContent
            .append(restaurantName)
            .append(cuisineType)
            .append(address)
            .append(menuLink);
          $("#restaurant-results").append(restaurantCard);
        }
      }
    });
  }

  function search(event) {
    event.preventDefault();
    var departDate = $("#start-date").val();
    var returnDate = $("#end-date");
    var destinationInput = $("#destination").val();
    var maxBudgetInput = $("#max-price").val();
    var startLocationInput = $("#your-city").val();
    $("#hotel-results").empty();
    $("#restaurant-results").empty();
    getLocationIDTripAdvisor(
      destinationInput,
      maxBudgetInput,
      departDate,
      getHotelInfo
    );
    getLocationInfoZomato(destinationInput, getRestaurantInfo);
  }

  $("#search").on("click", search);

  $(".navbar-brands").on("click", function () {
    $('.animation-container').empty();
    $('.animation-container').append(
      '<div class="sun"></div><div class="sun-beam beam1"></div><div class="sun-beam beam2"></div><div class="sun-beam beam3"></div><div class="sun-beam beam4"></div><div class="sun-beam beam5"></div>'
    );
  });
});
