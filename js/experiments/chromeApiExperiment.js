angularApp.controller('chromeController', function () {
    this.colors = ["#f44336", "#ff9800", "#2196f3", "#4caf50", "#673ab7", "#9e9e9e"];
    this.indices = [0, 1, 2, 3, 4, 5];
    this.pageElements = ["Navbar", "Sidenav", "Main container", "Line", "Title", "Footer"];
    this.classNames = ["nav-test", "aside-test", "main-content-test", "line-test", "title-test", "footer-test"];
    this.permutationNumber = 1;
    this.maxPermutations = factorial(this.colors.length);

    this.sendNotification = function () {
        var notification = null;
        var title = "CV notif";
        var options = {
            body: "theBody",
            icon: "images/me.jpg"
        };
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            notification = new Notification(title, options);

        } else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {

                if (permission === "granted") {
                    notification = new Notification(title, options);
                }
            });
        }

        notification.onclick = function () {
            alert("clik over me again");
        };
        notification.onclose = function () {
            alert("why did you dimiss me!!!!");
        };
    };

    this.applyPermutation = function () {
        this.permutationNumber++;
        this.permutationNumber = this.permutationNumber % this.maxPermutations;
        //remove color
        this.removeColors();
        //change color order
        this.indices = permutateColors(this.indices);
        //re-apply color
        this.applyColors();
    };

    this.removeColors = function () {
        for (var i = 0; i < this.classNames.length; i++) {
            $("div." + this.classNames[i]).css("background-color", "transparent");
        }
    };

    this.applyColors = function () {
        for (var i = 0; i < this.classNames.length; i++) {
            $("div." + this.classNames[i]).css("background-color", this.colors[this.indices[i]]);
        }
    };
});



function addColors(positions) {

}

function permutateColors(positions) {
    var permuted = positions;
    var x = -1;
    var i = 0;
    for (i; i < permuted.length - 1; i++) {
        if (permuted[i] < permuted[i + 1]) {
            x = i;
        }
    }
    if (x === -1) {
        return positions.reverse();
    }
    var y = -1;
    for (i = 0; i < permuted.length; i++) {
        if (permuted[x] < permuted[i]) {
            y = i;
        }
    }
    var temp = positions[x];
    positions[x] = positions[y];
    positions[y] = temp;
    //reverse
    var high = (positions.length - 1 - x) / 2;
    var idx = x + 1;
    for (i = 0; i < high; i++) {
        idx += i;
        temp = positions[idx];
        positions[idx] = positions[positions.length - 1 - i];
        positions[positions.length - 1 - i] = temp;
    }

    return permuted;
}