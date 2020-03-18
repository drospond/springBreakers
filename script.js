$(document).ready(function(){
    var apiKeyEventbrite = "CJNTVLROFG7S4LXZ46G2";
    var apiKeyHotels = "3c2c5f64b8msh8750e09015167e8p191250jsn71fd26617126";
    var apiKeyFlights = "fe9a566d2984e0bfc2f4a6330188eaac";

    //https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=YOUR_API_KEY&redirect_uri=YOUR_REDIRECT_URI
    
    function testAPI(){

    
    $.ajax({
        url: "hotels4.p.rapidapi.com",
        method: "GET"

    }).then(function(response) {
        console.log(response)
        
    })
    $.ajax({
        url: "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
        method: "GET"

    }).then(function(response){
        console.log(response)
    })
    $.ajax({
        url: "https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=YOUR_API_KEY&redirect_uri=YOUR_REDIRECT_URI",
        method: "GET"

    }).then(function(response){
        console.log
    })
}
    testAPI()
    console.log(testAPI)

});