angularApp.controller('experienceController', function ($firebaseObject) {
    var controller = this;
    var workRef = firebaseApp.database().ref('work_experience').orderByChild('period_finish');
    controller.work = $firebaseObject(workRef);

    controller.getName = function (key) {
        return getName(key);
    };

});