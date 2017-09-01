angularApp.controller('personalDataController', function ($firebaseObject, utils) {
    var controller = this;
    var contactRef = firebaseApp.database().ref('contact');

    controller.contact = $firebaseObject(contactRef);

    controller.getName = function (key) {
        return utils.getName(key);
    };
});