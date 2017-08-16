function initMap() {
    var location = {lat: 4.5907141, lng: -74.103864};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: location
    });
    new google.maps.Marker({
        position: location,
        map: map
    });
}

