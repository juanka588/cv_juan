var assert = require('assert');
var nth = require("../../js/utils.js");

describe("Utils", function () {
    describe("DateFormat", function () {
        it('should return st for the 1', function () {
            assert.equal(nth(1), "st");
        });
    });
});