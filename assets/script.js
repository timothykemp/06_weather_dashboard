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

            // Then dynamically generating <li> for each city in the array
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

        // If form is empty, return early
        if (city === "") {
            return;
        }

        // Adding the city from the text box to our array
        if (cities.indexOf(city) === -1) {
            cities.push(city);
        }


        // Calling storeCities and renderCities which handle the processing of our cities array
        storeCities();
        renderCities();
        buildWeatherData();
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



    function buildWeatherData() {
        var currentCity = cities[cities.length - 1];

        getCurrentDay();
        getFiveDay();

        function getCurrentDay() {
            // Here we are building the URL we need to query the database
            var baseURL = "https://api.openweathermap.org/data/2.5/weather?";
            var cityQueried = "q=" + currentCity;
            var APIKey = "&appid=f1cd94f0ec459b9c193af77b9024b593";
            var queryURL = baseURL + cityQueried + "&units=imperial" + APIKey;

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {

                    // Log the object
                    console.log(response);

                    // Convert temp to Fahrenheit
                    var longitude = (response.coord.lon);
                    var latitude = (response.coord.lat);

                    var tempF = response.main.temp;
                    var tempRoundF = tempF.toFixed(1);
                    var humid = response.main.humidity;
                    var wind = response.wind.speed.toFixed(1);

                    // Build weather icon for current day
                    var icon = $("<img>");
                    var iconCode = response.weather[0].icon;
                    var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";

                    icon.attr("src", iconURL)
                        .attr("alt", response.weather[0].description)
                        .attr("title", response.weather[0].description);

                    // Transfer content to HTML
                    $("#todayHeader").text(currentCity + " (" + today + ")")
                        .append(icon);
                    $("#todayTemp").text("Temperature: " + tempRoundF + " \xB0F");
                    $("#todayHumid").text("Humidity: " + humid + "\x25");
                    $("#todayWind").text("Wind Speed: " + wind + " mph");

                    getCurrentUV(longitude, latitude);

                })
        }

        function getCurrentUV(longitude, latitude) {
            // Here we are building the URL we need to query the database
            var long = longitude;
            var lat = latitude;

            var APIKey = "f1cd94f0ec459b9c193af77b9024b593";
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {

                    // Log the object
                    console.log(response);

                    var indexUV = (response.value);

                    $("#todayUV").text("UV Index: " + indexUV);

                })
        }

        function getFiveDay() {
            // Here we are building the URL we need to query the database
            var baseURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
            var cityQueried = currentCity;
            var APIKey = "f1cd94f0ec459b9c193af77b9024b593";
            var queryURL = baseURL + cityQueried + "&units=imperial" + "&appid=" + APIKey;

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {

                    // Log the object
                    console.log(response);

                    //Build Five Day 1
                    var tempFDay1 = (response.list[0].main.temp).toFixed(1);
                    var humidDay1 = (response.list[0].main.humidity);
                    var iconDay1 = response.list[0].weather[0].icon;
                    var iconDay1URL = "https://openweathermap.org/img/w/" + iconDay1 + ".png";

                    // Transfer content to HTML
                    $("#day1Header").text(fiveDay1);
                    $("#day1Icon").attr("src", iconDay1URL)
                        .attr("alt", response.list[0].weather[0].description)
                        .attr("title", response.list[0].weather[0].description);
                    $("#day1Temp").text("Temp: " + tempFDay1 + " \xB0F");
                    $("#day1Humid").text("Humidity: " + humidDay1 + "\x25");

                    //Build Five Day 2
                    var tempFDay2 = (response.list[1].main.temp).toFixed(1);
                    var humidDay2 = (response.list[1].main.humidity);
                    var iconDay2 = response.list[1].weather[0].icon;
                    var iconDay2URL = "https://openweathermap.org/img/w/" + iconDay2 + ".png";

                    // Transfer content to HTML
                    $("#day2Header").text(fiveDay2);
                    $("#day2Icon").attr("src", iconDay2URL)
                        .attr("alt", response.list[1].weather[0].description)
                        .attr("title", response.list[1].weather[0].description);
                    $("#day2Temp").text("Temp: " + tempFDay2 + " \xB0F");
                    $("#day2Humid").text("Humidity: " + humidDay2 + "\x25");

                    //Build Five Day 3
                    var tempFDay3 = (response.list[2].main.temp).toFixed(1);
                    var humidDay3 = (response.list[2].main.humidity);
                    var iconDay3 = response.list[2].weather[0].icon;
                    var iconDay3URL = "https://openweathermap.org/img/w/" + iconDay3 + ".png";

                    // Transfer content to HTML
                    $("#day3Header").text(fiveDay3);
                    $("#day3Icon").attr("src", iconDay3URL)
                        .attr("alt", response.list[2].weather[0].description)
                        .attr("title", response.list[2].weather[0].description);
                    $("#day3Temp").text("Temp: " + tempFDay3 + " \xB0F");
                    $("#day3Humid").text("Humidity: " + humidDay3 + "\x25");

                    //Build Five Day 4
                    var tempFDay4 = (response.list[3].main.temp).toFixed(1);
                    var humidDay4 = (response.list[3].main.humidity);
                    var iconDay4 = response.list[3].weather[0].icon;
                    var iconDay4URL = "https://openweathermap.org/img/w/" + iconDay4 + ".png";

                    // Transfer content to HTML
                    $("#day4Header").text(fiveDay4);
                    $("#day4Icon").attr("src", iconDay4URL)
                        .attr("alt", response.list[3].weather[0].description)
                        .attr("title", response.list[3].weather[0].description);
                    $("#day4Temp").text("Temp: " + tempFDay4 + " \xB0F");
                    $("#day4Humid").text("Humidity: " + humidDay4 + "\x25");

                    //Build Five Day 5
                    var tempFDay5 = (response.list[4].main.temp).toFixed(1);
                    var humidDay5 = (response.list[4].main.humidity);
                    var iconDay5 = response.list[4].weather[0].icon;
                    var iconDay5URL = "https://openweathermap.org/img/w/" + iconDay5 + ".png";

                    // Transfer content to HTML
                    $("#day5Header").text(fiveDay5);
                    $("#day5Icon").attr("src", iconDay5URL)
                        .attr("alt", response.list[4].weather[0].description)
                        .attr("title", response.list[4].weather[0].description);
                    $("#day5Temp").text("Temp: " + tempFDay5 + " \xB0F");
                    $("#day5Humid").text("Humidity: " + humidDay5 + "\x25");
                })
        }
    }



    // Calling the renderCities function to display the initial cities
    renderCities();
    buildWeatherData();

});
