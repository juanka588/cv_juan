function getName(key) {
    if (!strings[key]) {
        return "cargando";
    }
    return strings[key][language];
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Create a list of day and monthnames.
const weekdays = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday",
    "Saturday"
];
const months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
function nth(d) {
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
}

// Create a string representation of the date.
function formatDate(timestamp) {
    var date = new Date();
    date.setTime(timestamp * 1000);
    return months[date.getMonth()] + " " +
            date.getFullYear();
}


function timestamp(str) {
    return new Date(str).getTime();
}

function factorial(n) {
    var number = 1;
    for (var i = 1; i <= n; i++) {
        number = number * i;
    }
    return number;
}