angularApp.controller('personalAccountController', function ($scope,$firebaseAuth) {
    this.authObj = $firebaseAuth();
    // any time auth state changes, add the user data to scope
    this.authObj.$onAuthStateChanged(function (firebaseUser) {
        this.firebaseUser = firebaseUser;
    });
    this.history = [{description: "primero", value: 30}];
    this.addTemp = function () {
        this.history.push({description: "cosa " + Math.random(), value: Math.random()});
    };
    this.signIn = function () {
        this.authObj.$signInWithPopup("facebook").then(function (result) {
            console.log("Signed in as:", result.user);
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
        this.firebaseUser = this.authObj.$getAuth();
    };

    if (this.firebaseUser) {
        console.log("Signed in as:", this.firebaseUser);
    } else {
        console.log("Signed out");
    }

    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
        [{
                x: 40,
                y: 10,
                r: 20
            }],
        [{
                x: 10,
                y: 40,
                r: 50
            }]
    ];
});