
//*** GLOBALS ***//
var map;
var theLocation = new google.maps.LatLng(53.3452,-6.261);
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

$(document).ready(function(){
   
   //create the map   
   var myOptions = {
      center: theLocation,
	  zoom: 15,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   
   map = new google.maps.Map(document.getElementById("map"), myOptions); 	//open the map in the element with the stated id

  
   //******* Maker ********//
   //to add the maker to the map set it up then call setMap();
    var marker1 = new google.maps.Marker({
    position: theLocation,
    title:"The Place"
   });
    marker1.setMap(map);
	
	//****** Geodecoder *******//
	//use google maps to find out about the area
	//create goolge maps gecoder obj
	var geocode = new google.maps.Geocoder();
	
	geocode.geocode({ 'latLng' : theLocation }, function (results, status){
	   if(status = google.maps.GeocoderStatus.OK){
	      if(results[0]){
		     $('#local').html( results[4].formatted_address + "   ");
		  }else{
		     error('Google did not return results');
		  }
	   }else{
	   		 error('Reverse Geocoding faild due to: ' + status);
	   }
	 });
	 
	 //*** Set Up for Directions ****//
	 directionsDisplay = new google.maps.DirectionsRenderer();
	 directionsDisplay.setMap(map);
	 directionsDisplay.setPanel(document.getElementById("directionsPanel"));
   


    //***** Click Function ***//
   //handle the click
   $('#go').click(function(){
      //test for geolocation
	  if(navigator && navigator.geolocation){
	    //make requests for the user's position 
		navigator.geolocation.getCurrentPosition(geo_success, geo_error,{ enableHighAccuracy: true, timeout: 100000, maximumAge: 0 });
	  }else{
	     error('Geolocation is not supported');
	  }
	});
});

function geo_success(position){
  //getSecondLoc(position.coords.latitude, position.coords.longitude);
  calcRoute(position.coords.latitude, position.coords.longitude);
}

//**** Get Directions ****//
function calcRoute(latitude, longitude) {
  //var start = document.getElementById("start").value;
  //var end = document.getElementById("end").value;
  
  var yourLocation = new google.maps.LatLng(latitude,longitude);
  
  //request data
  var request = {
    origin:yourLocation,
    destination:theLocation,
    travelMode: google.maps.TravelMode.DRIVING
  };
  //get the route sent to the map and the directions to the stated panal 
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


///**** Error Handling *****//

function geo_error(err){
   if(err.code == 1){
      error('The user denied request for location info')
   }else if(err.code == 2){
      error(' your location info is unavailable ')
   }else if(err.code == 3){
      error('The request to get your location timed out')
   }else{
      error('An unknown error occured')
   } 
}

function error(msg){
   alert(msg);
}