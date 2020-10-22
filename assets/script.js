// Initial array of cities
var cities = [];

init();

// Function for displaying city data
function renderCities() {

    // Deleting the cities prior to adding new cities
    // (this is necessary otherwise you will have repeat cities)
    $("#city-list").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

        // Then dynamically generating buttons for each city in the array
        var cityName = $("<li>");
        // Adding a class of city to our button
        cityName.addClass("city list-group-item");
        // Adding a data-attribute
        cityName.attr("data-name", cities[i]);
        // Providing the initial button text
        cityName.text(cities[i]);
        // Adding the button to the buttons-view div
        $("#city-list").append(cityName);
    }
}

function init() {
    // Get stored cities from localStorage and parse JSON string to object
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities !== null) {
        cities = storedCities;
    }

    // Render cities to the DOM
    renderCities();
}

function storeCities() {
    // Stringify and set "cities" key in localStorage to cities array
    localStorage.setItem("cities", JSON.stringify(cities));
}

// This function handles events where one button is clicked
$("#city-search").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the text box
    var city = $("#city-text").val().trim();

    // Adding the city from the text box to our array
    cities.push(city);
    console.log(cities);

    // Calling storeCities and renderCities which handle the processing of our cities array
    storeCities();
    renderCities();
});

// Calling the renderCities function to display the initial cities
renderCities();
