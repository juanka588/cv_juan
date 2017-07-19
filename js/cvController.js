angularApp.controller('cvController', function ($firebaseObject) {
    var controller = this;
    var nameRef = firebaseApp.database().ref('contact');
    var langsRef = firebaseApp.database().ref('languages');
    var educationRef = firebaseApp.database().ref('education').orderByChild('period_finish');
    var workRef = firebaseApp.database().ref('work_experience').orderByChild('period_finish');
    var programmingRef = firebaseApp.database().ref('programming_experience');
    var networkRef = firebaseApp.database().ref('network_experience');
    var toolsRef = firebaseApp.database().ref('programming_tools');
    var projectsRef = firebaseApp.database().ref('projects');

    controller.contact = $firebaseObject(nameRef);
    controller.languages = $firebaseObject(langsRef);
    controller.education = $firebaseObject(educationRef);
    controller.work = $firebaseObject(workRef);
    controller.programming = $firebaseObject(programmingRef);
    controller.network = $firebaseObject(networkRef);
    controller.tools = $firebaseObject(toolsRef);
    controller.projects = $firebaseObject(projectsRef);

    controller.getName = function (key) {
        return getName(key);
    };

    controller.details = function (p) {
        console.log(p);
    };
});