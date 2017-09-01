angularApp.service('utils', function ($firebaseObject) {

    var stringsRef = firebaseApp.database().ref('strings');
    this.strings = $firebaseObject(stringsRef);

    this.language = "en";

    this.getName = function (key) {
        if (!this.strings[key]) {
            return "cargando";
        }
        return this.strings[key][this.language];
    };

    this.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };


// Create a list of day and monthnames.
    this.weekdays = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday",
        "Saturday"
    ];
    this.months = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
    this.nth = function (d) {
        switch (d % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    // Create a string representation of the date.
    this.formatDate = function (timestamp) {
        var date = new Date();
        date.setTime(timestamp * 1000);
        return this.months[date.getMonth()] + " " +
                date.getFullYear();
    };

    this.timestamp = function (str) {
        return new Date(str).getTime();
    };

    this.factorial = function (n) {
        var number = 1;
        for (var i = 1; i <= n; i++) {
            number = number * i;
        }
        return number;
    };
});