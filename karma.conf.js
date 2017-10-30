// Karma configuration
// Generated on Fri Sep 01 2017 10:18:07 GMT-0500 (COT)

module.exports = function (config) {
    config.set({

// base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'requirejs', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            'test-main.js',
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/firebase/firebase.js",
            "node_modules/angular/angular.min.js",
            "node_modules/angular-animate/angular-animate.min.js",
            "node_modules/angular-route/angular-route.min.js",
            "node_modules/angularfire/dist/angularfire.js",
            "node_modules/materialize-css/dist/js/materialize.min.js",
            "node_modules/moment/min/moment.min.js",
//            "node_modules/chart.js/dist/Chart.min.js",
//            "node_modules/chartjs-plugin-zoom/chartjs-plugin-zoom.min.js",
//            "node_modules/angular-chart.js/dist/angular-chart.min.js",
            "app.js",
            {pattern: 'js/*.js', included: false},
            {pattern: 'js/**/*.js', included: false},
            {pattern: 'test/**/*.js', included: false}
        ],
        // list of files to exclude
        exclude: [
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'js/**/*.js': 'coverage',
            'js/*.js': 'coverage'
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'build/coverage/'
        },
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
