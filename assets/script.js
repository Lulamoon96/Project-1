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

window.eqfeed_callback = function(groceryStores) {


}




//End of map stuff

// var queryURL = "https://api.edamam.com/search?q=lobster&app_id=ee9aaaa5&app_key=60bd104228a51c57d3cdbfc4e2822a63"



// $.ajax({

//     url: queryURL,
//     method: "GET"

// }).then(function(response) {

//     console.log(response)
//     $("#test").text(recipe)

// })

