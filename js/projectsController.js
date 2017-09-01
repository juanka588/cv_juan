angularApp.controller('projectsController', function ($firebaseArray, utils) {
    var controller = this;
    var mainProjectsRef = firebaseApp.database().ref('projects')
            .orderByChild('principal').equalTo(true);

    var projectsRef = firebaseApp.database().ref('projects').orderByChild('time');

    controller.mainProjects = $firebaseArray(mainProjectsRef);
    controller.projects = $firebaseArray(projectsRef);
    controller.projects.$loaded()
            .then(function () {
                controller.currentEvent = controller.projects[0];
            });

    controller.currentDate = new Date();
    controller.colors = ["red", "blue", "green", "purple", "indigo", "orange"];
    controller.currentEvent = null;
    controller.currentIdx = 0;

    controller.formatDate = function (timestamp) {
        return utils.formatDate(timestamp);
    };

    controller.getName = function (key) {
        return utils.getName(key);
    };

    controller.nextEvent = function () {
        $('.carousel').carousel('next');
        controller.currentIdx++;
        controller.currentIdx = controller.currentIdx % controller.projects.length;
        controller.updateSelectedEvent();
    };

    controller.previousEvent = function () {
        $('.carousel').carousel('prev');
        controller.currentIdx--;
        if (controller.currentIdx < 0) {
            controller.currentIdx = controller.projects.length - 1;
        }
        controller.updateSelectedEvent();
    };

    controller.updateSelectedEvent = function () {
        controller.currentEvent = controller.projects[controller.currentIdx];
        var dateSlider = document.getElementById('slider_date');
        dateSlider.noUiSlider.set(controller.currentEvent.time * 1000);
    };

    controller.details = function (p) {
        console.log(p);
    };

    controller.initControls = function () {
        $('.carousel.carousel-slider').carousel({fullWidth: true});

        var dateSlider = document.getElementById('slider_date');

        noUiSlider.create(dateSlider, {
            // Create two timestamps to define a range.
            range: {
                min: timestamp('2011'),
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

        dateSlider.noUiSlider.on('update', function (values, handle) {
            $("#date_selected").val(utils.formatDate(new Date(values[handle] / 1000)));
        });
    };

});



