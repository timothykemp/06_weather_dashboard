$(document).ready(function () {

    // Moment variables
    var today = moment().format('L');
    var fiveDay1 = moment().add(1, 'days').format('L');
    var fiveDay2 = moment().add(2, 'days').format('L');
    var fiveDay3 = moment().add(3, 'days').format('L');
    var fiveDay4 = moment().add(4, 'days').format('L');
    var fiveDay5 = moment().add(5, 'days').format('L');

    // Initial array of cities with Kansas City as default
    var cities = ["Kansas City"];

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
            $("#city-list").prepend(cityName);
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
    $("#city-search").click(function (event) {
        event.preventDefault();

        // This line grabs the input from the text box
        var city = $("#city-text").val().trim();

        if (city === "") {
            return;
        }

        // Adding the city from the text box to our array
        cities.push(city);
        console.log(cities);



        // Calling storeCities and renderCities which handle the processing of our cities array
        storeCities();
        renderCities();
        buildToday();
        buildFiveDay1();
        buildFiveDay2();
        buildFiveDay3();
        buildFiveDay4();
        buildFiveDay5();
        clearForm();



    });

    // Reset placeholder text in form
    function clearForm() {
        $("#city-text").each(function () {
            $(this).val("");
            x = 1;
        });
        $("#city-text").first().focus();

    }

    function buildToday() {
        var lastCity = cities[cities.length - 1];

        $("#todayHeader").text(lastCity + " (" + today + ")");
        $("#todayTemp").text("Temperature: ");
        $("#todayHumid").text("Humidity: ");
        $("#todayWind").text("Wind Speed: ");
        $("#todayUV").text("UV Index: ");
    }

    function buildFiveDay1() {
        $("#day1Header").text(fiveDay1);
        $("#day1Icon").text("(...)");
        $("#day1Temp").text("Temp: ");
        $("#day1Humid").text("Humidity: ");
    }

    function buildFiveDay2() {
        $("#day2Header").text(fiveDay2);
        $("#day2Icon").text("(...)");
        $("#day2Temp").text("Temp: ");
        $("#day2Humid").text("Humidity: ");
    }

    function buildFiveDay3() {
        $("#day3Header").text(fiveDay3);
        $("#day3Icon").text("(...)");
        $("#day3Temp").text("Temp: ");
        $("#day3Humid").text("Humidity: ");
    }

    function buildFiveDay4() {
        $("#day4Header").text(fiveDay4);
        $("#day4Icon").text("(...)");
        $("#day4Temp").text("Temp: ");
        $("#day4Humid").text("Humidity: ");
    }

    function buildFiveDay5() {
        $("#day5Header").text(fiveDay5);
        $("#day5Icon").text("(...)");
        $("#day5Temp").text("Temp: ");
        $("#day5Humid").text("Humidity: ");
    }

    // Calling the renderCities function to display the initial cities
    renderCities();
    buildToday();
    buildFiveDay1();
    buildFiveDay2();
    buildFiveDay3();
    buildFiveDay4();
    buildFiveDay5();

});
