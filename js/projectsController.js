angularApp.controller('projectsController', function ($firebaseArray, $timeout) {
    var controller = this;
    var projectsRef = firebaseApp.database().ref('projects');

    controller.projects = $firebaseArray(projectsRef);
//    controller.projects.$loaded()
//            .then(function (data) {
//                console.log(data);
//                initControls();
//            });

    controller.currentDate = new Date();
    controller.colors = ["red", "blue", "green", "purple", "indigo"];
    controller.colors = shuffle(controller.colors);
    controller.eventsTime = [];
    controller.currentEvent = null;

    controller.formatDate = function (timestamp) {
        var date = new Date();
        date.setTime(timestamp * 1000);
        return formatDate(date);
    };

    controller.getName = function (key) {
        return getName(key);
    };

    controller.nextEvent = function () {
    
    };

    controller.previousEvent = function () {
    
    };
    
    $timeout(initControls, 500)
});



function initControls() {

    $('.carousel.carousel-slider').carousel({fullWidth: true});

    var dateSlider = document.getElementById('slider_date');

    noUiSlider.create(dateSlider, {
        // Create two timestamps to define a range.
        range: {
            min: timestamp('2010'),
            max: new Date().getTime()
        },
        // Steps of one week
        step: 4 * 7 * 24 * 60 * 60 * 1000,
        // Two more timestamps indicate the handle starting positions.
        start: [timestamp('2011')],
        // No decimals
        format: wNumb({
            decimals: 0
        })
    });
    var dateValues = [
        document.getElementById('event-start'),
        document.getElementById('event-end')
    ];

    dateSlider.noUiSlider.on('update', function (values, handle) {
        $("#date_selected").val(formatDate(new Date(+values[handle])));
    });

}
