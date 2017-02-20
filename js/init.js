strings = {};
language = "en";

(function ($) {
    $(function () {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAaoOSHTD7s_TVjhHRIZYvSvwD27W-Vy6Q",
            authDomain: "cvitae-dad25.firebaseapp.com",
            databaseURL: "https://cvitae-dad25.firebaseio.com",
            storageBucket: "cvitae-dad25.appspot.com",
            messagingSenderId: "735079542401"
        };
        firebase.initializeApp(config);
        $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
        );
        var nameRef = firebase.database().ref('contact');
        nameRef.on('value', function (snapshot) {
            console.log("k:" + snapshot.key + " v:" + snapshot.val().name);
        });
        firebase.database().ref('strings').once('value').then(function (snapshot) {
            console.log(snapshot.val());
            snapshot.forEach(function (child) {
                strings[child.key] = child.val();
            });

            loadStrings();
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space


function loadStrings() {
    for (var index in strings) {
        console.log("new values " + strings[index][language]);
    }
}

var angularApp = angular.module('cvApp', []);

angularApp.controller('languagesController', function () {
    this.languages = ['en', 'es', 'fr'];
    this.updateLanguage = function (lang) {
        alert("hola" + lang);
        language = lang;
        loadStrings();
    };
});

angularApp.controller('cvController', function () {
    this.test = [5, 3, 4];
});