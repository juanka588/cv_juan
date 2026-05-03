describe('Utils Service', function () {
    var utils;

    beforeEach(module('cvApp'));

    beforeEach(inject(function (_utils_) {
        utils = _utils_;
    }));

    describe('nth()', function () {
        it('should return "st" for 1', function () {
            expect(utils.nth(1)).toBe('st');
        });

        it('should return "nd" for 2', function () {
            expect(utils.nth(2)).toBe('nd');
        });

        it('should return "rd" for 3', function () {
            expect(utils.nth(3)).toBe('rd');
        });

        it('should return "th" for 4-9', function () {
            for (var i = 4; i <= 9; i++) {
                expect(utils.nth(i)).toBe('th');
            }
        });

        it('should return "st" for 11', function () {
            expect(utils.nth(11)).toBe('st');
        });

        it('should return "st" for 21', function () {
            expect(utils.nth(21)).toBe('st');
        });
    });

    describe('factorial()', function () {
        it('should return 1 for factorial(1)', function () {
            expect(utils.factorial(1)).toBe(1);
        });

        it('should return 120 for factorial(5)', function () {
            expect(utils.factorial(5)).toBe(120);
        });

        it('should return 1 for factorial(0)', function () {
            expect(utils.factorial(0)).toBe(1);
        });

        it('should return 3628800 for factorial(10)', function () {
            expect(utils.factorial(10)).toBe(3628800);
        });
    });

    describe('timestamp()', function () {
        it('should return a number', function () {
            expect(typeof utils.timestamp('2020')).toBe('number');
        });

        it('should return correct timestamp for 2011', function () {
            var expected = new Date('2011').getTime();
            expect(utils.timestamp('2011')).toBe(expected);
        });
    });

    describe('formatDate()', function () {
        it('should format a unix timestamp to Month Year', function () {
            var timestamp = new Date(2020, 0, 15).getTime() / 1000;
            expect(utils.formatDate(timestamp)).toBe('January 2020');
        });

        it('should format December correctly', function () {
            var timestamp = new Date(2019, 11, 25).getTime() / 1000;
            expect(utils.formatDate(timestamp)).toBe('December 2019');
        });
    });

    describe('shuffle()', function () {
        it('should return an array of the same length', function () {
            var arr = [1, 2, 3, 4, 5];
            var result = utils.shuffle(arr.slice());
            expect(result.length).toBe(5);
        });

        it('should contain the same elements', function () {
            var arr = [1, 2, 3, 4, 5];
            var result = utils.shuffle(arr.slice());
            expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('getName()', function () {
        it('should return "cargando" when key is not found', function () {
            expect(utils.getName('nonexistent_key')).toBe('cargando');
        });
    });

    describe('language property', function () {
        it('should default to "en"', function () {
            expect(utils.language).toBe('en');
        });
    });

    describe('months and weekdays', function () {
        it('should have 12 months', function () {
            expect(utils.months.length).toBe(12);
        });

        it('should have 7 weekdays', function () {
            expect(utils.weekdays.length).toBe(7);
        });

        it('should start months with January', function () {
            expect(utils.months[0]).toBe('January');
        });

        it('should start weekdays with Sunday', function () {
            expect(utils.weekdays[0]).toBe('Sunday');
        });
    });
});
