var firebaseApp = initFireBase();
var angularApp = angular.module('cvApp', []);

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
        alert("hola" + lang);
        language = lang;
        loadStrings();
    };
});

angularApp.controller('cvController', function () {
    var controller=this;
    var nameRef = firebaseApp.database().ref('contact');
    controller.test = [];
    nameRef.on('value', function (snapshot) {
        console.log(snapshot.key);
        console.log(snapshot.val().name);
        controller.test['contact'] = snapshot.val();
    });
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

