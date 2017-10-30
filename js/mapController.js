function initMap() {
    var location = {lat: 45.1778626, lng: 5.7100253};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: location
    });
    new google.maps.Marker({
        position: location,
        map: map
    });
}

