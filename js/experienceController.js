angularApp.controller('experienceController', function ($firebaseObject, utils) {
    var controller = this;
    var workRef = firebaseApp.database().ref('work_experience').orderByChild('time');
    controller.work = $firebaseObject(workRef);

    controller.getName = function (key) {
        return utils.getName(key);
    };

});