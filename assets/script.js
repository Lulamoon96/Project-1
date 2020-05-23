//Map stuff

var map, infoWindow
// var groceryStoreURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=grocery&locationbias=ipbias&key=AIzaSyAtpAHtUyXE6OWQuoBWv9g3KZqCMQ5Io4w"
// var groceryStores = []

$("#locate").click(function(){

  // $.ajax({

  //   url: groceryStoreURL,
  //   method: "GET"

  // }).then(function(response) {

  //   for (var i = 0; i < 10; i++){

  //     groceryStores.push(response.results[i])

  //   }

  //   for (var i = 0; i < groceryStores.length; i++) {

  //     var coords = groceryStores[i].geometry.location
  //     marker = new google.maps.Marker({
  //       position: coords,
  //       map: map
  //     })

  //   }


  // })

  navigator.geolocation.getCurrentPosition(function(position){

    coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    
    var service = new google.maps.places.PlacesService(map)
    var request = {
      location: coords,
      radius: '500',
      query: 'grocery',
      type: 'store'
    }

    service.textSearch(request, function(results, status) {

      console.log(results)
      if (status === google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {

          createMarker(results[i]);

        }

        map.setCenter(results[0].geometry.location)

      }
  
    })

  })

})

function createMarker(place) {

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });

}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos)
      infoWindow.setContent('Location found.')
      infoWindow.open(map)
      map.setCenter(pos)
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter())
    })
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter())
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//End of map stuff


$(".searchRecipes").click(function(){

    var meal = $(this).attr("meal")
    var food = $("#" + meal + "Input").val()
    var queryURL = "https://api.edamam.com/search?q=" + food + "&to=5&app_id=ee9aaaa5&app_key=60bd104228a51c57d3cdbfc4e2822a63"

    $.ajax({

        url: queryURL,
        method: "GET"

    }).then(function(response) {

        recipes = response.hits
        currList = $("#" + meal + "ReciList") 
        recipes.forEach(element => {

          currList.append('<li image="' + element.recipe.image + '" meal="' + meal + '"><h3 data="label"><b>' + element.recipe.label + ' </b></h3><h4 data="source">' + element.recipe.source + ' </h4><h4 data="calories">' + element.recipe.calories.toFixed(2) + ' calories</h4><h5 data="link"><a href="' + element.recipe.url + '">Link</a></h5><br></li>')
          
        })

    })

})


$(".modal").on("click", "li", function(){

    $('.modal').modal('hide')

    var meal = $(this).attr("meal")
    var label = $(this).find('[data="label"]').text()
    var source = $(this).find('[data="source"]').text()
    var calories = $(this).find('[data="calories"]').text()
    var link = strip_html_tags($(this).find('[data="link"]').text())
    var image = $(this).attr("image")

    $("#" + meal + "Image").attr("src", image)
    $("#" + meal + "Recipe").html("<h3><a href='" + link + "'>" + label + "</a></h3>")
    $("#" + meal + "Source").html("<h3>" + source + "</h3>")
    $("#" + meal + "Calories").html("<h3>" + calories + "</h3>")
    calorieCount()

})


var calories = 0

function calorieCount(){


  if ($("#breakfastCalories").text()) {

    calories = calories + parseInt($("#breakfastCalories").text())

  }
  
  
  if ($("#lunchCalories").text()) {
    
    calories = calories + parseInt($("#lunchCalories").text())
    
  }
  
  if ($("#dinnerCalories").text()) {

    calories = calories + parseInt($("#dinnerCalories").text())

  }

  console.log(calories)
  $("#calorieCount").text(calories)
  
}

function strip_html_tags(str){

   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');

}