angularApp.controller('personalAccountController', function ($firebaseAuth, $firebaseArray) {
    this.authObj = $firebaseAuth();
    // any time auth state changes, add the user data to scope
    this.authObj.$onAuthStateChanged(function (firebaseUser) {
        this.firebaseUser = firebaseUser;
    });
    var accountOutRef = firebaseApp.database().ref('accounts').orderByChild('type').startAt("outcome").endAt("outcome");
    var accountInRef = firebaseApp.database().ref('accounts').orderByChild('type').startAt("income").endAt("income");

    this.data = $firebaseArray(accountOutRef);
    this.addTemp = function () {
        var amount = Math.random() * 100;
        var timestamp = parseInt(new Date().getTime() / 1000);
        this.data.$add(
                {
                    x: timestamp,
                    y: amount,
                    category: "bussiness",
                    amount: amount,
                    time: timestamp,
                    type: "outcome"
                }
        );
    };
    this.signIn = function () {
        this.authObj.$signInWithPopup("facebook").then(function (result) {
            console.log("Signed in as:", result.user);
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
        this.firebaseUser = this.authObj.$getAuth();
    };

    this.formatDate = function (timestamp) {
        return formatDate(timestamp);
    };

    this.deleteItem = function (item) {
        this.data.$remove(item);
    };
    if (this.firebaseUser) {
        console.log("Signed in as:", this.firebaseUser);
    } else {
        console.log("Signed out");
    }

    this.series = ['Outcome'];
    this.options = {
        scales: {
            xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'MMM YYYY'
                        }
                    }
                }]
        }
    };
});