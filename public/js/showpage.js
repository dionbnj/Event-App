/* global moment */
/* global google */
/* global $ */
                   
/* ---------------- DOCUMENT.READY ---------------- */


$(document).ready(function() {
    
    // Adjust border separating sidebar from main content
    var sidebarH = $('.sidebar').height();
    var contentH = $('.contentArea').height();
    if(sidebarH > contentH) {
        $('.sidebar').css("border-right", "3px solid midnightblue");
        $('.contentArea').css("border-left", "none");
    }
    
    // Display date
    var eventDateString = $('#hiddenDate').val();
    var mom = moment.utc(eventDateString, 'ddd MMM DD YYYY HH:mm:ss ZZ'); 
    $('#show-eventDate').text(mom.format('dddd, MMMM DD YYYY'));
    
    // If text overextends container (because user failed to input spaces), break text
    var textToBreak = $('.possibleLongInput');
    for (var i=0; i<textToBreak.length; i++) {
    	var htmlelem = $(textToBreak)[i];
        var textWidth = $(htmlelem).width();
        var parent = $(htmlelem).parent();
        var parentWidth = $(parent).width();
        if(textWidth > parentWidth) {
        	$(parent).css("word-break", "break-word");
    	}
    }
    
    // Adjust Map
    var mapLatLngString = $('#mapCenter').val();
    if(mapLatLngString != undefined) {
        var latLngRawArray = mapLatLngString.split(",");
        var lat = latLngRawArray[0].substr(1);
        var lng = latLngRawArray[1].substring(0, latLngRawArray[1].length - 1 );
        var latlngObj = new google.maps.LatLng(lat, lng);
        var map = new google.maps.Map(document.getElementById('showMapp'));
        map.setCenter(latlngObj);
        map.setZoom(15);
        var marker = new google.maps.Marker({
            position: latlngObj,
            map: map
        });
    }
});