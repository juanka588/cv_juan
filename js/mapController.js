function initMap() {
    const location = {lat: 47.9016839, lng: 1.9220688};
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: location
    });
    new google.maps.Marker({
        position: location,
        map: map
    });
}

