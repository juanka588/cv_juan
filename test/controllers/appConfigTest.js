describe('App Configuration', function () {

    it('should define the cvApp module', function () {
        expect(function () {
            angular.module('cvApp');
        }).not.toThrow();
    });

    it('should have firebase dependency', function () {
        var deps = angular.module('cvApp').requires;
        expect(deps).toContain('firebase');
    });

    it('should have ngRoute dependency', function () {
        var deps = angular.module('cvApp').requires;
        expect(deps).toContain('ngRoute');
    });

    it('should have ngAnimate dependency', function () {
        var deps = angular.module('cvApp').requires;
        expect(deps).toContain('ngAnimate');
    });

    it('should have chart.js dependency', function () {
        var deps = angular.module('cvApp').requires;
        expect(deps).toContain('chart.js');
    });

    describe('Routes', function () {
        var $route;

        beforeEach(module('cvApp'));

        beforeEach(inject(function (_$route_) {
            $route = _$route_;
        }));

        it('should have route for main', function () {
            expect($route.routes['/main']).toBeDefined();
            expect($route.routes['/main'].templateUrl).toBe('views/main.html');
        });

        it('should have route for cvitae', function () {
            expect($route.routes['/cvitae']).toBeDefined();
            expect($route.routes['/cvitae'].controller).toBe('cvController');
        });

        it('should have route for experience', function () {
            expect($route.routes['/experience']).toBeDefined();
            expect($route.routes['/experience'].controller).toBe('experienceController');
        });

        it('should have route for projects', function () {
            expect($route.routes['/projects']).toBeDefined();
            expect($route.routes['/projects'].controller).toBe('projectsController');
        });

        it('should have route for about me', function () {
            expect($route.routes['/juan']).toBeDefined();
            expect($route.routes['/juan'].controller).toBe('personalDataController');
        });

        it('should have route for print view', function () {
            expect($route.routes['/cvitae/print']).toBeDefined();
            expect($route.routes['/cvitae/print'].controller).toBe('cvController');
        });

        it('should have route for experiments menu', function () {
            expect($route.routes['/experiments']).toBeDefined();
        });

        it('should have default route to main', function () {
            expect($route.routes['/']).toBeDefined();
            expect($route.routes['/'].templateUrl).toBe('views/main.html');
        });
    });
});
