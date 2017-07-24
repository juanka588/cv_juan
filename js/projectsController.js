angularApp.controller('projectsController', function ($firebaseObject,$timeout) {
    var controller = this;
    var projectsRef = firebaseApp.database().ref('projects');

    controller.projects = $firebaseObject(projectsRef);
    controller.currentDate = new Date();
    controller.colors = ["red", "blue", "green", "purple", "indigo"];
    controller.colors = shuffle(controller.colors);

    controller.getName = function (key) {
        return getName(key);
    };
    
    controller.nextEvent=function(){
        alert();    
    };
    
    controller.previousEvent=function(){
        alert();
    };
    
    $timeout(initControls, 800);
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
