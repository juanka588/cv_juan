angularApp.controller('cvController', function ($firebaseObject, utils) {
    const controller = this;
    const educationRef = firebaseApp.database().ref('education').orderByChild('time');
    const langsRef = firebaseApp.database().ref('languages');
    const programmingRef = firebaseApp.database().ref('programming_experience');
    const networkRef = firebaseApp.database().ref('network_experience');
    const toolsRef = firebaseApp.database().ref('programming_tools');
    const contestsRef = firebaseApp.database().ref('contests');

    controller.education = $firebaseObject(educationRef);
    controller.languages = $firebaseObject(langsRef);
    controller.programming = $firebaseObject(programmingRef);
    controller.network = $firebaseObject(networkRef);
    controller.tools = $firebaseObject(toolsRef);
    controller.contests = $firebaseObject(contestsRef);

    controller.getName = function (key) {
        return utils.getName(key);
    };

    controller.details = function (p) {
        console.log(p);
    };
});