$(document).ready(function () {
  // We use the navigator  to find the co ordinates of the user from their browser and pass them as arguments to the function getWeather
  var geo = navigator.geolocation;
  if (geo) {
    geo.getCurrentPosition(function (position) {
      var lat = position.coords.latitude.toString();
      var long = position.coords.longitude.toString();
      console.log("The lat and long are:" + lat + " " + long);
      getWeather(lat, long);
    },
      function (error) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      });
  }

  $('#searchbtn').on('click', function () {
    console.log("The searchbtn is clicked ");
    console.log("The entered location is:" + $('#searchbox').val());


    // $.getJSON('http://api.geonames.org/timezoneJSON?lat=' + a + '&lng=' + b + '&username=lalith539', function (timezone) {
    //   var rawTimeZone = JSON.stringify(timezone);
    //   var parsedTimeZone = JSON.parse(rawTimeZone);
    //   var dateTime = parsedTimeZone.time;
    //   timeFull = dateTime.substr(11);
    //   $("#time").html(timeFull); //Update local time
    //   timeHour = dateTime.substr(-5, 2);
    // });

    var geocoder = new google.maps.Geocoder();
    var address = $('#searchbox').val();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        // do something with the geocoded result
        //
        console.log("retrieved lat and long are:" + results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        var lat = results[0].geometry.location.lat();
        var long = results[0].geometry.location.lng();
        $("#image").empty();
        getWeather(lat, long);
      }
    });
  })
});

function getWeather(a, b) {
  var flag = 0;
  var fahr, centi, description, longdescription;

  //TODO: Hide Key?
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + a + '&lon=' + b + '&units=metric&appid=aa3f245973b19d01d0ff9e5e434b6d6c', function (json) {
    // console.log("json is:" + JSON.stringify(json));
    console.log("The temperature in centi is:" + json.main.temp);
    centi = json.main.temp;
    fahr = (centi + 32) * 9 / 5;
    console.log("fahr is:" + fahr);
    description = json.weather[0].main;
    longdescription = json.weather[0].description;
    console.log("longdescription is:" + longdescription);
    console.log("description is: " + description);
    //$("#change").html("sdf");
    $("#change").html(centi + " C");
    $('#message').html(longdescription);
    if (description == "Clear") {
      $("#image").append('</br> <img class="pic" src="icons/weather_sunset.svg" > </img>');
    }

    else if (description == "Clouds") {
      $("#image").append('</br> <img class="pic" src="icons/cloud.png" > </img>');
    }
    else if (description == "Drizzle") {
      $("#image").append('</br> <img class="pic" src="icons/drop.png" > </img>');
    }
    else if (description == "Rain") {
      $("#image").append('</br> <img class="pic" src="icons/umbrella.png" > </img>');
    }
    else {
      $("#image").append('</br> <img class="pic" src="icons/thunderstorm.png" > </img>');
    }
  });

  $('#change').on('click', function () {

    console.log("change button is clicked");

    if (flag == 0) {
      $("#change").html(fahr + "F");

      flag = 1;
    }
    else {
      $("#change").html(centi + "C");
      console.log("Inside the onClick centi=" + centi);
      // $('.message').html(centi);

      flag = 0;
    }



  });

}










