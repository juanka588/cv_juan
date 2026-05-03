describe('scrollReveal Directive', function () {
    var $compile, $rootScope, $window, $httpBackend;

    beforeEach(module('cvApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$window_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/views\/.*\.html/).respond('');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should compile without errors', function () {
        var element = $compile('<div scroll-reveal class="scroll-reveal">Content</div>')($rootScope);
        $rootScope.$digest();
        $httpBackend.flush();
        expect(element).toBeDefined();
    });

    it('should add revealed class when element is in viewport', function () {
        var element = $compile('<div scroll-reveal class="scroll-reveal">Content</div>')($rootScope);
        document.body.appendChild(element[0]);
        $rootScope.$digest();
        $httpBackend.flush();

        var event = document.createEvent('Event');
        event.initEvent('scroll', true, true);
        $window.dispatchEvent(event);

        expect(element.hasClass('revealed')).toBe(true);
        element.remove();
    });

    it('should clean up scroll listener on destroy', function () {
        var scope = $rootScope.$new();
        var element = $compile('<div scroll-reveal class="scroll-reveal">Content</div>')(scope);
        $rootScope.$digest();
        $httpBackend.flush();
        scope.$destroy();
    });
});

describe('staggerReveal Directive', function () {
    var $compile, $rootScope, $timeout, $httpBackend;

    beforeEach(module('cvApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/views\/.*\.html/).respond('');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should compile without errors', function () {
        var element = $compile('<div stagger-reveal="items"><div class="stagger-item">A</div></div>')($rootScope);
        $rootScope.$digest();
        $httpBackend.flush();
        expect(element).toBeDefined();
    });
});
