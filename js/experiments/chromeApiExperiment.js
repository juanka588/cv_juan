angularApp.controller('chromeController', function () {
    this.colors = ["red", "orange", "blue", "green", "purple", "grey"];
    this.indices = [0, 1, 2, 3, 4, 5];
    this.pageElements=["Navbar","Sidenav","Main container","Line","Title","Footer"];

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
        //remove color
        $("div.nav-test").toggleClass(this.colors[this.indices[0]]);
        $("div.aside-test").toggleClass(this.colors[this.indices[1]]);
        $("div.main-content-test").toggleClass(this.colors[this.indices[2]]);
        $("div.line-test").toggleClass(this.colors[this.indices[3]]);
        $("div.title-test").toggleClass(this.colors[this.indices[4]]);
        $("div.footer-test").toggleClass(this.colors[this.indices[5]]);
        //change color order

        //re-apply color

    };

});


function addColors(colors) {

}

function permutateColors(colors) {

}