var firebaseApp = initFireBase();
var angularApp = angular.module('cvApp', ['firebase','ngRoute']);

var strings = {};
var language = "en";

(function ($) {
    $(function () {
        firebaseApp.database().ref('strings').once('value').then(function (snapshot) {
            //console.log(snapshot.val());
            snapshot.forEach(function (child) {
                strings[child.key] = child.val();
            });
        });
        initMain();
    }); // end of document ready
})(jQuery); // end of jQuery name space


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


var lController = angularApp.controller('languagesController', function () {
    this.languages = ['en', 'es', 'fr'];
    this.updateLanguage = function (lang) {
        language = lang;
    };
});

angularApp.config(['$routeProvider', '$locationProvider'
    , function($routeProvider, $locationProvider) {
    $routeProvider
		.when('/juan', {
            templateUrl: 'views/cvView.html',
            controller: 'cvController'
        })
		.when('/', {
            templateUrl: 'views/cvView.html',
            controller: 'cvController'
        })

    $locationProvider.html5Mode(true);

}]);