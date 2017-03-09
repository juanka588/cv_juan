var firebaseApp = initFireBase();
var angularApp = angular.module('cvApp', ['firebase']);

var strings = {};
var language = "en";

(function ($) {
    $(function () {
        $(".dropdown-button").dropdown();
        $("#printButton").click(function () {
            var DocumentContainer = document.getElementById('section-to-print');
            var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
            WindowObject.document.writeln('<!DOCTYPE html>');
            WindowObject.document.writeln('<html><head><title></title>');
            WindowObject.document.writeln('<link rel="stylesheet" type="text/css" href="css/style.css">');
            WindowObject.document.writeln('<link rel="stylesheet" type="text/css" href="css/materialize.css">');
            WindowObject.document.writeln('</head><body>')

            WindowObject.document.writeln(DocumentContainer.innerHTML);

            WindowObject.document.writeln('</body></html>');

            WindowObject.document.close();
            WindowObject.focus();
            WindowObject.print();
           // WindowObject.close();
        });
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
    var educationRef = firebaseApp.database().ref('education').orderByChild('period_finish');
    educationRef.on('value', function (snap) {
        console.log("holas " + snap.val());
    });

    var workRef = firebaseApp.database().ref('work_experience').orderByChild('period_finish');
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

