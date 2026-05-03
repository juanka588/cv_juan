angularApp.controller('projectsController', function ($firebaseArray, $sce, utils) {
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
    controller.colors = ['blue darken-1', 'teal darken-1', 'indigo darken-1', 'deep-purple darken-1', 'cyan darken-1', 'blue-grey darken-1'];
    controller.currentEvent = null;
    controller.currentIdx = 0;
    controller.selectedProject = {};

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
        if (dateSlider && dateSlider.noUiSlider) {
            dateSlider.noUiSlider.set(controller.currentEvent.time * 1000);
        }
    };

    controller.openProjectModal = function (p) {
        controller.selectedProject = angular.copy(p);
        if (p.embeddable && p.link) {
            controller.selectedProject.trustedLink = $sce.trustAsResourceUrl(p.link);
        }
        $('#project-modal').modal('open');
    };

    controller.initControls = function () {
        initControls(utils);
        $('.modal').modal();
    };
});


function initControls(utils) {
    var dateSlider = document.getElementById('slider_date');
    if (!dateSlider) return;

    noUiSlider.create(dateSlider, {
        range: {
            min: utils.timestamp('2011'),
            max: new Date().getTime()
        },
        step: 4 * 7 * 24 * 60 * 60 * 1000,
        start: [utils.timestamp('2011')],
        format: wNumb({
            decimals: 0
        })
    });

    dateSlider.noUiSlider.on('update', function (values, handle) {
        $('#date_selected').val(utils.formatDate(new Date(values[handle] / 1000)));
    });

    var caro = $('.carousel.carousel-slider');
    if (caro.length === 1) {
        setTimeout(function () {
            caro.carousel({fullWidth: true});
        }, 1000);
        return;
    }
    caro.carousel({fullWidth: true});
}
