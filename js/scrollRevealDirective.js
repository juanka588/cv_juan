angularApp.directive('scrollReveal', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var revealed = false;

            function checkVisibility() {
                if (revealed) return;
                var rect = element[0].getBoundingClientRect();
                var windowHeight = $window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < windowHeight * 0.85) {
                    revealed = true;
                    element.addClass('revealed');
                }
            }

            angular.element($window).on('scroll', checkVisibility);
            checkVisibility();

            scope.$on('$destroy', function () {
                angular.element($window).off('scroll', checkVisibility);
            });
        }
    };
});

angularApp.directive('staggerReveal', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var revealed = false;

            function checkVisibility() {
                if (revealed) return;
                var rect = element[0].getBoundingClientRect();
                var windowHeight = $window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < windowHeight * 0.85) {
                    revealed = true;
                    var items = element[0].querySelectorAll('.stagger-item');
                    angular.forEach(items, function (item, index) {
                        $timeout(function () {
                            angular.element(item).addClass('revealed');
                        }, index * 80);
                    });
                }
            }

            angular.element($window).on('scroll', checkVisibility);
            scope.$watch(attrs.staggerReveal, function () {
                $timeout(checkVisibility, 100);
            });
            checkVisibility();

            scope.$on('$destroy', function () {
                angular.element($window).off('scroll', checkVisibility);
            });
        }
    };
});
