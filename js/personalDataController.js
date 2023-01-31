angularApp.controller('personalDataController', function ($firebaseObject, utils) {
    const controller = this;
    const contactRef = firebaseApp.database().ref('contact');

    controller.contact = $firebaseObject(contactRef);

    controller.getName = function (key) {
        return utils.getName(key);
    };
});