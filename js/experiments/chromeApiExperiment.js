angularApp.controller('chromeController', function () {

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

});
