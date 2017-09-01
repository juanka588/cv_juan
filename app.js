var firebaseApp = initFireBase();
var angularApp = angular.module('cvApp', ['firebase', 'ngRoute', 'ngAnimate', 'chart.js']);

(function ($) {
    $(function () {
        initMain();
    }); // end of document ready
})(jQuery); // end of jQuery name space

(function (ChartJsProvider) {
    ChartJsProvider.setOptions(
            {
                colors: [
                    '#803690',
                    '#00ADF9',
                    '#DCDCDC',
                    '#46BFBD',
                    '#FDB45C',
                    '#949FB1',
                    '#4D5360']
            });
});

function initMain() {
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
    );
    $(".dropdown-button").dropdown();
    $('.materialboxed').materialbox();
}

function initFireBase() {
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyAaoOSHTD7s_TVjhHRIZYvSvwD27W-Vy6Q",
        authDomain: "cvitae-dad25.firebaseapp.com",
        databaseURL: "https://cvitae-dad25.firebaseio.com",
        storageBucket: "cvitae-dad25.appspot.com",
        messagingSenderId: "735079542401"
    };
    return firebase.initializeApp(config);
}

// for ngRoute
angularApp.run(["$rootScope", "$location", function ($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
            if (error === "AUTH_REQUIRED") {
                $location.path("/main");
            }
        });
    }]);

angularApp.factory("Auth", ["$firebaseAuth",
    function ($firebaseAuth) {
        return $firebaseAuth();
    }
]);

angularApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
                .when('/accounts', {
                    templateUrl: 'views/accountsView.html',
                    controller: 'personalAccountController',
                    resolve: {
                        "currentAuth": ["Auth", function (Auth) {
                                return Auth.$requireSignIn();
                            }]
                    }
                })
                .when('/juan', {
                    templateUrl: 'views/aboutMeView.html',
                    controller: 'personalDataController'
                })
                .when('/cvitae', {
                    templateUrl: 'views/cvView.html',
                    controller: 'cvController'
                })
                .when('/cvitae/print', {
                    templateUrl: 'views/cvPrintView.html',
                    controller: 'cvController'
                })
                .when('/experience', {
                    templateUrl: 'views/experienceView.html',
                    controller: 'experienceController'
                })
                .when('/projects', {
                    templateUrl: 'views/projectsView.html',
                    controller: 'projectsController'
                })
                .when('/experiments', {
                    templateUrl: 'views/experimentsMenu.html'
                })
                .when('/experiment/1', {
                    templateUrl: 'views/experiments/primesGraph.html',
                    controller: 'primesController'
                })
                .when('/experiment/2', {
                    templateUrl: 'views/experiments/chromeView.html',
                    controller: 'chromeController'
                })
                .when('/main', {
                    templateUrl: 'views/main.html'
                })
                .when('/', {
                    templateUrl: 'views/main.html'
                });

        $locationProvider.html5Mode(true);

    }]);
                