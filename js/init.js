var firebaseApp = initFireBase();
var angularApp = angular.module('cvApp', ['firebase']);

var strings = {};
var language = "en";

(function ($) {
    $(function () {
        $(".dropdown-button").dropdown();
        initMain();
    }); // end of document ready
})(jQuery); // end of jQuery name space

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


angularApp.controller('languagesController', function () {
    this.languages = ['en', 'es', 'fr'];
    this.updateLanguage = function (lang) {
        language = lang;
        loadStrings();
    };
});

angularApp.controller('cvController', function ($firebaseObject) {
    var nameRef = firebaseApp.database().ref('contact');
    var langsRef = firebaseApp.database().ref('languages');
    var educationRef = firebaseApp.database().ref('education');
    var workRef = firebaseApp.database().ref('work_experience');
    this.contact = $firebaseObject(nameRef);
    this.languages = $firebaseObject(langsRef);
    this.education = $firebaseObject(educationRef);
    this.work = $firebaseObject(workRef);
    this.getName = function (key) {
        return strings[key][language];
    };
});


function initMain() {
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
    );

    firebaseApp.database().ref('strings').once('value').then(function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (child) {
            strings[child.key] = child.val();
        });

        loadStrings();
    });
}


function loadStrings() {
    for (var index in strings) {
        console.log("new values " + strings[index][language]);
    }
}

