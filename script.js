$(document).ready(function(){
    console.log("hello world")
    var apiKeyEventbrite = "CJNTVLROFG7S4LXZ46G2";
    var apiKeyHotels = "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126";
    var tokenFlights = "fe9a566d2984e0bfc2f4a6330188eaac";
    var apiKeyFlights = "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126"
    //https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=YOUR_API_KEY&redirect_uri=YOUR_REDIRECT_URI

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=new%20york",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": apiKeyHotels
        }
    }
    var payoutURL = "http://api.travelpayouts.com/v1/prices/cheap?origin=MOW&destination=HKT&depart_date=2017-11&return_date=2017-12&token=" + apiKeyFlights;
    var settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/?destination=LED&origin=MOW",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKeyFlights,
            "x-access-token": tokenFlights
        }
    }
    
    
    function testAPI(){

    var hotelURL = "https://hotels4.p.rapidapi.com" + apiKeyHotels; 
    $.ajax(settings).then(function(response) {
        console.log("hotel response:");
        console.log(response)
        
    })
    
    $.ajax(settings2).then(function (response) {
        console.log("flights response:");
        console.log(response);
    })
    $.ajax({
        url: "https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=YOUR_API_KEY&redirect_uri=YOUR_REDIRECT_URI",
        method: "GET"
    Just noticed that we are going to have to split up eventbrite url, if you look at it, it says it needs your api key and then the redirect uri.

    }).then(function(response){
        console.log(response)
    })
}
    testAPI();

});