angularApp.controller('authController', function ($firebaseAuth) {
    this.authObj = $firebaseAuth();
    this.showUser = false;
    // any time auth state changes, add the user data to scope
    this.authObj.$onAuthStateChanged(function (firebaseUser) {
        this.firebaseUser = firebaseUser;
        if (this.firebaseUser) {
            this.showUser = true;
        }
        console.log(this.firebaseUser);
    });

    this.signIn = function () {
        this.authObj.$signInWithPopup("facebook").then(function (result) {
            console.log("Signed in as:", result.user);
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
        this.firebaseUser = this.authObj.$getAuth();
        this.showUser = true;
    };

    this.signOut = function () {
        this.authObj.$signOut();
        this.showUser = false;
    };
});


