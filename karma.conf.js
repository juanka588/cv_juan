module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/firebase/firebase.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angularfire/dist/angularfire.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/materialize-css/dist/js/materialize.min.js',
            'node_modules/moment/min/moment.min.js',
            'node_modules/chart.js/dist/Chart.min.js',
            'node_modules/angular-chart.js/dist/angular-chart.min.js',
            'node_modules/nouislider/distribute/nouislider.min.js',
            'node_modules/wnumb/wNumb.js',
            'config.js',
            'app.js',
            'js/scrollRevealDirective.js',
            'js/utils.js',
            'js/languagesController.js',
            'js/authController.js',
            'js/personalDataController.js',
            'js/cvController.js',
            'js/experienceController.js',
            'js/projectsController.js',
            'js/personalAccountController.js',
            'js/experimentsController.js',
            'js/mapController.js',
            'test/**/*Test.js'
        ],
        exclude: [],
        preprocessors: {
            'js/*.js': ['coverage'],
            '!js/libs/**': ['coverage']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'build/coverage/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        concurrency: Infinity
    });
};
