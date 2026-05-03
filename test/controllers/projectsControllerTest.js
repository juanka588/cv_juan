describe('Projects Controller', function () {
    var $controller, utils;

    beforeEach(module('cvApp'));

    beforeEach(inject(function (_$controller_, _utils_) {
        $controller = _$controller_;
        utils = _utils_;
    }));

    it('should initialize with currentIdx at 0', function () {
        var ctrl = $controller('projectsController');
        expect(ctrl.currentIdx).toBe(0);
    });

    it('should have color array defined', function () {
        var ctrl = $controller('projectsController');
        expect(ctrl.colors).toBeDefined();
        expect(ctrl.colors.length).toBeGreaterThan(0);
    });

    it('should have selectedProject as empty object', function () {
        var ctrl = $controller('projectsController');
        expect(ctrl.selectedProject).toEqual({});
    });

    it('should delegate formatDate to utils', function () {
        var ctrl = $controller('projectsController');
        spyOn(utils, 'formatDate').and.returnValue('January 2020');
        var result = ctrl.formatDate(1579046400);
        expect(utils.formatDate).toHaveBeenCalledWith(1579046400);
        expect(result).toBe('January 2020');
    });

    it('should delegate getName to utils', function () {
        var ctrl = $controller('projectsController');
        spyOn(utils, 'getName').and.returnValue('test');
        var result = ctrl.getName('key');
        expect(utils.getName).toHaveBeenCalledWith('key');
        expect(result).toBe('test');
    });

    it('should have mainProjects defined', function () {
        var ctrl = $controller('projectsController');
        expect(ctrl.mainProjects).toBeDefined();
    });

    it('should have projects defined', function () {
        var ctrl = $controller('projectsController');
        expect(ctrl.projects).toBeDefined();
    });
});
