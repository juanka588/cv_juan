describe('Auth Controller', function () {
    var $controller;

    beforeEach(module('cvApp'));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    it('should initialize with showUser as false', function () {
        var ctrl = $controller('authController');
        expect(ctrl.showUser).toBe(false);
    });

    it('should have an authObj', function () {
        var ctrl = $controller('authController');
        expect(ctrl.authObj).toBeDefined();
    });

    it('should set showUser to false on signOut', function () {
        var ctrl = $controller('authController');
        ctrl.showUser = true;
        ctrl.signOut();
        expect(ctrl.showUser).toBe(false);
    });
});
