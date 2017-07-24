angularApp.controller('cvController', function ($firebaseObject) {
    var controller = this;
    var langsRef = firebaseApp.database().ref('languages');
    var educationRef = firebaseApp.database().ref('education').orderByChild('time');
    var programmingRef = firebaseApp.database().ref('programming_experience');
    var networkRef = firebaseApp.database().ref('network_experience');
    var toolsRef = firebaseApp.database().ref('programming_tools');

    controller.languages = $firebaseObject(langsRef);
    controller.education = $firebaseObject(educationRef);
    controller.programming = $firebaseObject(programmingRef);
    controller.network = $firebaseObject(networkRef);
    controller.tools = $firebaseObject(toolsRef);

    controller.getName = function (key) {
        return getName(key);
    };

    controller.details = function (p) {
        console.log(p);
    };
});