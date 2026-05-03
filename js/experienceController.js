angularApp.controller('experienceController', function ($firebaseObject, utils) {
    const controller = this;
    const workRef = firebaseApp.database().ref('work_experience').orderByChild('time');
    controller.work = $firebaseObject(workRef);

    controller.getName = function (key) {
        return utils.getName(key);
    };

});