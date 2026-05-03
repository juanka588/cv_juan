describe('Languages Controller', function () {
    var $controller, utils;

    beforeEach(module('cvApp'));

    beforeEach(inject(function (_$controller_, _utils_) {
        $controller = _$controller_;
        utils = _utils_;
    }));

    it('should have 3 available languages', function () {
        var ctrl = $controller('languagesController');
        expect(ctrl.languages).toEqual(['en', 'es', 'fr']);
    });

    it('should start with menu expanded', function () {
        var ctrl = $controller('languagesController');
        expect(ctrl.menuExpanded).toBe(true);
    });

    it('should update utils language when updateLanguage is called', function () {
        var ctrl = $controller('languagesController');
        ctrl.updateLanguage('es');
        expect(utils.language).toBe('es');
    });

    it('should toggle menuExpanded when expandMenu is called', function () {
        var ctrl = $controller('languagesController');
        expect(ctrl.menuExpanded).toBe(true);
        ctrl.expandMenu();
        expect(ctrl.menuExpanded).toBe(false);
        ctrl.expandMenu();
        expect(ctrl.menuExpanded).toBe(true);
    });

    it('should delegate getName to utils', function () {
        var ctrl = $controller('languagesController');
        spyOn(utils, 'getName').and.returnValue('test_value');
        var result = ctrl.getName('some_key');
        expect(utils.getName).toHaveBeenCalledWith('some_key');
        expect(result).toBe('test_value');
    });
});
